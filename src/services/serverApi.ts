import axios from "axios";

const serverAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

serverAPI.interceptors.request.use(
  async (config) => {
    config.headers['X-Timestamp'] = new Date().toISOString();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getServerData = async <T>(url: string): Promise<T> => {
  try {
    const res = await serverAPI.get<{ data: T }>(url);
    return res.data.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw err;
  }
};