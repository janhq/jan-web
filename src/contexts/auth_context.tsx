import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { firebaseApp } from "@/utils/firebase";
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";

interface AuthContextType {
  currentUser: User | undefined;
  handleSignInWithGoogle: (onComplete: () => void) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Context profider
 * @param param0 
 * @returns 
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const currentAuth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(currentAuth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  // Open Google sign in dialog once requested
  async function handleSignInWithGoogle(onComplete: () => void) {
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      const currentAuth = getAuth(firebaseApp);
      signInWithPopup(currentAuth, googleAuthProvider).then(async (result) => {
        const user = result.user as any;
        if (user) {
          setCurrentUser(user);
        }
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      onComplete()
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, handleSignInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

// Authentication Context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth function must be used within the AuthProvider");
  }
  return context;
}
