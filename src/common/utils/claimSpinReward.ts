'use client';

import axios from 'axios';
import { baseAPI } from '@/services/baseApi';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { notify } from '@/common/utils/notify';
import { logError } from '@/common/utils/logError';

const DATA_KEY = 'spinWheelData';
const CLAIM_WINDOW_MS = 12 * 60 * 60 * 1000; // must match server's 12-hour window

interface SpinData {
  rewardAmount: number;
  timestamp: number;
}

// Credits the wallet with a pending spin-wheel reward, if one was won pre-signup and not yet
// resolved. DATA_KEY is removed on every terminal outcome (credited, already claimed elsewhere,
// or expired) so a stale/unclaimable reward never lingers or gets retried. The spin-lock flag
// (set on the spin page) is separate and is never touched here, so the wheel stays locked either way.
export const claimSpinReward = async (): Promise<void> => {
  const raw = localStorage.getItem(DATA_KEY);
  if (!raw) return;

  let data: SpinData;
  try {
    data = JSON.parse(raw);
  } catch {
    localStorage.removeItem(DATA_KEY);
    return;
  }

  if (!data?.rewardAmount || !data?.timestamp) {
    localStorage.removeItem(DATA_KEY);
    return;
  }

  // Expired: signup happened more than 12 hours after the spin, bonus is void.
  if (Date.now() - data.timestamp > CLAIM_WINDOW_MS) {
    localStorage.removeItem(DATA_KEY);
    return;
  }

  try {
    await baseAPI.post(API_ENDPOINTS.WALLET.UPDATE, {
      rewardAmount: data.rewardAmount,
      timestamp: data.timestamp,
    });
    localStorage.removeItem(DATA_KEY);
    notify.success(`₹${data.rewardAmount} signup bonus added to your wallet!`);
  } catch (error) {
    // 409 = user already has a signup_bonus transaction (server-side dedupe); nothing left to claim.
    // 400 = server-side validation rejected it (e.g. its own time-window check); also unclaimable.
    if (axios.isAxiosError(error) && (error.response?.status === 409 || error.response?.status === 400)) {
      localStorage.removeItem(DATA_KEY);
      return;
    }
    // Transient/network error: leave DATA_KEY in place so the next claim attempt can retry.
    logError({ error, location: 'claimSpinReward.ts', when: 'claiming spin wheel signup bonus' });
  }
};
