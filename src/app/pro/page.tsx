"use client";
import { motion } from "framer-motion";
import { Zap, Map, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/../components/shared/Navbar";
import Footer from "@/../components/shared/Footer";

export default function ProLandingPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-indigo-500 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION: Fluid Typography & Mobile Spacing */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 md:px-4 py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 inline-block">
              For Bluecollar Professionals
            </span>
            
            <h1 className="text-[clamp(2.5rem,12vw,6rem)] md:text-8xl font-black tracking-tighter leading-[0.9] md:leading-none mb-6 md:mb-8">
              THE HUSTLE, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-500">DIGITIZED.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-10 md:mb-12 px-2">
              Stop searching for work. Let the high-demand areas of Durban find you. Join the elite network of Pros scaling without the stress.
            </p>
            
            <Link href="/onboarding" className="inline-block w-full md:w-auto px-4 md:px-0">
              <button className="group relative w-full md:w-auto bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-base md:text-lg hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-2xl shadow-indigo-500/20 active:scale-95">
                START YOUR ONBOARDING
                <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[300px] md:h-[400px] bg-indigo-600/10 blur-[100px] md:blur-[120px] -z-10" />
      </section>

      {/* THE PRO EDGE (Features): Fixed Icon Props */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          <ProFeature 
            icon={<Map className="text-indigo-400 w-7 h-7 md:w-8 md:h-8" />}
            title="Demand Maps"
            desc="See exactly where Durban needs your skills. Target Umhlanga, Berea, or Morningside based on real-time surges."
          />
          <ProFeature 
            icon={<Zap className="text-indigo-400 w-7 h-7 md:w-8 md:h-8" />}
            title="Instant Payouts"
            desc="No more waiting for invoices. Your earnings are available for withdrawal the moment the job is marked complete."
          />
          <ProFeature 
            icon={<ShieldCheck className="text-indigo-400 w-7 h-7 md:w-8 md:h-8" />}
            title="Verified Safety"
            desc="Work with peace of mind. Every customer on tydee is identity-verified before they can book you."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProFeature({ icon, title, desc }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="p-6 md:p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
    >
      <div className="mb-4 md:mb-6">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{title}</h3>
      <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}