// Pure validation for the HTH x Wondrr verification form. No imports so `node --test` can run it directly.

export const MEMBER_OPTIONS = [3, 4, 5] as const;
export const TEAM_NAME_MAX = 50;
export const EMAIL_MAX = 254;

// Local part: letters, digits, . _ % + - (no leading/trailing/double dots).
// Domain: dot-separated labels (no leading/trailing hyphen), TLD of 2+ letters.
const EMAIL_RE =
  /^[a-z0-9_%+-]+(\.[a-z0-9_%+-]+)*@([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;

export const normalizeEmail = (v: string) => v.trim().toLowerCase();
export const normalizeTeamName = (v: string) => v.trim().replace(/\s+/g, ' ');

export function validateEmail(raw: string): string | undefined {
  const v = normalizeEmail(raw);
  if (!v) return 'Email is required';
  if (v.length > EMAIL_MAX) return 'Email is too long';
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address';
  return undefined;
}

export function validateTeamName(raw: string): string | undefined {
  const v = normalizeTeamName(raw);
  if (!v) return 'Team name is required';
  if (v.length < 2) return 'Team name must be at least 2 characters';
  if (v.length > TEAM_NAME_MAX) return `Team name must be at most ${TEAM_NAME_MAX} characters`;
  if (!/^[\p{L}\p{N}][\p{L}\p{N} ._-]*$/u.test(v)) return 'Use letters, numbers, spaces, . _ -';
  return undefined;
}

export function validateMemberCount(n: number): string | undefined {
  return (MEMBER_OPTIONS as readonly number[]).includes(n)
    ? undefined
    : `Team must have ${MEMBER_OPTIONS.join(', ').replace(/, (\d+)$/, ' or $1')} members`;
}

/** Per-email errors, including duplicates across the team. */
export function validateEmails(emails: string[]): (string | undefined)[] {
  const seen = new Map<string, number>();
  return emails.map((e, i) => {
    const err = validateEmail(e);
    if (err) return err;
    const key = normalizeEmail(e);
    if (seen.has(key)) return `Same email as member ${seen.get(key)! + 1}`;
    seen.set(key, i);
    return undefined;
  });
}

/** Builds the API payload; throws if anything is invalid so nothing unchecked is ever sent. */
export function buildPayload(teamName: string, emails: string[]) {
  if (validateTeamName(teamName)) throw new Error('Invalid team name');
  if (validateMemberCount(emails.length)) throw new Error('Invalid member count');
  if (validateEmails(emails).some(Boolean)) throw new Error('Invalid emails');
  return { teamName: normalizeTeamName(teamName), emails: emails.map(normalizeEmail) };
}
