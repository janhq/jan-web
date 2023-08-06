import { useAuth } from "../contexts/authContext";

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
