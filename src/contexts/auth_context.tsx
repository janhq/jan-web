import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { firebaseApp } from "@/utils/firebase";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  currentUser: User | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentAuth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(currentAuth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth function must be used within the AuthProvider");
  }
  return context;
}
