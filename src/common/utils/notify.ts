'use client'

import { ToastType } from '../components/composites/Toast/Toast';

let addToastFn: ((type: ToastType, message: string) => void) | null = null;

export const setToastHandler = (handler: (type: ToastType, message: string) => void) => {
  addToastFn = handler;
};

const isValid = (msg?: string) => !!msg?.trim();

export const notify = {
  success: (msg: string) => {
    if (isValid(msg) && addToastFn) addToastFn('success', msg);
  },
  error: (msg: string) => {
    if (isValid(msg) && addToastFn) addToastFn('error', msg);
  },
  info: (msg: string) => {
    if (isValid(msg) && addToastFn) addToastFn('info', msg);
  },
  warning: (msg: string) => {
    if (isValid(msg) && addToastFn) addToastFn('warning', msg);
  },
};