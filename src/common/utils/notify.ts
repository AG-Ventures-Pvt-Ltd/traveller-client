'use client'

import { ToastType } from '../components/composites/Toast/Toast';

let addToastFn: ((type: ToastType, message: string) => void) | null = null;

export const setToastHandler = (handler: (type: ToastType, message: string) => void) => {
  addToastFn = handler;
};

export const notify = {
  success: (msg: string) => {
    if (addToastFn) addToastFn('success', msg);
  },
  error: (msg: string) => {
    if (addToastFn) addToastFn('error', msg);
  },
  info: (msg: string) => {
    if (addToastFn) addToastFn('info', msg);
  },
  warning: (msg: string) => {
    if (addToastFn) addToastFn('warning', msg);
  },
};