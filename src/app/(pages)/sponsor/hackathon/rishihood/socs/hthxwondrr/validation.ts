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
  if (!v) return 'Team name or ID is required';
  if (v.length < 2) return 'Team name/ID must be at least 2 characters';
  if (v.length > TEAM_NAME_MAX) return `Team name/ID must be at most ${TEAM_NAME_MAX} characters`;
  // Real team names include & * etc.; only block control chars and angle brackets.
  if (/[\p{Cc}<>]/u.test(v)) return 'Team name/ID contains invalid characters';
  return undefined;
}

export type Team = { name: string; id: string; leadEmail: string };

const teamKey = (v: string) => normalizeTeamName(v).toLowerCase();

/** Teams whose name or ID (case-insensitive) equals `query` AND whose leader email matches.
 *  Can return >1 when the same team registered twice under one name. */
export function findTeams<T extends Team>(teams: T[], query: string, leaderEmail: string): T[] {
  const q = teamKey(query);
  const email = normalizeEmail(leaderEmail);
  if (!q || !email) return [];
  return teams.filter(
    (t) => (teamKey(t.name) === q || teamKey(t.id) === q) && normalizeEmail(t.leadEmail) === email
  );
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

export type TeamSuggestion = { name: string; id: string };

/** Typeahead: teams whose name or ID contains `query` (case-insensitive), prefix matches first.
 *  `value` is what to fill in: the ID if the user is typing an ID, else the name. */
export function suggestTeams(teams: TeamSuggestion[], query: string, limit = 6) {
  const q = teamKey(query);
  if (!q) return [];
  return teams
    .map((t) => {
      const name = teamKey(t.name);
      const id = teamKey(t.id);
      const idHit = id.indexOf(q);
      const nameHit = name.indexOf(q);
      if (idHit < 0 && nameHit < 0) return null;
      const byId = idHit >= 0 && (nameHit < 0 || idHit < nameHit);
      return { ...t, value: byId ? t.id : t.name, rank: Math.min(...[idHit, nameHit].filter((i) => i >= 0)) };
    })
    .filter((t): t is NonNullable<typeof t> => t !== null)
    .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map(({ name, id, value }) => ({ name, id, value }));
}
