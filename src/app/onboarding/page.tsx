"use client";
import React, { useState } from 'react';
import { auth, db, storage } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Camera, CreditCard, ShieldAlert, CheckCircle2, MapPin, Lock, Mail } from "lucide-react";

const AVAILABLE_SERVICES = ["Cleaning", "Plumbing", "Electrical", "Gardening", "Painting", "Handyman"];

export default function DarkWebOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "", password: "",
    businessName: "", experienceYears: "",
    selectedServices: [] as string[], location: "",
    profileImage: null as File | null, idImage: null as File | null,
    clearanceImage: null as File | null,
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => step > 1 ? setStep(s => s - 1) : router.back();

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(user);

      const uploadPromises = [];
      
      if (formData.profileImage) {
        const pRef = ref(storage, `profileImages/${user.uid}.jpg`);
        uploadPromises.push(uploadBytes(pRef, formData.profileImage).then(() => getDownloadURL(pRef)));
      } else { uploadPromises.push(Promise.resolve("")); }

      if (formData.idImage) {
        const idRef = ref(storage, `verifications/${user.uid}/identity.jpg`);
        uploadPromises.push(uploadBytes(idRef, formData.idImage).then(() => getDownloadURL(idRef)));
      } else { uploadPromises.push(Promise.resolve("")); }

      if (formData.clearanceImage) {
        const cRef = ref(storage, `verifications/${user.uid}/clearance.jpg`);
        uploadPromises.push(uploadBytes(cRef, formData.clearanceImage).then(() => getDownloadURL(cRef)));
      } else { uploadPromises.push(Promise.resolve("")); }

      const [profileUrl, idUrl, clearanceUrl] = await Promise.all(uploadPromises);

      await setDoc(doc(db, "professionals", user.uid), {
        professionalName: formData.businessName,
        experienceYears: Number(formData.experienceYears),
        services: formData.selectedServices,
        location: formData.location,
        profileImage: profileUrl,
        email: formData.email, 
        verification: {
          identity: { status: idUrl ? "submitted" : "pending", documentUrl: idUrl, submittedAt: serverTimestamp() },
          clearance: { status: clearanceUrl ? "submitted" : "pending", documentUrl: clearanceUrl, submittedAt: serverTimestamp() },
          emailVerified: false 
        },
        onboardingStep: 4,
        updatedAt: serverTimestamp(),
      });

      await setDoc(doc(db, "users", user.uid), { 
        hasCompletedOnboarding: true,
        role: 'professional' 
      }, { merge: true });

      router.push("/onboarding/verify-email");

    } catch (e: any) {
      console.error("Signup Error:", e);
      alert("Onboarding Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center selection:bg-indigo-500">
      <div className="w-full max-w-xl p-6 md:p-12">
        
        <button onClick={handleBack} className="mb-10 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 01 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8">Setup your Pro Profile.</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 space-y-4 mb-8">
                   <DarkAuthInput icon={<Mail className="w-4.5 h-4.5"/>} placeholder="Email" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
                   <DarkAuthInput icon={<Lock className="w-4.5 h-4.5"/>} type="password" placeholder="Password" value={formData.password} onChange={(v: string) => setFormData({...formData, password: v})} />
                </div>
                
                <DarkInput label="Business Name" placeholder="e.g. Durban Cleaning Pros" value={formData.businessName} onChange={(v: string) => setFormData({...formData, businessName: v})} />
                <DarkInput label="Years Experience" type="number" placeholder="e.g. 5" value={formData.experienceYears} onChange={(v: string) => setFormData({...formData, experienceYears: v})} />
              </div>

              <button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black mt-10 transition-all shadow-xl shadow-indigo-600/20">
                Continue to Services
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 02 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8">Your Services & Area.</h2>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {AVAILABLE_SERVICES.map(s => (
                  <button 
                    key={s} 
                    onClick={() => setFormData({...formData, selectedServices: formData.selectedServices.includes(s) ? formData.selectedServices.filter(x => x !== s) : [...formData.selectedServices, s]})}
                    className={`px-6 py-3 rounded-xl font-bold border-2 transition-all ${formData.selectedServices.includes(s) ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <DarkInput label="Service Area (Durban Suburb)" icon={<MapPin className="w-4 h-4"/>} placeholder="e.g. Umhlanga" value={formData.location} onChange={(v: string) => setFormData({...formData, location: v})} />
              
              <button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black mt-10 transition-all">
                Next: Verification
              </button>
            </motion.div>
          )}

      
      
                {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 03 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8">Identity Verification.</h2>
              
              <div className="space-y-6">
                <DarkUpload label="Professional Photo" icon={<Camera className="w-6 h-6"/>} file={formData.profileImage} onFile={(f: File | null) => setFormData({...formData, profileImage: f})} />
                <DarkUpload label="Government Issued ID" icon={<CreditCard className="w-6 h-6"/>} file={formData.idImage} onFile={(f: File | null) => setFormData({...formData, idImage: f})} />
              </div>

              <button onClick={handleNext} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black mt-10 transition-all">
                Next: Safety Clearance
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">Step 04 / 04</span>
              <h2 className="text-4xl font-black tracking-tighter mt-2 mb-4">Safety First.</h2>
              
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex gap-4 mb-8">
                <ShieldAlert className="text-red-500 shrink-0 w-6 h-6" />
                <p className="text-red-200/70 text-sm leading-relaxed">
                  You can browse the hub now, but you <span className="text-red-500 font-black italic">cannot accept jobs</span> until your Police Clearance is approved by our team.
                </p>
              </div>

              <DarkUpload label="Police Clearance (Optional)" icon={<CheckCircle2 className="w-6 h-6"/>} file={formData.clearanceImage} onFile={(f: File | null) => setFormData({...formData, clearanceImage: f})} />
              
              <button 
                onClick={handleFinalSubmit} 
                disabled={loading}
                className="w-full bg-white text-black hover:bg-indigo-500 hover:text-white py-5 rounded-2xl font-black mt-10 transition-all flex justify-center items-center"
              >
                {loading ? "Verifying Credentials..." : "Complete Setup"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// THEME-SPECIFIC COMPONENTS
interface DarkInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}

function DarkInput({ label, value, onChange, placeholder, type = "text", icon }: DarkInputProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 ml-1">
        {icon}
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
      </div>
      <input 
        type={type} placeholder={placeholder} value={value} 
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/5 border-b-2 border-white/10 py-4 px-1 text-lg font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700"
      />
    </div>
  );
}

interface DarkAuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  onChange: any; // Handled by parent
}

function DarkAuthInput({ icon, onChange, ...props }: DarkAuthInputProps) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-3 group">
      <span className="text-slate-600 group-focus-within:text-indigo-500 transition-colors">{icon}</span>
      <input 
        {...props} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent w-full outline-none font-bold text-slate-300" 
      />
    </div>
  );
}

interface DarkUploadProps {
  label: string;
  icon: React.ReactNode;
  file: File | null;
  onFile: (f: File | null) => void;
}

function DarkUpload({ label, icon, file, onFile }: DarkUploadProps) {
  return (
    <div>
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block ml-1">{label}</label>
      <label className={`w-full h-36 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all ${file ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"}`}>
        <input type="file" className="hidden" onChange={e => onFile(e.target.files?.[0] || null)} />
        {file ? (
          <div className="text-center">
            <span className="text-indigo-400 font-black text-xs block mb-1">FILE ATTACHED</span>
            <span className="text-slate-500 text-[10px] truncate max-w-[200px] block">{file.name}</span>
          </div>
        ) : (
          <div className="text-indigo-500 flex flex-col items-center gap-3">
            {icon}
            <span className="text-[10px] font-black uppercase tracking-widest">Select Image</span>
          </div>
        )}
      </label>
    </div>
  );
}