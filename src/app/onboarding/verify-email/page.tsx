"use client";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [resent, setResent] = useState(false);

  const resend = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setResent(true);
      setTimeout(() => setResent(false), 60000); // 1 minute cooldown
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30">
        <Mail className="text-indigo-400" size={32} />
      </div>
      
      <h1 className="text-4xl font-black mb-4 tracking-tighter">Check your inbox.</h1>
      <p className="text-slate-400 max-w-sm mx-auto mb-10 leading-relaxed">
        We've sent a verification link to your email. Please click it to activate your Tydee Pro account.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button 
          onClick={() => window.location.reload()}
          className="bg-white text-black py-4 rounded-2xl font-black flex items-center justify-center gap-2"
        >
          I've Verified My Email <ArrowRight size={18} />
        </button>

        <button 
          onClick={resend}
          disabled={resent}
          className="text-slate-500 font-bold text-sm hover:text-indigo-400 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={14} className={resent ? "animate-spin" : ""} />
          {resent ? "Email Sent!" : "Resend Verification Email"}
        </button>
      </div>
    </main>
  );
}