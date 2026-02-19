"use client";

import React, { useState, useEffect } from 'react';
import { auth, db, storage } from "@/lib/firebase"; 
import { doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  reload, 
  sendEmailVerification, 
  User 
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Camera, CreditCard, ShieldAlert, CheckCircle2, 
  MapPin, Lock, Mail, Loader2, Sparkles, Zap, X,
  TrendingUp, ShieldCheck
} from "lucide-react";

const AVAILABLE_SERVICES = ["Cleaning", "Plumbing", "Electrical", "Gardening", "Painting", "Handyman"];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [step, setStep] = useState(0); 
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
    businessName: "", 
    experienceYears: "",
    selectedServices: [] as string[], 
    location: "",
    profileImage: null as File | null, 
    idImage: null as File | null,
    clearanceImage: null as File | null,
  });

  // --- SYNC WITH FIRESTORE & AUTH OBSERVER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // We block background sync while isSubmitting is true to stop the "jump back"
      if (user && !isSubmitting) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().hasCompletedOnboarding) {
          router.push("/dashboard");
          return;
        }

        const profDoc = await getDoc(doc(db, "professionals", user.uid));
        if (profDoc.exists()) {
          const data = profDoc.data();
          setFormData(prev => ({
            ...prev,
            businessName: data.professionalName || "",
            experienceYears: data.experienceYears?.toString() || "",
            selectedServices: data.services || [],
            location: data.location || ""
          }));
          
          // Only update local step if the database version is newer
          if (data.onboardingStep && data.onboardingStep > step) {
            setStep(data.onboardingStep);
          }
        }

        if (user.emailVerified) {
          if (step === 0) setStep(1);
        } else if (isSigningUp) {
          const interval = setInterval(async () => {
            await reload(user);
            if (auth.currentUser?.emailVerified) {
              setStep(1);
              clearInterval(interval);
            }
          }, 3000);
          return () => clearInterval(interval);
        }
      }
      setInitializing(false);
    });
    return () => unsubscribe();
  }, [isSigningUp, router, step, isSubmitting]);

  const uploadWithProgress = (path: string, file: File) => {
    return new Promise<string>((resolve, reject) => {
      const sRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(sRef, file);

      uploadTask.on('state_changed', 
        (snap) => {
          const p = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setUploadProgress(p);
        },
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const handleInitialSignUp = async () => {
    if (!formData.email || !formData.password) return alert("Please fill in credentials");
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(user);
      setIsSigningUp(true);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const saveStep1 = async () => {
    if (!formData.businessName || !formData.experienceYears) return alert("Missing Info");
    setLoading(true);
    try {
      await setDoc(doc(db, "professionals", currentUser!.uid), {
        professionalName: formData.businessName.trim(),
        experienceYears: Number(formData.experienceYears),
        onboardingStep: 2, 
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setStep(2);
    } catch (e: any) {
      alert("Sync Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveStep2 = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "professionals", currentUser!.uid), {
        services: formData.selectedServices,
        location: formData.location,
        onboardingStep: 3,
        updatedAt: serverTimestamp(),
      });
      setStep(3);
    } catch (e) { alert("Save failed."); }
    setLoading(false);
  };

 const handleFinalSubmit = async (skipClearance = false) => {
  if (!currentUser) return;
  setLoading(true);
  setIsSubmitting(true);
  setUploadProgress(0);

  try {
    // CHANGE: Added a sub-folder /profile/ before the filename
    const profileUrl = formData.profileImage 
      ? await uploadWithProgress(`profileImages/${currentUser.uid}/avatar.jpg`, formData.profileImage) 
      : "";

    // These already follow the sub-folder pattern: verifications/UID/filename
    const idUrl = formData.idImage 
      ? await uploadWithProgress(`verifications/${currentUser.uid}/identity.jpg`, formData.idImage) 
      : "";

    const clearanceUrl = (!skipClearance && formData.clearanceImage) 
      ? await uploadWithProgress(`verifications/${currentUser.uid}/clearance.jpg`, formData.clearanceImage) 
      : "";

    await updateDoc(doc(db, "professionals", currentUser.uid), {
      profileImage: profileUrl,
      "verification.identity": { 
        status: idUrl ? "submitted" : "pending", 
        documentUrl: idUrl || null, 
        submittedAt: serverTimestamp() 
      },
      "verification.clearance": { 
        status: clearanceUrl ? "submitted" : "pending", 
        documentUrl: clearanceUrl || null, 
        submittedAt: serverTimestamp() 
      },
      onboardingStep: 5,
      updatedAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "users", currentUser.uid), { 
      hasCompletedOnboarding: true, 
      role: 'professional' 
    });

    setStep(5);
  } catch (e: any) {
    console.error("FINAL SUBMIT ERROR:", e);
    setIsSubmitting(false);
    alert(`Upload failed: ${e.message}`);
  } finally {
    setLoading(false);
  }
};

  if (initializing) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center selection:bg-indigo-500">
      <div className="w-full max-w-xl p-6 md:p-12">
        <div className="flex justify-between items-center mb-10 w-full">
          {step > 1 && step < 5 ? (
            <button onClick={() => setStep(s => s - 1)} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
          ) : <div />}
          
          {step >= 1 && step < 5 && (
            <button 
              onClick={async () => { await auth.signOut(); router.push("/"); }}
              className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all"
            >
              <X size={14}/> Exit & Reset
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
              {!isSigningUp ? (
                <>
                  <h2 className="text-4xl font-black tracking-tighter mb-8">Create your account.</h2>
                  <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-4 text-left">
                    <DarkAuthInput icon={<Mail size={20}/>} placeholder="Email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
                    <DarkAuthInput icon={<Lock size={20}/>} type="password" placeholder="Password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} />
                    <button onClick={handleInitialSignUp} disabled={loading} className="w-full bg-indigo-600 py-5 rounded-2xl font-black mt-4 transition-all hover:bg-indigo-500 shadow-xl shadow-indigo-600/10">
                      {loading ? "Creating..." : "Next: Verify Email"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-10 bg-indigo-500/10 border border-indigo-500/20 rounded-[3rem]">
                  <Mail className="w-12 h-12 text-indigo-500 mx-auto mb-4 animate-bounce" />
                  <h2 className="text-3xl font-black tracking-tighter mb-4">Check your inbox.</h2>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">Verification link sent to <br/><span className="text-indigo-400 font-bold">{formData.email}</span></p>
                  <div className="flex items-center justify-center gap-3 text-slate-500">
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Waiting</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 01 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8">Business Details</h2>
              <DarkInput label="Business Name" placeholder="e.g. Durban Pros" value={formData.businessName} onChange={(v: string) => setFormData({...formData, businessName: v})} />
              <DarkInput label="Years Experience" type="number" value={formData.experienceYears} onChange={(v: string) => setFormData({...formData, experienceYears: v})} placeholder="5" />
              <button onClick={saveStep1} disabled={loading} className="w-full bg-indigo-600 py-5 rounded-2xl font-black mt-10 transition-all hover:bg-indigo-500">
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Continue"}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 02 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8">Your Services</h2>
              <div className="flex flex-wrap gap-3 mb-10">
                {AVAILABLE_SERVICES.map(s => (
                  <button key={s} onClick={() => setFormData({...formData, selectedServices: formData.selectedServices.includes(s) ? formData.selectedServices.filter(x => x !== s) : [...formData.selectedServices, s]})} className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${formData.selectedServices.includes(s) ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"}`}>{s}</button>
                ))}
              </div>
              <DarkInput label="Service Area" icon={<MapPin size={16}/>} placeholder="Umhlanga" value={formData.location} onChange={(v: string) => setFormData({...formData, location: v})} />
              <button onClick={saveStep2} disabled={loading} className="w-full bg-indigo-600 py-5 rounded-2xl font-black mt-10">Continue</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 03 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8">Identity Setup</h2>
              <div className="space-y-6">
                <DarkUpload label="Professional Photo" icon={<Camera size={24}/>} file={formData.profileImage} onFile={(f: File) => setFormData({...formData, profileImage: f})} />
                <DarkUpload label="National ID" icon={<CreditCard size={24}/>} file={formData.idImage} onFile={(f: File) => setFormData({...formData, idImage: f})} />
              </div>
              <button onClick={() => setStep(4)} disabled={!formData.profileImage || !formData.idImage} className="w-full bg-indigo-600 py-5 rounded-2xl font-black mt-10 disabled:opacity-20">Continue</button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 04 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-4 text-red-500">Safety Audit</h2>
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex gap-4 mb-8">
                <ShieldAlert className="text-red-500 shrink-0" size={24} />
                <p className="text-red-200/70 text-sm leading-relaxed">Police Clearance is <b>Required</b>.</p>
              </div>
              <DarkUpload label="Police Clearance Document" icon={<CheckCircle2 size={24}/>} file={formData.clearanceImage} onFile={(f: File) => setFormData({...formData, clearanceImage: f})} />
              <button 
                onClick={() => handleFinalSubmit(false)} 
                disabled={loading || !formData.clearanceImage} 
                className="relative w-full bg-white text-black py-5 rounded-2xl font-black mt-10 disabled:opacity-30 overflow-hidden"
              >
                {loading && <motion.div className="absolute inset-0 bg-indigo-500/20" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} />}
                <span className="relative z-10">{loading ? `Encrypting... ${uploadProgress}%` : "Complete Setup"}</span>
              </button>
              <button onClick={() => handleFinalSubmit(true)} disabled={loading} className="w-full text-center mt-6 text-slate-500 text-[10px] font-black uppercase tracking-widest underline hover:text-white">Skip for now</button>
            </motion.div>
          )}

         {step === 5 && (
  <motion.div 
    key="step5" 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    className="text-center w-full max-w-md mx-auto pb-10"
  >
    {/* Header Section - Refined for Mobile */}
    <div className="mb-8">
      <div className="bg-indigo-500/20 p-4 rounded-full inline-block mb-4 border border-indigo-500/30">
        <Sparkles size={32} className="text-indigo-400" />
      </div>
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 italic text-white leading-none">
        Profile Created.
      </h2>
      <p className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-[9px]">
        Official Founding-Pro Status Assigned
      </p>
    </div>

    {/* Verification Status Card - Compact */}
    <div className="bg-white/[0.03] border border-white/10 p-5 rounded-[2rem] flex items-center gap-4 text-left mb-8">
      <div className="relative shrink-0">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <ShieldCheck className="absolute inset-0 m-auto w-4 h-4 text-indigo-400" />
      </div>
      <div>
        <h4 className="font-black text-sm uppercase tracking-tight">Verification Pending</h4>
        <p className="text-slate-500 text-[11px] leading-tight mt-1">
          Reviewing your docs. Once cleared, your <b>Verified Badge</b> will go live.
        </p>
      </div>
    </div>

    {/* Benefits List - Single Column for Mobile readability */}
    <div className="text-left mb-10 space-y-3">
      <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 ml-1">The Tydee Pro Edge</h3>
      <SuccessCard 
        icon={<TrendingUp size={18} className="text-indigo-400"/>} 
        title="Service Heatmap" 
        desc="Access live high-demand zones in Durban." 
      />
      <SuccessCard 
        icon={<Zap size={18} className="text-indigo-400"/>} 
        title="Instant Payouts" 
        desc="Funds clear as soon as the job is complete." 
      />
      <SuccessCard 
        icon={<Zap size={18} className="text-indigo-400"/>} 
        title="Tydee Squads" 
        badge="BETA"
        desc="Lead teams for commercial contracts." 
      />
    </div>

    {/* App Download Section - Scaled for smaller screens */}
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 mb-8">
      <h4 className="font-black text-lg mb-1">The Pro App</h4>
      <p className="text-slate-500 text-[11px] mb-6">Manage leads and heatmaps on the go.</p>
      
      <div className="flex justify-center gap-6 opacity-40 grayscale">
        <div className="text-center">
          <div className="bg-white p-1.5 rounded-lg mb-2 inline-block">
             <div className="w-16 h-16 bg-slate-200 flex items-center justify-center text-black font-black text-[7px] leading-none text-center">QR CODE<br/>iOS</div>
          </div>
          <p className="text-[7px] font-black uppercase tracking-tighter">iOS</p>
        </div>
        <div className="text-center">
          <div className="bg-white p-1.5 rounded-lg mb-2 inline-block">
             <div className="w-16 h-16 bg-slate-200 flex items-center justify-center text-black font-black text-[7px] leading-none text-center">QR CODE<br/>PLAY STORE</div>
          </div>
          <p className="text-[7px] font-black uppercase tracking-tighter">Android</p>
        </div>
      </div>
    </div>

    {/* Primary Action */}
    <button 
      onClick={() => router.push("/dashboard")} 
      className="w-full bg-white text-black py-5 rounded-2xl font-black transition-all active:scale-95 shadow-xl shadow-white/5 text-sm uppercase tracking-widest"
    >
      Enter Pro Dashboard
    </button>
  </motion.div>
)}
          
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function SuccessCard({ icon, title, badge, desc }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-5 rounded-[2rem] hover:bg-white/[0.05] transition-colors group">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-lg font-bold flex items-center gap-2">
          {title} {badge && <span className="text-[8px] bg-indigo-600 px-2 py-0.5 rounded-full tracking-tighter">{badge}</span>}
        </h3>
      </div>
      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function DarkInput({ label, value, onChange, placeholder, type = "text", icon }: any) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 ml-1">
        {icon}
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      </div>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full bg-white/5 border-b-2 border-white/10 py-4 px-1 text-lg font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700" 
      />
    </div>
  );
}

function DarkAuthInput({ icon, onChange, ...props }: any) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-4 group">
      <span className="text-slate-600 group-focus-within:text-indigo-500 transition-colors">{icon}</span>
      <input {...props} onChange={(e: any) => onChange(e.target.value)} className="bg-transparent w-full outline-none font-bold text-slate-300 placeholder:text-slate-700" />
    </div>
  );
}

function DarkUpload({ label, icon, file, onFile }: any) {
  return (
    <div className="mb-6">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block ml-1">{label}</label>
      <label className={`w-full h-36 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all ${file ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}>
        <input type="file" className="hidden" onChange={e => onFile(e.target.files?.[0] || null)} accept="image/*,.pdf" />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-indigo-400" />
            <span className="text-indigo-400 font-bold text-xs truncate max-w-[150px]">{file.name}</span>
          </div>
        ) : (
          <div className="text-indigo-500 flex flex-col items-center gap-2">
            {icon}
            <span className="text-[10px] font-black uppercase tracking-widest">Select File</span>
          </div>
        )}
      </label>
    </div>
  );
}