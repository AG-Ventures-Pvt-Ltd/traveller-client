"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getData } from "./baseApi";

export const useGetData = <T>(
  url: string,
  options?: UseQueryOptions<T, Error>
) => {
  const queryKey = options?.queryKey || [url];
  
  return useQuery<T>({
    ...options,
    queryKey,
    queryFn: () => getData<T>(url),
    enabled: !!url,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
};

