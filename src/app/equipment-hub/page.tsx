"use client";
  import { motion } from "framer-motion";
import { 
  Hammer, Truck, ShieldCheck, LineChart, 
  MapPin, Zap, Layers, Video, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";

export default function EquipmentHubPage() {
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-indigo-500 overflow-x-hidden">
      <Navbar />

            {/* Navigation & Status */}
      <div className="pt-24 md:pt-32 px-4 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-[10px] md:text-xs uppercase tracking-widest">
          <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" /> Back to Ecosystem
        </Link>
        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] animate-pulse">
          Coming Q1 2027
        </span>
      </div>

      {/* 1. HERO */}
      <section className="pt-10 md:pt-12 pb-16 md:pb-20 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8 inline-block">
              Distributed Warehouse Infrastructure
            </span>
            <h1 className="text-[clamp(3rem,15vw,8rem)] font-black tracking-tighter leading-[0.85] md:leading-[0.8] mb-6 md:mb-8">
              ACCESS IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-slate-500 uppercase">Ownership.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl font-light leading-relaxed">
              Transforming every garage into a distributed warehouse. Tydee Asset empowers Durbanites to monetize idle gear and gives Pros the tools to scale.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[100px] md:blur-[150px] -z-10" />
      </section>

      {/* 2. THE THREE-WAY ECONOMY */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white text-slate-900 rounded-[2.5rem] md:rounded-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <EcosystemCard 
              icon={<Layers className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />}
              title="The Owner"
              desc="Monetize idle assets. Set your hourly rates and let your gear work while you don't."
              tag="Earn R2k+ Monthly"
            />
            <EcosystemCard 
              icon={<Hammer className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />}
              title="The Pro"
              desc="Access pro-grade tools for specific jobs. No upfront capital, just pure profit."
              tag="Scale Without Debt"
            />
            <EcosystemCard 
              icon={<Truck className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />}
              title="The Hauler"
              desc="Have a bakkie? Earn by transporting equipment between owners and pros."
              tag="Logistics Partner"
            />
          </div>
        </div>
      </section>

      {/* 3. MARKET INTELLIGENCE */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center text-center lg:text-left">
          <div className="order-1">
            <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight leading-tight">
              Predictive <br /> <span className="text-indigo-500 italic">Market Intelligence.</span>
            </h2>
            <div className="space-y-6 md:space-y-8 text-left max-w-md mx-auto lg:mx-0">
              <FeatureItem 
                icon={<LineChart className="w-5 h-5" />} 
                title="Shortage Alerts" 
                desc="Our AI detects high demand. 'Umhlanga needs pressure washers.' List yours for a 20% premium." 
              />
              <FeatureItem 
                icon={<MapPin className="w-5 h-5" />} 
                title="Hyper-Local Sourcing" 
                desc="Why drive to a rental shop? Rent from the neighbor 2 streets away." 
              />
            </div>
          </div>
          <div className="order-2 relative p-6 md:p-8 bg-slate-900 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl w-full max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Demand Surge: Durban</span>
            </div>
            <div className="space-y-3 md:space-y-4">
              <DemandRow label="Drain Snake Request" premium="+R120" />
              <DemandRow label="Industrial Drill" premium="+R85" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TYDEE SHIELD */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-indigo-600 rounded-[2.5rem] md:rounded-[4rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black mb-12 md:mb-16 tracking-tighter">The Tydee Shield.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            <ShieldItem icon={<Video className="w-8 h-8 md:w-10 md:h-10" />} title="AI Chain of Custody" desc="Mandatory video handoffs with AI damage detection." />
            <ShieldItem icon={<ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />} title="Micro-Insurance" desc="5% Protection Fee baked into every job." />
            <ShieldItem icon={<Zap className="w-8 h-8 md:w-10 md:h-10" />} title="Biometric Staking" desc="High-value gear requires biometric verification." />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// SHARED SUB-COMPONENTS
function EcosystemCard({ icon, title, desc, tag }: any) {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="p-8 md:p-10 bg-slate-50 rounded-[2rem] md:rounded-[3rem] border border-slate-100 flex flex-col h-full"
    >
      <div className="mb-6 md:mb-8 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl w-fit shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4">{title}</h3>
      <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-grow">{desc}</p>
      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 md:px-4 py-2 rounded-full w-fit">
        {tag}
      </span>
    </motion.div>
  );
}

function ShieldItem({ icon, title, desc }: any) {
  return (
    <div className="flex flex-col items-center text-white">
      <div className="bg-white/10 p-5 md:p-6 rounded-full mb-4 md:mb-6">
        {icon}
      </div>
      <h4 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">{title}</h4>
      <p className="text-indigo-100 font-light text-xs md:text-sm">{desc}</p>
    </div>
  );
}

function DemandRow({ label, premium }: { label: string, premium: string }) {
  return (
    <div className="h-12 w-full bg-white/5 rounded-xl flex items-center px-4 justify-between border border-white/5">
      <span className="text-xs md:text-sm font-bold text-slate-200">{label}</span>
      <span className="text-indigo-400 font-black text-xs md:text-sm">{premium} Premium</span>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 md:gap-6 items-start">
      <div className="bg-indigo-500/10 p-2 md:p-3 rounded-lg md:rounded-xl text-indigo-400 shrink-0">
        {icon}
      </div>
      <div>
        <h5 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{title}</h5>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}