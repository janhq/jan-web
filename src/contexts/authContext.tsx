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
import useGetUserConversations from "../hooks/useGetUserConversations";

interface AuthContextType {
  currentUser: User | undefined;
  showLogin: boolean;
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
  const { getUserConversations } = useGetUserConversations();

  useEffect(() => {
    const currentAuth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(currentAuth, (user) => {
      if (user) {
        getUserConversations(user);
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
      console.error("Error signing in with Google:", error);
    } finally {
      onComplete();
    }
  }

  // Sign out account
  async function handleSignOut() {
    try {
      const currentAuth = getAuth(firebaseApp);
      await currentAuth.signOut();
      setCurrentUser(undefined);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        showLogin,
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
