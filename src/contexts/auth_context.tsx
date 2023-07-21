import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  authenticated: boolean;
  setAuthenticated: (state: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);

  return <AuthContext.Provider value={{ authenticated, setAuthenticated }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth function must be used within the AuthProvider");
  }
  return context;
}
