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
  firebaseToken: String | null;
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
  const [firebaseToken, setFirebaseToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentAuth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(currentAuth, (user) => {
      if (user) {
        setCurrentUser(user);
        user.getIdToken().then(token => {
          setFirebaseToken(token)
        })
        setLoading(false);
      } else {
        setCurrentUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  // Open Google sign in dialog once requested
  async function handleSignInWithGoogle(onComplete: () => void) {
    try {
      setLoading(true);
      const googleAuthProvider = new GoogleAuthProvider();
      const currentAuth = getAuth(firebaseApp);
      signInWithPopup(currentAuth, googleAuthProvider).then(async (result) => {
        const user = result.user as any;
        if (result.user) {
          setCurrentUser(user);
          setFirebaseToken(await user.getIdToken())
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      onComplete()
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, firebaseToken, handleSignInWithGoogle }}>
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
