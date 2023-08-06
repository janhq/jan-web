"use client";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { firebaseApp } from "@/utils/firebase";
import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import useTracking from "@/utils/posthog";
import Gleap from "gleap";

interface AuthContextType {
  currentUser: User | undefined;
  showLogin: boolean;
  isReady: boolean;
  handleSignInWithGoogle: (onComplete: () => void) => Promise<void>;
  handleSignOut: () => Promise<void>;
  setShowLogin: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Context profider
 * @param param0
 * @returns
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const { identityUser } = useTracking();

  useEffect(() => {
    const currentAuth = getAuth(firebaseApp);
    currentAuth.authStateReady().then(() => setIsReady(true));
    const unsubscribe = onAuthStateChanged(currentAuth, (user) => {
      if (user) {
        setCurrentUser(user);
        identityUser(user.email || user.displayName || user.uid);
        Gleap.identify(user.uid, {
          name: user.displayName || undefined,
          email: user.email || undefined,
        });
      } else {
        setCurrentUser(undefined);
        identityUser("");
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
      console.error("Error signing in with Google:", error);
    } finally {
      onComplete();
    }
  }

  // Sign out account
  async function handleSignOut() {
    return getAuth(firebaseApp).signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        showLogin,
        isReady,
        handleSignInWithGoogle,
        handleSignOut,
        setShowLogin,
      }}
    >
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
