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
  },

  authorize: async (credentials, req) => {

    const reqType = req?.headers?.origin == process.env.NEXT_PUBLIC_SUBDOMAIN! ? 'Host' : 'Traveler'

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
        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/api/client/v1/user/login', userData);

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