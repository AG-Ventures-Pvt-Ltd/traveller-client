'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, EnvelopeSimpleIcon, UsersThreeIcon, WarningCircleIcon } from '@phosphor-icons/react';
import Card from '@/common/ui/Card';
import CustomInput from '@/common/ui/CustomInput';
import CustomSelect from '@/common/ui/CustomSelect';
import Button from '@/common/ui/Buttons/Button';
import BackButton from '@/common/ui/BackButton';
import usePostData from '@/services/usePostData';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { getTeamCredentials, verifyTeamLeader, type TeamCredentials } from './actions';
import {
  EMAIL_MAX,
  MEMBER_OPTIONS,
  TEAM_NAME_MAX,
  buildPayload,
  suggestTeams,
  type TeamSuggestion,
  validateEmails,
  validateMemberCount,
  validateTeamName,
} from './validation';

type VerifyResponse = { data: { allRegistered: boolean; results: { email: string; registered: boolean }[] } };

const COUNT_OPTIONS = MEMBER_OPTIONS.map((n) => ({ value: String(n), label: `${n} members` }));

const Err = ({ msg }: { msg?: string }) =>
  msg ? <p role="alert" className="text-xs text-red-500 pl-1">{msg}</p> : null;

export default function VerificationForm({ suggestions }: { suggestions: TeamSuggestion[] }) {
  const [step, setStep] = useState<1 | 2 | 'done'>(1);
  const [teamName, setTeamName] = useState('');
  const [count, setCount] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [step1Errors, setStep1Errors] = useState<{ teamName?: string; count?: string }>({});
  const [emailErrors, setEmailErrors] = useState<(string | undefined)[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [unregistered, setUnregistered] = useState<string[]>([]);
  const [checkingTeam, setCheckingTeam] = useState(false);
  const [credentials, setCredentials] = useState<TeamCredentials[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const matches = useMemo(() => suggestTeams(suggestions, teamName), [suggestions, teamName]);
  const suggestOpen = showSuggest && matches.length > 0;

  const pickTeam = (value: string) => {
    setTeamName(value);
    setShowSuggest(false);
    setActiveIdx(-1);
    setStep1Errors((p) => ({ ...p, teamName: undefined }));
  };

  const onTeamKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestOpen) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const d = e.key === 'ArrowDown' ? 1 : -1;
      setActiveIdx((i) => (i + d + matches.length) % matches.length);
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      pickTeam(matches[activeIdx].value);
    } else if (e.key === 'Escape') {
      setShowSuggest(false);
    }
  };

  const { mutate, isPending } = usePostData<VerifyResponse>({
    url: API_ENDPOINTS.SPONSOR.HACKATHON_VERIFY,
    enableNotifications: false,
    onSuccess: async ({ data }) => {
      if (data.allRegistered) {
        // Server re-verifies team + leader + all emails before releasing login credentials.
        setCheckingTeam(true);
        try {
          const creds = await getTeamCredentials(teamName, emails);
          if (!creds?.length) return setSubmitError('Could not fetch your login details. Please try again.');
          setCredentials(creds);
          setStep('done');
        } catch {
          setSubmitError('Could not fetch your login details. Please try again.');
        } finally {
          setCheckingTeam(false);
        }
        return;
      }
      const missing = data.results.filter((r) => !r.registered).map((r) => r.email);
      setUnregistered(missing);
      // Flag the exact inputs so users see which member still needs to sign up.
      setEmailErrors(emails.map((e) => (missing.includes(e.trim().toLowerCase()) ? 'Not registered on Wondrr' : undefined)));
    },
    onError: (err) => {
      const res = (err as { response?: { data?: { message?: string } } }).response;
      setSubmitError(res?.data?.message || 'Could not verify. Please try again.');
    },
  });

  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { teamName: validateTeamName(teamName), count: validateMemberCount(Number(count)) };
    setStep1Errors(errs);
    if (errs.teamName || errs.count) return;
    // Keep emails already typed if the user goes back and changes the count.
    setEmails((prev) => Array.from({ length: Number(count) }, (_, i) => prev[i] ?? ''));
    setEmailErrors([]);
    setStep(2);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setUnregistered([]);
    const errs = validateEmails(emails);
    setEmailErrors(errs);
    if (errs.some(Boolean)) return;

    // Team name/ID + leader email are checked on the Next.js server (teams list never ships to the browser).
    setCheckingTeam(true);
    let teamOk = false;
    try {
      teamOk = await verifyTeamLeader(teamName, emails[0]);
    } catch {
      setCheckingTeam(false);
      return setSubmitError('Could not verify. Please try again.');
    }
    setCheckingTeam(false);
    if (!teamOk) {
      setEmailErrors((prev) => prev.map((x, i) => (i === 0 ? 'Does not match the team leader email for this team' : x)));
      return setSubmitError("Team name/ID and team leader email don't match our records.");
    }

    mutate(buildPayload(teamName, emails));
  };

  const busy = checkingTeam || isPending;

  if (step === 'done') {
    return (
      <Card variant="fill" className="flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircleIcon size={48} weight="fill" className="text-success" />
        <h2 className="text-maintext text-xl font-bold">Registration verified</h2>
        <p className="text-subtext text-sm">
          All members of <b className="text-maintext">{teamName.trim()}</b> are registered on Wondrr.
          Use these details to log in to your portal.
        </p>
        {credentials.map((c) => (
          <div key={c.teamId} className="w-full flex flex-col gap-2 rounded-xl border-2 border-outline bg-white p-4 text-left">
            {[['Team ID', c.teamId], ['Password', c.password]].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <span className="text-subtext text-sm">{label}</span>
                <span className="text-maintext text-sm font-bold font-mono select-all break-all">{value}</span>
              </div>
            ))}
          </div>
        ))}
        <a
          href="https://hth.socs.club"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full py-4 rounded-xl text-base font-normal text-center bg-[#EEA0FF] text-black active:opacity-80 transition-opacity"
        >
          Access your portal
        </a>
      </Card>
    );
  }

  if (step === 1) {
    return (
      <form noValidate onSubmit={goToStep2} className="flex flex-col gap-6">
        <Card variant="fill" className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="teamName" className="text-neutral-900 text-sm font-bold">
              Team name or Team ID <span className="text-red-500">*</span>
            </label>
            <p className="text-subtext text-xs">You can enter either your team name or your team ID (e.g. HTH26-XXX).</p>
            <div className="relative">
              <CustomInput
                id="teamName"
                name="teamName"
                placeholder="Team name or ID"
                icon={UsersThreeIcon}
                value={teamName}
                maxLength={TEAM_NAME_MAX}
                autoComplete="off"
                onChange={(e) => {
                  setTeamName(e.target.value);
                  setShowSuggest(true);
                  setActiveIdx(-1);
                  setStep1Errors((p) => ({ ...p, teamName: undefined }));
                }}
                onBlur={() => {
                  setShowSuggest(false);
                  setStep1Errors((p) => ({ ...p, teamName: validateTeamName(teamName) }));
                }}
                error={!!step1Errors.teamName}
                className="bg-white"
                inputProps={{
                  role: 'combobox',
                  'aria-expanded': suggestOpen,
                  'aria-controls': 'team-suggestions',
                  'aria-autocomplete': 'list',
                  'aria-activedescendant': activeIdx >= 0 ? `team-opt-${activeIdx}` : undefined,
                  onFocus: () => setShowSuggest(true),
                  onKeyDown: onTeamKeyDown,
                }}
              />
              {suggestOpen && (
                <ul
                  id="team-suggestions"
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-auto rounded-xl border-2 border-outline bg-white py-1 shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]"
                >
                  {matches.map((t, i) => (
                    <li
                      key={t.id}
                      id={`team-opt-${i}`}
                      role="option"
                      aria-selected={i === activeIdx}
                      // mousedown fires before input blur, so the pick isn't lost
                      onMouseDown={(e) => {
                        e.preventDefault();
                        pickTeam(t.value);
                      }}
                      onMouseEnter={() => setActiveIdx(i)}
                      className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm ${
                        i === activeIdx ? 'bg-[#f3f4f6]' : ''
                      }`}
                    >
                      <span className="text-maintext font-medium truncate">{t.name}</span>
                      <span className="text-subtext text-xs font-mono shrink-0">{t.id}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Err msg={step1Errors.teamName} />
          </div>

          <div className="flex flex-col gap-1">
            <CustomSelect
              id="memberCount"
              label="Number of team members"
              required
              placeholder="Select team size"
              options={COUNT_OPTIONS}
              value={count}
              onChange={(v) => {
                setCount(v);
                setStep1Errors((p) => ({ ...p, count: undefined }));
              }}
            />
            <Err msg={step1Errors.count} />
          </div>
        </Card>

        <Button type="submit" variant="purple" fullWidth>
          Continue
        </Button>
      </form>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-6">
      <BackButton label="Back" onClick={() => setStep(1)} iconSize={18} />

      <Card variant="fill" className="flex flex-col gap-4 p-5">
        <h3 className="text-neutral-900 text-base font-bold">
          {teamName.trim()} · {emails.length} members
        </h3>
        {emails.map((value, i) => (
          <div key={i} className="flex flex-col gap-1">
            <label htmlFor={`member-${i}-email`} className="text-neutral-900 text-sm font-bold">
              {i === 0 ? 'Team leader email' : `Member ${i + 1} email`} <span className="text-red-500">*</span>
            </label>
            {i === 0 && (
              <p className="text-subtext text-xs">Use the team lead email your team registered with.</p>
            )}
            <CustomInput
              id={`member-${i}-email`}
              type="email"
              placeholder={i === 0 ? 'Team leader email' : 'Email address'}
              icon={EnvelopeSimpleIcon}
              autoComplete={i === 0 ? 'email' : 'off'}
              maxLength={EMAIL_MAX}
              value={value}
              onChange={(e) => {
                const v = e.target.value;
                setEmails((prev) => prev.map((x, j) => (j === i ? v : x)));
                setEmailErrors((prev) => prev.map((x, j) => (j === i ? undefined : x)));
              }}
              onBlur={() => setEmailErrors(validateEmails(emails))}
              error={!!emailErrors[i]}
              className="bg-white"
            />
            <Err msg={emailErrors[i]} />
          </div>
        ))}
      </Card>

      {unregistered.length > 0 && (
        <Card variant="fill" className="flex flex-col gap-2 p-5 bg-warning-bg! border-warning/30!">
          <div className="flex items-center gap-2 text-warning font-bold text-sm">
            <WarningCircleIcon size={20} weight="fill" />
            {unregistered.length === 1 ? '1 member is' : `${unregistered.length} members are`} not registered on Wondrr
          </div>
          <ul className="text-subtext text-sm list-disc pl-5">
            {unregistered.map((e) => <li key={e}>{e}</li>)}
          </ul>
          <p className="text-subtext text-sm">
            Ask them to{' '}
            <Link href="/auth?mode=signup&method=otp" target="_blank" className="font-bold text-maintext underline">
              sign up on Wondrr
            </Link>{' '}
            with this email, then verify again.
          </p>
        </Card>
      )}

      <Err msg={submitError} />

      <Button type="submit" variant="purple" fullWidth disabled={busy}>
        {busy ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  );
}
