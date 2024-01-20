// authContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("token")
  );

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return !!token;
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
