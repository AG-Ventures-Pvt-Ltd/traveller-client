"use client";
import usePostData from "@/services/usePostData";

export const useRegisterUser = () => {
  return usePostData({
    url: '/api/auth/register',
  });
};