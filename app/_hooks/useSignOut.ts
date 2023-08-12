import { useAuth } from "../_contexts/authContext";

export default function useSignOut() {
  const { handleSignOut } = useAuth();

  const signOut = () => {
    handleSignOut()
      .catch((e) => {
        console.error(e);
      });
  };

  return { signOut };
}
