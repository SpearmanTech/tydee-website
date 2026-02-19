"use client";
import React, { useState, useEffect } from 'react';
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, sendEmailVerification, reload } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  // 1. Polling for verification if they are stuck on the verification screen
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (needsVerification) {
      interval = setInterval(async () => {
        if (auth.currentUser) {
          await reload(auth.currentUser);
          if (auth.currentUser.emailVerified) {
            checkOnboardingStatus(auth.currentUser.uid);
            clearInterval(interval);
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [needsVerification]);

  const checkOnboardingStatus = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = userDoc.data();
    if (userData?.hasCompletedOnboarding) {
      router.push("/dashboard");
    } else {
      router.push("/onboarding");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
   try {
  const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
  const user = userCredential.user;
  
  console.log("Auth Success. UID:", user.uid);

  // Check if user exists in the 'users' collection
  const userDoc = await getDoc(doc(db, "users", user.uid));
  
  if (!userDoc.exists()) {
    console.error("User document missing in Firestore!");
    // This happens if the user signed up but the database write failed
    router.push("/onboarding");
    return;
  }

  const userData = userDoc.data();
  if (userData?.hasCompletedOnboarding) {
    router.push("/dashboard");
  } else {
    router.push("/onboarding");
  }

} catch (e: any) {
  console.error("Login Error Code:", e.code); // Log the actual Firebase code
  if (e.code === 'auth/invalid-credential') {
    alert("Invalid email or password. Please check your credentials.");
  } else {
    alert("Login Error: " + e.message);
  }
}

  const resendEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      alert("New verification link sent!");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {!needsVerification ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <div className="inline-block p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 mb-4">
                <ShieldCheck className="text-indigo-500 w-8 h-8" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter">Welcome back.</h1>
              <p className="text-slate-500 mt-2">Access your professional hub.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 space-y-4">
                <div className="flex items-center gap-4 border-b border-white/10 py-4 group">
                  <Mail className="text-slate-600 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
                  <input 
                    type="email" placeholder="Email Address" required
                    className="bg-transparent w-full outline-none font-bold text-slate-300 placeholder:text-slate-700"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-4 border-b border-white/10 py-4 group">
                  <Lock className="text-slate-600 group-focus-within:text-indigo-500 transition-colors w-5 h-5" />
                  <input 
                    type="password" placeholder="Password" required
                    className="bg-transparent w-full outline-none font-bold text-slate-300 placeholder:text-slate-700"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black mt-4 transition-all flex justify-center items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={18}/></>}
                </button>
              </div>
            </form>
            <p className="text-center mt-8 text-slate-500 text-sm">
              Don't have a pro account? <Link href="/onboarding" className="text-indigo-400 font-bold hover:underline">Register</Link>
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="verification"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 border-indigo-500/30">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="text-indigo-400 w-8 h-8 animate-pulse" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter mb-4">Verify your email.</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                We've detected that your email hasn't been verified yet. 
                Please check <span className="text-white font-bold">{formData.email}</span> and click the link to continue.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => window.open('https://mail.google.com', '_blank')}
                  className="w-full bg-white text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all"
                >
                  Open Mail <ExternalLink size={16} />
                </button>
                
                <button 
                  onClick={resendEmail}
                  className="w-full bg-white/5 text-slate-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all border border-white/5"
                >
                  Resend Link <RefreshCw size={16} />
                </button>
              </div>

              <button 
                onClick={() => setNeedsVerification(false)}
                className="mt-8 text-xs font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300"
              >
                ← Back to Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}}