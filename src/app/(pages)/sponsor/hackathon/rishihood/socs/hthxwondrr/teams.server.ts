// Server-only: never import from a 'use client' file.
// Team list (incl. passwords) lives in the env var HTH_TEAMS_JSON — never in the repo (it's
// public) and never NEXT_PUBLIC_, so it can't reach a client bundle.
import type { Team } from './validation';

export type TeamRecord = Team & { password: string };

let cached: TeamRecord[] | undefined;

export function loadTeams(): TeamRecord[] {
  if (cached) return cached;
  try {
    const parsed = JSON.parse(process.env.HTH_TEAMS_JSON ?? '[]');
    cached = Array.isArray(parsed) ? parsed : [];
  } catch {
    cached = [];
  }
  // eslint-disable-next-line no-console -- server log; logError util is client-only
  if (!cached.length) console.error('[hthxwondrr] HTH_TEAMS_JSON missing or invalid; every team check will fail');
  return cached;
}
