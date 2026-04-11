"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  getCountFromServer,
  doc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  reload,
  User,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Loader2,
  Sparkles,
  Briefcase,
  User as UserIcon,
  Smartphone,
  Hammer,
  Zap,
  Users,
  Flame,
  ChevronRight,
  Lock,
} from "lucide-react";

export default function DiscoveryOnboarding() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState<
    "employed" | "unemployed" | null
  >(null);
  const [liveCount, setLiveCount] = useState(100);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    fullName: "",
    location: "",
    selectedServices: [] as string[],
    surveyAnswers: {} as Record<string, string>,
  });

  // --- FETCH LIVE WAITLIST COUNT ---
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const empSnap = await getCountFromServer(
          collection(db, "waitlist_employed"),
        );
        const unempSnap = await getCountFromServer(
          collection(db, "waitlist_unemployed"),
        );
        setLiveCount(empSnap.data().count + unempSnap.data().count + 84);
      } catch (e) {
        console.error("Count fetch failed", e);
      }
    };
    fetchCount();
  }, []);

  // --- HYBRID SURVEY DEFINITION ---
  const getQuestions = () => {
    const isEmp = employmentStatus === "employed";

    const employedPath = [
      {
        id: "payout_impact",
        q: "How would 'Instant Payout' change your daily operations?",
        opt: [
          "Major: Solves cashflow gaps",
          "Minor: Helps with fuel/supplies",
          "Not needed",
        ],
        canExplain: true,
      },
      {
        id: "equipment_hub",
        q: "How do you get access to equipment you don't have for a job?",
        opt: ["Formal Rental", "Informal (Borrowing)", "I turn down the job"],
        canExplain: true,
        placeholder: "List tools you struggle to get (e.g. Scaffolding)...",
      },
      {
        id: "squad_leadership",
        q: "If you secured a massive contract, would you manage a 5-man Foona Squad?",
        opt: [
          "Yes, ready to scale into CEO",
          "Only if guaranteed",
          "No, I prefer solo",
        ],
        canExplain: true,
        placeholder: "What support would you need?",
      },
      {
        id: "lead_source",
        q: "Where do you get your customers right now?",
        opt: ["Word of mouth", "Facebook/Social Media", "Paid lead-gen apps"],
        canExplain: true,
      },
      {
        id: "logistics_pain",
        q: "What's the #1 time-waster in your business?",
        opt: ["Driving for supplies", "Quoting and admin", "Chasing payments"],
        canExplain: true,
      },
      {
        id: "hiring_barrier",
        q: "Why haven't you hired a full-time assistant yet?",
        opt: [
          "Can't afford steady wages",
          "Lack of trust",
          "Work is inconsistent",
        ],
        canExplain: true,
      },
      {
        id: "training_will",
        q: "Willing to mentor a junior pro for priority job leads?",
        opt: ["Yes, giving back is key", "Only if I'm paid", "No, too busy"],
        canExplain: true,
      },
      {
        id: "regional_target",
        q: "Which area do you serve the most currently?",
        opt: [
          "North (Umhlanga/Ballito)",
          "Central (Berea/CBD)",
          "South (Umlazi/Amanzimtoti)",
        ],
        canExplain: true,
      },
      {
        id: "tech_usage",
        q: "What is your primary business management tool?",
        opt: ["WhatsApp only", "Pen & Paper", "Excel/Software"],
        canExplain: true,
      },
      {
        id: "empire_vision",
        q: "The Vision: Describe the legacy you want to leave.",
        type: "text",
        placeholder: "I want to employ my whole block...",
      },
    ];

    const unemployedPath = [
      {
        id: "experience_level",
        q: "How many years of active experience do you have?",
        opt: ["Junior (0-2)", "Mid (3-5)", "Senior (6-10)", "Master (10+)"],
        canExplain: true,
      },
      {
        id: "tool_gap",
        q: "Feature: 'Rent-to-Own'. Would you pay off tools through jobs?",
        opt: ["Yes, biggest need", "Maybe", "No"],
        canExplain: true,
        placeholder: "What tools do you need most?",
      },
      {
        id: "dispatch_hub",
        q: "Would you meet at a physical Foona Hub for daily work?",
        opt: ["Yes, professional", "No, wait at home", "Only if Wi-Fi is free"],
        canExplain: true,
      },
      {
        id: "data_struggle",
        q: "Do you run out of data while trying to find work?",
        opt: ["Daily struggle", "Occasionally", "Never"],
        canExplain: true,
      },
      {
        id: "safety_need",
        q: "Would a 'Verified Badge' make you feel safer in new areas?",
        opt: ["Yes, major concern", "A little", "No"],
        canExplain: true,
      },
      {
        id: "unemployment_cause",
        q: "Main reason you left your last steady job?",
        opt: ["Company folded", "Retrenched", "Transport costs"],
        canExplain: true,
      },
      {
        id: "pawn_reality",
        q: "Have you had to sell/pawn tools for living costs?",
        opt: ["Yes, recently", "Yes, long ago", "No"],
        canExplain: true,
      },
      {
        id: "cert_status",
        q: "Current status of your trade qualification?",
        opt: ["Valid", "Expired", "Exp but no cert"],
        canExplain: true,
      },
      {
        id: "hunger_index",
        q: "Does lack of work affect your ability to buy groceries?",
        opt: ["Constant struggle", "Sometimes", "I have a safety net"],
        canExplain: true,
      },
      {
        id: "barrier_essay",
        q: "Final Thought: What is the #1 thing Foona can do for you?",
        type: "text",
        placeholder: "I just need a chance...",
      },
    ];

    return isEmp ? employedPath : unemployedPath;
  };

  const questions = getQuestions();
  const surveyIndex = step - 3;

  // --- NAVIGATION LOGIC ---
  const handleBack = () => setStep((s) => s - 1);

  const handleNext = () => {
    const currentQ = questions[surveyIndex];
    const hasSelection = !!formData.surveyAnswers[currentQ.id];
    const hasExtra = !!formData.surveyAnswers[`${currentQ.id}_extra`];

    if (currentQ.type === "text" && !hasExtra) {
      return alert("Please share your thoughts before finalized.");
    }
    if (currentQ.type !== "text" && !hasSelection && !hasExtra) {
      return alert("Please select an option or provide details.");
    }

    if (step === 3 + questions.length - 1) {
      handleFinalSubmit();
    } else {
      setStep((s) => s + 1);
    }
  };

  // --- SUBMISSION LOGIC ---
  const handleFinalSubmit = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await reload(auth.currentUser);
      const collectionName =
        employmentStatus === "employed"
          ? "waitlist_employed"
          : "waitlist_unemployed";
      await addDoc(collection(db, collectionName), {
        uid: auth.currentUser.uid,
        ...formData,
        surveyAnswers: JSON.parse(JSON.stringify(formData.surveyAnswers)),
        status: employmentStatus,
        timestamp: serverTimestamp(),
      });
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          hasJoinedWaitlist: true,
          waitlistType: employmentStatus,
          lastUpdated: serverTimestamp(),
        },
        { merge: true },
      );
      setStep(99);
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInitialSignUp = async () => {
    if (!formData.email || !formData.password)
      return alert("Please fill in credentials");
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      await sendEmailVerification(user);
      setIsSigningUp(true);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user?.emailVerified && step === 0) setStep(1);
      if (user && !user.emailVerified && isSigningUp) {
        const interval = setInterval(async () => {
          try {
            await reload(user);
            if (auth.currentUser?.emailVerified) {
              setStep(1);
              clearInterval(interval);
            }
          } catch (error) {
            console.error("Reload failed", error);
          }
        }, 3000);
        return () => clearInterval(interval);
      }
    });
    return () => unsubscribe();
  }, [isSigningUp, step]);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center px-4 selection:bg-indigo-500">
      <div className="w-full max-w-xl py-12">
        <AnimatePresence mode="wait">
          {/* STEP 0: AUTH */}
          {step === 0 && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              {!isSigningUp ? (
                <>
                  <h2 className="text-5xl font-black tracking-tighter mb-4 italic leading-none text-white">
                    The Founding <br />
                    Registry.
                  </h2>
                  <p className="text-slate-500 mb-8 text-sm">
                    Join {liveCount} Durban professionals building the future.
                  </p>
                  <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 space-y-4 text-left backdrop-blur-md">
                    <DarkAuthInput
                      icon={<Mail size={20} />}
                      placeholder="Email"
                      value={formData.email}
                      onChange={(v: string) =>
                        setFormData({ ...formData, email: v })
                      }
                    />
                    <DarkAuthInput
                      icon={<Lock size={20} />}
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(v: string) =>
                        setFormData({ ...formData, password: v })
                      }
                    />
                    <button
                      onClick={handleInitialSignUp}
                      disabled={loading}
                      className="w-full bg-indigo-600 py-5 rounded-2xl font-black mt-4 transition-all hover:bg-indigo-500 shadow-xl shadow-indigo-600/20"
                    >
                      {loading ? "Initializing..." : "Verify & Continue"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-10 bg-indigo-500/10 border border-indigo-500/20 rounded-[3rem]">
                  <Mail className="w-16 h-16 text-indigo-500 mx-auto mb-6 animate-bounce" />
                  <h2 className="text-3xl font-black tracking-tighter mb-4 text-white">
                    Check your inbox.
                  </h2>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed">
                    We sent a link to{" "}
                    <span className="text-indigo-400 font-bold">
                      {formData.email}
                    </span>
                    . Click it to unlock the registry.
                  </p>
                  <div className="flex items-center justify-center gap-3 text-slate-500">
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Awaiting Verification
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 1: CONTACT */}
          {step === 1 && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="h-1 flex-1 bg-indigo-600 rounded-full" />
                <div className="h-1 flex-1 bg-white/10 rounded-full" />
                <span className="text-[10px] font-black text-indigo-400 ml-4 tracking-widest">
                  CORE IDENTITY
                </span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter mb-8 italic text-white">
                Basic Details
              </h2>
              <div className="space-y-6">
                <DarkInput
                  label="Full Name"
                  placeholder="e.g. Sipho Cele"
                  value={formData.fullName}
                  onChange={(v: string) =>
                    setFormData({ ...formData, fullName: v })
                  }
                />
                <DarkInput
                  label="WhatsApp Number"
                  icon={<Smartphone size={16} />}
                  placeholder="081 234 5678"
                  value={formData.phone}
                  onChange={(v: string) =>
                    setFormData({ ...formData, phone: v })
                  }
                />
                <DarkInput
                  label="Durban Suburb"
                  icon={<MapPin size={16} />}
                  placeholder="e.g. Umlazi / Berea"
                  value={formData.location}
                  onChange={(v: string) =>
                    setFormData({ ...formData, location: v })
                  }
                />
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-indigo-600 py-5 rounded-2xl font-black mt-10 shadow-lg shadow-indigo-600/20"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* STEP 2: SPLIT */}
          {step === 2 && (
            <motion.div
              key="split"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <button
                onClick={handleBack}
                className="mb-6 text-slate-500 flex items-center gap-2 text-xs font-bold hover:text-white transition-colors"
              >
                <ArrowLeft size={16} /> GO BACK
              </button>
              <h2 className="text-4xl font-black tracking-tighter mb-8 italic text-white leading-tight">
                Your Current Path?
              </h2>
              <div className="space-y-4">
                <StatusCard
                  icon={<Briefcase size={32} />}
                  title="Self-Employed"
                  desc="I run an active service business."
                  onSelect={() => {
                    setEmploymentStatus("employed");
                    setStep(3);
                  }}
                />
                <StatusCard
                  icon={<UserIcon size={32} />}
                  title="Seeking Opportunity"
                  desc="I have skills but I'm currently unemployed."
                  onSelect={() => {
                    setEmploymentStatus("unemployed");
                    setStep(3);
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* HYBRID SURVEY (Steps 3-12) */}
          {step >= 3 && step < 3 + questions.length && (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleBack}
                  className="p-2 -ml-2 text-slate-500 hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="flex-1 mx-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((step - 2) / questions.length) * 100}%`,
                    }}
                    className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  />
                </div>
                <span className="text-indigo-400 font-black text-[10px] tracking-widest">
                  {step - 2}/{questions.length}
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight mb-8 leading-tight italic text-white">
                {questions[surveyIndex].q}
              </h2>

              <div className="space-y-4">
                {/* 1. Multi-Choice Layer */}
                {questions[surveyIndex].opt && (
                  <div className="grid grid-cols-1 gap-3">
                    {questions[surveyIndex].opt?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            surveyAnswers: {
                              ...formData.surveyAnswers,
                              [questions[surveyIndex].id]: opt,
                            },
                          })
                        }
                        className={`text-left p-6 rounded-[2rem] border-2 transition-all font-bold flex justify-between items-center ${
                          formData.surveyAnswers[questions[surveyIndex].id] ===
                          opt
                            ? "border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                            : "border-white/5 bg-white/5 text-slate-500"
                        }`}
                      >
                        {opt}
                        {formData.surveyAnswers[questions[surveyIndex].id] ===
                          opt && (
                          <Zap
                            size={16}
                            className="fill-indigo-500 text-indigo-500"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* 2. Qualitative Layer */}
                {(questions[surveyIndex].canExplain ||
                  questions[surveyIndex].type === "text") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-4 mb-3 block">
                      {questions[surveyIndex].type === "text"
                        ? "Share your story"
                        : "Additional details or List items"}
                    </label>
                    <textarea
                      autoFocus={questions[surveyIndex].type === "text"}
                      placeholder={
                        questions[surveyIndex].placeholder || "Tell us more..."
                      }
                      value={
                        formData.surveyAnswers[
                          `${questions[surveyIndex].id}_extra`
                        ] || ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          surveyAnswers: {
                            ...formData.surveyAnswers,
                            [`${questions[surveyIndex].id}_extra`]:
                              e.target.value,
                          },
                        })
                      }
                      className="w-full bg-white/5 border-2 border-white/10 rounded-[2.5rem] p-7 text-lg font-bold outline-none focus:border-indigo-500 transition-all min-h-[150px] resize-none placeholder:text-slate-800"
                    />
                  </motion.div>
                )}

                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full bg-indigo-600 py-6 rounded-2xl font-black shadow-xl shadow-indigo-600/20 mt-8 flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : step === 3 + questions.length - 1 ? (
                    "FINALIZE REGISTRY"
                  ) : (
                    "CONFIRM & CONTINUE"
                  )}
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 99: SUCCESS (With Logout) */}
          {step === 99 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-indigo-600/20 p-8 rounded-full inline-block mb-6 border border-indigo-500/30">
                <Sparkles size={54} className="text-indigo-400" />
              </div>
              <h2 className="text-5xl font-black tracking-tighter italic mb-2 leading-none text-white">
                Spot Secured.
              </h2>
              <p className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase mb-10">
                Joined {liveCount} Founding Professionals
              </p>

              <div className="text-left space-y-4 mb-10">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">
                  Member Privileges
                </h3>
                <SneakPeakCard
                  icon={<Flame className="text-orange-500" />}
                  title="Service Heatmaps"
                  desc="Know where high-demand requests are happening in Durban before you leave home."
                />
                <SneakPeakCard
                  icon={<Zap className="text-yellow-500" />}
                  title="Instant Payouts"
                  desc="No more chasing cash. Funds clear to your Foona Wallet the second you finish a job."
                />
                <SneakPeakCard
                  icon={<Users className="text-indigo-500" />}
                  title="Foona Squads"
                  desc="Access large commercial contracts in Umhlanga as a collective squad leader."
                />
                <SneakPeakCard
                  icon={<Hammer className="text-slate-400" />}
                  title="Equipment Hub"
                  desc="The industrial tools you requested are being stocked in our Durban Hub for R200/day."
                />
              </div>

              <button
                onClick={async () => {
                  try {
                    await signOut(auth);
                    router.push("/");
                  } catch (error) {
                    console.error("Sign out failed", error);
                    router.push("/");
                  }
                }}
                className="w-full bg-white text-black py-6 rounded-2xl font-black transition-all active:scale-95 shadow-2xl shadow-white/5 uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                Finish & Sign Out <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function SneakPeakCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-5 rounded-[2.5rem] flex items-start gap-4 backdrop-blur-md hover:bg-white/[0.05] transition-colors group">
      <div className="mt-1 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-black text-sm text-white">{title}</h4>
        <p className="text-slate-500 text-[11px] leading-relaxed mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
}

function StatusCard({ icon, title, desc, onSelect }: any) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-indigo-600/10 hover:border-indigo-600 transition-all text-left group relative overflow-hidden"
    >
      <div className="text-indigo-500 group-hover:scale-110 transition-transform z-10">
        {icon}
      </div>
      <div className="z-10">
        <h3 className="text-2xl font-black text-white">{title}</h3>
        <p className="text-slate-500 text-sm font-medium">{desc}</p>
      </div>
      <ChevronRight className="ml-auto text-slate-800 group-hover:text-indigo-500 transition-colors z-10" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -mr-16 -mt-16 blur-3xl" />
    </button>
  );
}

function DarkInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: any) {
  return (
    <div className="mb-2 text-left">
      <div className="flex items-center gap-2 mb-3 ml-1">
        {icon}
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          {label}
        </label>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border-b-2 border-white/10 py-5 px-1 text-xl font-bold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-800 text-white"
      />
    </div>
  );
}

function DarkAuthInput({ icon, onChange, ...props }: any) {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 py-5 group text-left">
      <span className="text-slate-600 group-focus-within:text-indigo-500 transition-colors">
        {icon}
      </span>
      <input
        {...props}
        onChange={(e: any) => onChange(e.target.value)}
        className="bg-transparent w-full outline-none font-bold text-slate-300 placeholder:text-slate-800 text-white"
      />
    </div>
  );
}
