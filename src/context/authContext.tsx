"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, reload } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  hasJoinedWaitlist: boolean; // Renamed for clarity in the new model
  isVerified: boolean;
  waitlistType: "employed" | "unemployed" | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [waitlistType, setWaitlistType] = useState<"employed" | "unemployed" | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(fbUser);
        setIsVerified(fbUser.emailVerified);

        /** * STRATEGY: Listen to the "users" doc. 
         * Once they finish the survey, we update hasJoinedWaitlist 
         * so the app knows to show them the "Success" screen instead of the survey.
         */
        const userRef = doc(db, "users", fbUser.uid);
        const unsubDoc = onSnapshot(userRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setHasJoinedWaitlist(data.hasJoinedWaitlist === true);
            setWaitlistType(data.waitlistType || null);
          }
          setLoading(false);
        });

        // Auto-reload to detect email verification in real-time
        if (!fbUser.emailVerified) {
          const interval = setInterval(async () => {
            try {
              await reload(fbUser);
              if (auth.currentUser?.emailVerified) {
                setIsVerified(true);
                clearInterval(interval);
              }
            } catch (e) {
              console.error("Reload failed", e);
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
        setHasJoinedWaitlist(false);
        setWaitlistType(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, hasJoinedWaitlist, isVerified, waitlistType }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};