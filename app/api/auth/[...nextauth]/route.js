import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "171cdce6cbeedc27ca33",
      clientSecret:
        process.env.GITHUB_SECRET || "55e331e9e468b33456418485731fb27327b22048",
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // console.log("User Profile from Google ", profile);
        // console.log("User Account from Google ", account);
        // console.log("User from Google ", user);
        // console.log("User Credentials from Google ", credentials);

        // check if user already exists
        const userExists = await User.findOne({ email: user.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: user?.email,
            username: user?.name.replace(" ", "").toLowerCase(),
            image: user?.image,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
