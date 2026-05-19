import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { API_ENDPOINTS } from "@/common/constants/apiEndpoints";

interface GoogleProfile {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

interface GoogleOAuthProfile {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}


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
        token.email = user.email;
        token.fullName = (user as { fullName?: string; name?: string }).fullName || user.name;
        token.type = user.type;
        return token;
      }


      if (account && profile) {

        const googleProfile = profile as GoogleOAuthProfile;

        const user_data: GoogleProfile = {
          email: googleProfile.email || "",
          id: googleProfile.sub || "",
          fullName: googleProfile.name || "",
          avatar: googleProfile.picture || undefined
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
        if (!apiUrl) {
          console.error('[NextAuth] NEXT_PUBLIC_API_URL is not defined');
          throw new Error("API URL not configured");
        }

        try {
          const res = await axios.post(apiUrl + API_ENDPOINTS.USER.SOCIAL_LOGIN, user_data, {
            timeout: 10000, // 10 second timeout
            headers: {
              'x-internal-auth': process.env.INTERNAL_AUTH_SECRET || '',
            },
          });

          const user = res.data.data;

          token.sub = user.userId.toString()
          token.userId = user.userId.toString()
          token.type = user.type
          token.fullName = user.fullName
          token.avatar = user.avatar

        } catch (error) {

          console.error('[NextAuth] Social login API error:', error);
          
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || error.message || "Login failed";
            console.error('[NextAuth] API Error Details:', {
              status: error.response?.status,
              statusText: error.response?.statusText,
              data: error.response?.data,
              url: error.config?.url,
              apiUrl: apiUrl
            });
            throw new Error(errorMessage);
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
          type: token.type as "Traveler" | "Host",
          avatar: token.avatar as string
        };
      }
      return session;
    },
  }
};
