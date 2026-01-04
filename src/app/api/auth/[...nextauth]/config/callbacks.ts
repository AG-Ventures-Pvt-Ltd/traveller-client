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

        token.sub = dbUser._id.toString();
        // token.email = undefined;
        token.picture = undefined;
        return token;
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
          type : token.type as "Traveler" | "Host"
        };
      }
      return session;
    },
  }
};
