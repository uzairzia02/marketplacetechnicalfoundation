import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Define the NextAuth configuration
export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
  ],
};

// Export the NextAuth handler
const authHandler = NextAuth(authOptions);
export default authHandler;
