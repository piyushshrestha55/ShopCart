import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/connectDB";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const matchedPassword = await bcrypt.compare(password, user.password);
          if (!matchedPassword) {
            return null;
          }
          return user;
        } catch (err) {
          console.log("Error: ", err);
        }
        return user;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
