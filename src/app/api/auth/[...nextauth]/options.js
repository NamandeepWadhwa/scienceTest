import GoogleProvider from "next-auth/providers/google";

const authOptions={providers: [
  GoogleProvider({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  }),
],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        console.log(profile.email)
        // calls the backend and save the token, do it later but for now check if you getting the email
        return true;
      }
      return true // Do different verification for other providers that don't have `email_verified`
    }
}

}
export default authOptions;
