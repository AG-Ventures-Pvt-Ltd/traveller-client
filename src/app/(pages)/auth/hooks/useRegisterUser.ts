"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { logError } from "@/common/utils/logError";
import { notify } from "@/common/utils/notify";

const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: { "Content-Type": "application/json" },
});

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await api.post('/api/auth/register', payload);
      return res.data;
    },
    onSuccess: (data: unknown) => {
      const successMessage = (data as { message?: string })?.message || "Success!";
      notify.success(successMessage);
    },
    onError: (error: Error) => {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const errorMessage = axiosError?.response?.data?.message || error?.message || "Something went wrong!";
      notify.error(errorMessage);
      logError({
        error: errorMessage,
        location: "traveller-client/src/app/(client)/auth/hooks/useRegisterUser.ts",
        when: "registering user",
      });
    },
  });
};