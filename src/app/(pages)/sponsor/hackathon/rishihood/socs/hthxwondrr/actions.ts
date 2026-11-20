'use server';

// Runs only on the Next.js server; the browser gets opaque action references.
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { buildPayload, findTeams, normalizeEmail } from './validation';
import { loadTeams } from './teams.server';

const isStr = (v: unknown, max: number): v is string => typeof v === 'string' && v.length <= max;

/** True if `team` (name or ID) exists and its leader email matches. */
export async function verifyTeamLeader(team: unknown, leaderEmail: unknown): Promise<boolean> {
  if (!isStr(team, 100) || !isStr(leaderEmail, 300)) return false;
  return findTeams(loadTeams(), team, leaderEmail).length > 0;
}

export type TeamCredentials = { teamId: string; password: string };

/**
 * Login credentials for the team, released only when the team + leader email match AND the
 * backend confirms every member email is registered. Re-checks everything server-side so the
 * client-side flow can't be skipped.
 */
export async function getTeamCredentials(
  team: unknown,
  emails: unknown
): Promise<TeamCredentials[] | null> {
  if (!isStr(team, 100) || !Array.isArray(emails) || !emails.every((e) => isStr(e, 300))) return null;

  const matches = findTeams(loadTeams(), team, emails[0]);
  if (!matches.length) return null;

  let payload;
  try {
    payload = buildPayload(team, emails);
  } catch {
    return null;
  }

  // ponytail: one server->backend call per successful team, so the backend's per-IP limit isn't a concern here.
  const res = await fetch(new URL(API_ENDPOINTS.SPONSOR.HACKATHON_VERIFY, process.env.NEXT_PUBLIC_API_URL), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const body = (await res.json()) as { data?: { allRegistered?: boolean; results?: { email: string }[] } };
  const checked = body.data?.results?.map((r) => r.email) ?? [];
  // Make sure the backend answered for exactly these emails, leader included.
  if (!body.data?.allRegistered || !checked.includes(normalizeEmail(emails[0]))) return null;

  return matches.map((t) => ({ teamId: t.id, password: t.password }));
}
