import { getServerSession } from "next-auth";
import { decrypt } from "./encryption";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    return decrypt(session.access_token);
  }
  return null;
}

export async function getIdToken() {
  const session = await getServerSession(authOptions);
  if (session) {
    return decrypt(session.id_token);
  }
  return null;
}
