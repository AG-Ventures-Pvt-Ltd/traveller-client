import CredentialsProvider from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
import axios from "axios";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "Email",
      type: "text"
    },
    username: {
      label: "Username",
      type: "text"
    },
    password: {
      label: "Password",
      type: "password"
    },
    otp: {
      label: "OTP",
      type: "text"
    },
    provider: {
      label: "Provider",
      type: "text"
    },
    mode: {
      label: "Mode",
      type: "text"
    },
  },

  authorize: async (credentials, req) => {

    const reqType = req?.headers?.origin == process.env.NEXT_PUBLIC_SUBDOMAIN! ? 'Host' : 'Traveler'

    // OTP login branch
    if (credentials?.provider === 'otp' || credentials?.otp) {
      if (!credentials?.email) {
        throw new Error("Email is required for OTP login!");
      }
      if (!credentials?.otp) {
        throw new Error("OTP is required!");
      }

      try {
        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/client/v1/user/verifyOTP', {
          email: credentials.email,
          otp: credentials.otp,
          mode: credentials.mode,
        }, {
          headers: {
            'x-internal-auth': process.env.INTERNAL_AUTH_SECRET || 'MySuperSecretKey',
          },
        });

        const data = res.data.data;

        return {
          id: data.userId.toString(),
          name: data.fullName,
          type: data.type,
        } as unknown as NextAuthUser;

      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "OTP verification failed");
        }
        throw new Error("Unexpected error during OTP verification");
      }
    }

    // Password login branch
    if (!credentials?.password) {
      throw new Error("Password is required!");
    }

    if (!credentials?.email && !credentials?.username) {
      throw new Error("Email or username is required!")
    }

    try {

      const userData = {
        email: credentials?.email, username: credentials?.username, password: credentials?.password,
        reqType: reqType
      }

      try {
        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/client/v1/user/login', userData, {
          headers: {
            'x-internal-auth': process.env.INTERNAL_AUTH_SECRET || 'MySuperSecretKey',
          },
        });

        const user = res.data.data;

        const result = {
          id: user.userId.toString(),
          name: user.fullName,
          type: user.type
        };

        return result as unknown as NextAuthUser;

      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
        throw new Error("Unexpected error");
      }
    }
    catch (error) {
      throw error
    }
  }
});