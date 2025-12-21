import { NextAuthOptions } from "next-auth";
import { credentialsProvider } from "./config/credentials";
import { googleProvider, facebookProvider } from "./config/providers";
import { authCallbacks } from "./config/callbacks";


export const authOptions: NextAuthOptions = {
  providers: [
    credentialsProvider,
    googleProvider,
    facebookProvider,
  ],
  ...authCallbacks,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, 
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        // domain: process.env.NODE_ENV === 'production' ? process.env.MY_DOMAIN! : "localhost",
        path: '/',
        secure: process.env.NODE_ENV === 'production' ? true : false,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
  },
};