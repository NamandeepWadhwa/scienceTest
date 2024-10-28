// [path-to]/auth/[...nextauth].js

import GoogleProvider from "next-auth/providers/google";
import getUser from "../../../../../lib/user/getAuthUser";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          const data = await getUser(profile.email);
          console.log("User data retrieved:", data); // Debugging log
          if (data) {
            account.token = data.token; // Attach the token to the account
            return true; // Sign-in is successful
          } else {
            console.log("No data returned from getUser."); // Debugging log
            return false; // Sign-in fails
          }
        } catch (error) {
          console.error("Error fetching user data:", error); // Handle any errors
          return false; // Sign-in fails
        }
      }
      return false; // If provider is not Google, sign-in fails
    },
    async session({ session, token }) {
      // Attach the token to the session object
      session.user.token = token?.token;
      return session; // Return the modified session
    },
    async jwt({ token, account }) {
      // If account is defined, this means the user has just signed in
      if (account) {
        token.token = account.token; // Set the token from account
      }
      return token; // Return the modified token
    },
  },
};

export default authOptions;
