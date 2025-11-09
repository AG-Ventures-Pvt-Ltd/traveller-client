import NextAuth from "next-auth";
import { authOptions } from "./config";
import { connectToDatabase } from "@/lib/db/db";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

await connectToDatabase();