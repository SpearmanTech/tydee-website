"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, reload } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isOnboarded: boolean;
  isVerified: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        setIsVerified(fbUser.emailVerified);

        // Listen to the user document for onboarding status
        const userRef = doc(db, "users", fbUser.uid);
        const unsubDoc = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            setIsOnboarded(snap.data().hasCompletedOnboarding === true);
          }
          setLoading(false);
        });

        // Auto-reload user to check for email verification
        if (!fbUser.emailVerified) {
          const interval = setInterval(async () => {
            await reload(fbUser);
            if (auth.currentUser?.emailVerified) {
              setIsVerified(true);
              clearInterval(interval);
            }
          }, 3000);
          return () => {
            clearInterval(interval);
            unsubDoc();
          };
        }
        return () => unsubDoc();
      } else {
        setUser(null);
        setIsOnboarded(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isOnboarded, isVerified }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
