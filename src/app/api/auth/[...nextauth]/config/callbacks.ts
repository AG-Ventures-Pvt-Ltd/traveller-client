import { NextAuthOptions } from "next-auth";
import { User } from "../model/User";
import { UserDetails } from "../model/UserDetails";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db/db";

type FacebookProfile = { 
  picture?: { data?: { url?: string } }, 
  email: string, 
  name: string
};

type GoogleProfile = { 
    picture?: string, 
    email: string, 
    name: string 
};


export const authCallbacks: Pick<NextAuthOptions, 'callbacks'> = {
  callbacks: {

    async signIn() {
      return true;
    },

    async redirect({ url, baseUrl }) {
     
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },

    async jwt({ token, account, profile, user }) {

      if (account && user) {
        token.userId = user.id;
        token.email = user.email;
        token.fullName = (user as { fullName?: string; name?: string }).fullName || user.name;
        return token;
      }

      if (account && profile) {
        await connectToDatabase();
        
        let dbUser = await User.findOne({ email: profile?.email });

        if (!dbUser) {
          const session = await mongoose.startSession();
          
          try {
            session.startTransaction();

            const fbProfile = profile as FacebookProfile;
            const googleProfile = profile as GoogleProfile;

            const [createdUser] = await User.create([{
              fullName: profile.name,
              email: profile.email,
            }], { session });

            await UserDetails.create([{
              userId: createdUser._id,
              mobileNumber: '',
              countryCode: '+91',
              avatar: fbProfile.picture?.data?.url || googleProfile.picture || undefined,
              provider: {
                type: account.provider,
                id: account.providerAccountId,
              },
            }], { session });
            
            await session.commitTransaction();
            
            dbUser = createdUser;
          } catch (error) {
              await session.abortTransaction();
              throw error;
          } finally {
              await session.endSession();
          }
        }

        token.userId = dbUser._id.toString();
        token.email = dbUser.email;
        token.fullName = dbUser.fullName;
        return token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.userId as string,
          email: token.email as string,
          fullName: token.fullName as string,
        };
      }
      return session;
    },
  }
};
