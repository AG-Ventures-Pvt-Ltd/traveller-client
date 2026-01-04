import CredentialsProvider from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
import { User } from "../model/User";
import { connectToDatabase } from "@/lib/db/db";


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

  authorize: async (credentials,req) => {

    const reqType = req?.headers?.origin == process.env.NEXT_PUBLIC_SUBDOMAIN! ? 'Host' : 'Traveler'
    
    if (!credentials?.password) {
      throw new Error("Password is required!");
    }

    if (!credentials?.email && !credentials?.username) {
      throw new Error("Email or username is required!")
    }

    try {

      await connectToDatabase();

      const query = credentials.email 
                    ? { email: credentials.email }
                    : { username: credentials.username };

      const user = await User.findOne(query);

      if (!user) {
        throw new Error("User not found!")
      }

      if (user.type != reqType) {
        throw new Error(`You don't have a ${reqType.toLowerCase()} account!`)
      }
      
      const isPasswordCorrect = await user.isPasswordCorrect(credentials.password);

      if (!isPasswordCorrect) {
        throw new Error("Invalid password!")
      }
      
      const result = {
        id: user._id.toString(),
        name: user.fullName,
        type : user.type
      };
      
      return result as unknown as NextAuthUser;
    } 
    catch (error) {
      throw error
    }
  }
});