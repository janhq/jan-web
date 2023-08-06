import { useAuth } from "../contexts/auth_context";

export default function useGoogleSignIn() {
  const { handleSignInWithGoogle } = useAuth();

  const signInWithGoole = async (onComplete: () => void) => {
    try {
      await handleSignInWithGoogle(onComplete);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    signInWithGoole,
  };
}
