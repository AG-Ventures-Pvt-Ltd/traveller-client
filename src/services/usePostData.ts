"use client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { baseAPI } from "./baseApi";
import { logError } from "@/common/utils/logError";
import { notify } from "@/common/utils/notify";

type MutationPayload = Record<string, unknown>;

interface UsePostDataOptions<T = unknown> extends Omit<UseMutationOptions<T, Error, MutationPayload>, 'mutationFn'> {
  url: string;
  enableNotifications?: boolean;
}

const usePostData = <T = unknown>(
  { url, onSuccess, onError, enableNotifications = true, ...rest } : UsePostDataOptions<T>
) => {
  return useMutation<T, Error, MutationPayload>({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await baseAPI.post(url, payload);
      return res.data;
    },
    onSuccess: (data: T, variables: MutationPayload, context: unknown) => {
      if (enableNotifications) {
        const successMessage = (data as { message?: string })?.message || "Success!";
        notify.success(successMessage);
      }
      onSuccess?.(data, variables, context);
    },
    onError: (error: Error, variables: MutationPayload, context: unknown) => {
        const axiosError = error as { response?: { data?: { message?: string } } };
        const errorMessage = axiosError?.response?.data?.message || error?.message || "Something went wrong!";

        notify.error(errorMessage);
        
        logError({
            error: errorMessage,
            location: "traveller-client/src/services/usePostData.ts",
            when: "posting data",
        });
        onError?.(error, variables, context);
    },
    ...rest
  });
}

export default usePostData;