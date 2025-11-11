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

  authorize: async (credentials) => {
    
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
      
      const isPasswordCorrect = await user.isPasswordCorrect(credentials.password);

      if (!isPasswordCorrect) {
        throw new Error("Invalid password!")
      }
      
      const result = {
        id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        name: user.fullName,
      };
      
      return result as unknown as NextAuthUser;
    } 
    catch (error) {
      throw error
    }
  }
});