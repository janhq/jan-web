import NextAuth from "next-auth/next";
import KeycloakProvider from "next-auth/providers/keycloak";
import jwt_decode from "jwt-decode";
import { encrypt } from "@/_utils/encryption";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.DEMO_FRONTEND_CLIENT_ID}`,
      clientSecret: `${process.env.DEMO_FRONTEND_CLIENT_SECRET}`,
      issuer: `${process.env.AUTH_ISSUER}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimestamp = Math.floor(Date.now() / 1000);
      if (account) {
        token.decoded = jwt_decode(account.id_token);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimestamp < token.expires_at) {
        return token;
      } else {
        // token is expired, refresh it
        console.log("token is expired, refresh it");
        // TODO:
        return token;
      }
    },
    async session({ session, token }) {
      session.access_token = encrypt(token.access_token);
      session.id_token = encrypt(token.id_token);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
