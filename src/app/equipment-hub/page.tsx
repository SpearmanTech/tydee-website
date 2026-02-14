"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { 
  Hammer, Truck, ShieldCheck, LineChart, 
  MapPin, Zap, Layers, Video, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/../components/shared/Navbar";
import Footer from "@/../components/shared/Footer";

export default function EquipmentHubPage() {
  const containerRef = useRef(null);
  
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-indigo-500">
      <Navbar />

      {/* Navigation & Status */}
      <div className="pt-32 px-6 max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-xs uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Ecosystem
        </Link>
        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Coming Q1 2027
        </span>
      </div>

      {/* 1. HERO: THE VISION */}
      <section className="pt-12 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block">
              Distributed Warehouse Infrastructure
            </span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8">
              ACCESS IS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-slate-500">OWNERSHIP.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl font-light leading-relaxed">
              Transforming every garage into a distributed warehouse. tydee Asset empowers Durbanites to monetize idle gear and gives Pros the tools to scale—without the debt.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] -z-10" />
      </section>

      {/* 2. THE THREE-WAY ECONOMY */}
      <section className="py-24 px-6 bg-white text-slate-900 rounded-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <EcosystemCard 
              icon={<Layers className="text-indigo-600" />}
              title="The Owner"
              desc="Monetize idle assets. Set your hourly rates and let your gear work while you don't."
              tag="Earn R2k+ Monthly"
            />
            <EcosystemCard 
              icon={<Hammer className="text-indigo-600" />}
              title="The Pro"
              desc="Access pro-grade tools for specific jobs. No upfront capital, just pure profit."
              tag="Scale Without Debt"
            />
            <EcosystemCard 
              icon={<Truck className="text-indigo-600" />}
              title="The Hauler"
              desc="Have a bakkie? Earn by transporting equipment between owners and pros."
              tag="Logistics Partner"
            />
          </div>
        </div>
      </section>

      {/* 3. MARKET INTELLIGENCE */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 tracking-tight">
              Predictive <br /> <span className="text-indigo-500 italic">Market Intelligence.</span>
            </h2>
            <div className="space-y-8">
              <FeatureItem 
                icon={<LineChart size={20}/>} 
                title="Shortage Alerts" 
                desc="Our AI detects high demand. 'Umhlanga needs pressure washers.' List yours for a 20% premium instantly." 
              />
              <FeatureItem 
                icon={<MapPin size={20}/>} 
                title="Hyper-Local Sourcing" 
                desc="Why drive to a rental shop? Rent from the neighbor 2 streets away." 
              />
            </div>
          </div>
          <div className="relative p-8 bg-slate-900 rounded-[3rem] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Demand Surge: Umhlanga</span>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-full bg-white/5 rounded-xl flex items-center px-4 justify-between border border-white/5">
                <span className="text-sm font-bold">Drain Snake Request</span>
                <span className="text-indigo-400 font-black">+R120 Premium</span>
              </div>
              <div className="h-12 w-full bg-white/5 rounded-xl flex items-center px-4 justify-between border border-white/5">
                <span className="text-sm font-bold">Industrial Drill</span>
                <span className="text-indigo-400 font-black">+R85 Premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE TYDEE SHIELD */}
      <section className="py-32 px-6 bg-indigo-600 rounded-[4rem]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">The Tydee Shield.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-white">
              <div className="bg-white/10 p-6 rounded-full mb-6"><Video size={40}/></div>
              <h4 className="text-2xl font-bold mb-4">AI Chain of Custody</h4>
              <p className="text-indigo-100 font-light text-sm">Mandatory video handoffs with AI-assisted damage detection.</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <div className="bg-white/10 p-6 rounded-full mb-6"><ShieldCheck size={40}/></div>
              <h4 className="text-2xl font-bold mb-4">Micro-Insurance</h4>
              <p className="text-indigo-100 font-light text-sm">5% Protection Fee baked into every job covers accidental damage.</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <div className="bg-white/10 p-6 rounded-full mb-6"><Zap size={40}/></div>
              <h4 className="text-2xl font-bold mb-4">Biometric Staking</h4>
              <p className="text-indigo-100 font-light text-sm">High-value gear requires biometric verification & Trust Score 4.5+.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function EcosystemCard({ icon, title, desc, tag }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col h-full"
    >
      <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm">{icon}</div>
      <h3 className="text-3xl font-black mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed mb-8 flex-grow">{desc}</p>
      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full w-fit">
        {tag}
      </span>
    </motion.div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-6 items-start">
      <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400">{icon}</div>
      <div>
        <h5 className="text-xl font-bold mb-2">{title}</h5>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}