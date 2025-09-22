'use client'

import axios, { AxiosInstance } from "axios";

export const baseAPI : AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ,
  headers: { "Content-Type": "application/json" },
  withCredentials : true,
});

export const getData = async <T>(url: string): Promise<T> => {
  try {
    const res = await baseAPI.get<{ data: T }>(url);
    return res.data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw err;
  }
};
