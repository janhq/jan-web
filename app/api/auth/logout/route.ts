// @ts-nocheck
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { getIdToken } from "@/_utils/tokenAccessor";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    const idToken = await getIdToken();

    const url = `${
      process.env.END_SESSION_URL
    }?id_token_hint=${idToken}& post_logout_redirect_uri=${encodeURIComponent(
      process.env.NEXTAUTH_URL ?? "/"
    )}`;

    try {
      await fetch(url, { method: "GET" });
    } catch (e) {
      console.error(e);
      return new Response({ status: 500 });
    }
  }

  return new Response({ status: 200 });
}
