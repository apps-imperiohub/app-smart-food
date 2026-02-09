import type { User } from "@react-native-google-signin/google-signin";
import React, { createContext, useContext, useEffect } from "react";
import { configureGoogleSignin } from "../../google/google-signin";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

interface AuthContextType {
  userInfo: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  revokeAccess: () => Promise<void>;
  getCurrentUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useGoogleAuth();

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
