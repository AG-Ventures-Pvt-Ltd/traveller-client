'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { trackEvent, setGaUserId, markInternalTraffic } from '@/common/utils/analytics';

const AUTH_KEY = 'wondrr_auth_intent';
const INTERNAL_EMAIL_DOMAIN = '@wondrr.in';

export type AuthMethod = 'google' | 'otp' | 'password';

/**
 * Called by the auth forms just before the session is created, so the event
 * below can say which method was used and whether the account is new.
 */
export function rememberAuthIntent(method: AuthMethod, isNewUser = false) {
  try {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ method, isNewUser }));
  } catch {
    // Private mode / blocked storage — the event still fires, with defaults.
  }
}

function readAuthIntent(): { method: AuthMethod; isNewUser: boolean } {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (raw) {
      sessionStorage.removeItem(AUTH_KEY);
      return { method: 'otp', isNewUser: false, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return { method: 'otp', isNewUser: false };
}

/**
 * Login/sign-up tracking and identity, in one place.
 *
 * Auth has four entry points (OTP, password, Google, register) that all end in
 * the same session appearing — watching the session covers them all instead of
 * each form remembering to fire its own event.
 */
export default function AnalyticsIdentity() {
  const { data: session, status } = useSession();
  const identified = useRef(false);

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user?.id || identified.current) return;
    identified.current = true;

    // Team activity is tagged before anything else is sent, so GA4's internal
    // traffic filter can drop the whole session whatever the IP.
    if (session.user.email?.endsWith(INTERNAL_EMAIL_DOMAIN)) markInternalTraffic();

    setGaUserId(session.user.id);

    const { method, isNewUser } = readAuthIntent();
    trackEvent(isNewUser ? 'sign_up' : 'login', { method });
  }, [status, session?.user?.id, session?.user?.email]);

  return null;
}
