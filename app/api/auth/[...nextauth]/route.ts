// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/User";
import { NextAuthOptions} from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

interface SessionUser extends Record<string, any> {
  id: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!
    }),
    
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: { session: any }) {
      try {
        if (!session.user?.email) {
          return session;
        }

        // Find the user in the database
        const SessionUser = await User.findOne({ email: session.user.email });
        
        // Attach the user ID to the session if the user is found
        if (SessionUser) {
          session.user.id = SessionUser.id;
        }
        return session;
      } catch (error) {
        console.error("Error fetching user:", error);
        return session;
      }
    },

    async signIn({ profile }: { profile: any }) {
      try {
        await connectToDB();

        if (!profile.email) {
          return false;
        }

        // Check if the user exists in the database
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          // Create a new user if not exists
          await User.create({
            id: profile.sub, // Use profile.sub as a unique identifier
            fullName: profile.name ?? '',
            email: profile.email,
            image: profile.picture ?? '',
            onboarded: false,
          });
        }

        return true;
      } catch (error) {
        console.error("Error signing in:", error);
        return false;
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
