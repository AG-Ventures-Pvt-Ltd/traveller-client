import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

// type FacebookProfile = {
//   picture?: { data?: { url?: string } },
//   email: string,
//   name: string
// };

type GoogleProfile = {
  id : string,
  email: string,
  fullName : string
};


export const authCallbacks: Pick<NextAuthOptions, 'callbacks'> = {
  callbacks: {

    async signIn() {
      return true;
    },

    async redirect({ url }) {
      return url;
    },

    async jwt({ token, account, profile, user }) {

      if (!account && user) {
        token.sub = user.id;
        token.userId = user.id;
        token.fullName = (user as { fullName?: string; name?: string }).fullName || user.name;
        token.type = user.type;
        return token;
      }


      if (account && profile) {

        const user_data : GoogleProfile = {
          email : profile.email || "",
          id : profile.sub || "",
          fullName : profile.name || "",
        }

        try {
          const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + API_ENDPOINTS.USER.SOCIAL_LOGIN , user_data);

          const user = res.data.data;

          token.userId = user.userId.toString()
          token.type = user.type
          token.fullName = user.fullName

        } catch (error) {

          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Login failed");
          }
          throw new Error("Unexpected error");
        }
      }

      if (account?.type == 'credentials') {
        token.type = user.type;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: (token.userId || token.sub) as string,
          email: token.email as string,
          fullName: (token.fullName || token.name) as string,
          type: token.type as "Traveler" | "Host"
        };
      }
      return session;
    },
  }
};
