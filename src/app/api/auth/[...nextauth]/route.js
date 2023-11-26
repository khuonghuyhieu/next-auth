import NextAuth from "next-auth";
import { authOptions } from "@/libs/NextAuth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
