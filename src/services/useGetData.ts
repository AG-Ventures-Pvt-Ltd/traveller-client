"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getData } from "./baseApi";

export const useGetData = <T>(
  url: string,
  options?: UseQueryOptions<T, Error>
) => {
  return useQuery<T>({
    queryKey: [url],
    queryFn: () => getData<T>(url),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
    ...options,
  });
};

