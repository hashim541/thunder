import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fetchUser } from "./actions/user.actions";

export interface SessionWithID extends Session {
    userId: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
        session: async ({ session }) => {
            // Custom logic to handle session, assuming you fetch user data using Mongoose
            const user = await fetchUser(session.user?.email as string); // Implement this function

            const sessionWithId: SessionWithID = {
                ...session,
                userId: user?._id.toString() as string, // Ensure user ID is a string
            };

            return sessionWithId;
        },
    },
};
