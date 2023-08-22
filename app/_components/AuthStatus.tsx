"use client";
import { useSession, signIn, signOut } from "next-auth/react";

async function keycloakSessionLogOut() {
  try {
    await fetch(`api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (session) {
    return (
      <div>
        Logged in as{" "}
        <span className="text-yellow-100">{session.user?.email ?? ""}</span>
        <button
          onClick={() =>
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }))
          }
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div>
      Not logged in.
      <button
        className="bg-blue-900 font-bold text-white py-1 px-2 rounded border border-gray-500"
        onClick={() => signIn("keycloak")}
      >
        Sign in
      </button>
    </div>
  );
}
