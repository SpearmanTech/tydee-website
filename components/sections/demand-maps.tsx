"use client";
import { motion } from "framer-motion";
import { Zap, Target, ArrowUpRight } from "lucide-react";

export default function DemandMapFeature() {
  const suburbs = ["Umhlanga", "Morningside", "Westville", "Glenwood", "Berea"];

  return (
    <section id="demand-maps" className="relative py-32 bg-[#0a0f1e] px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Visual Engine: The Animated Map with Scanner */}
        <div className="relative order-2 lg:order-1 group">
          <div className="relative h-[600px] w-full bg-slate-900/50 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
            
            {/* The Scanner Sweep Animation */}
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[150px] bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent z-10 pointer-events-none"
            />

            {/* Pulsing Hotspots representing Durban suburbs */}
            <Hotspot top="20%" left="60%" label="Umhlanga" intensity="high" delay={0.2} />
            <Hotspot top="45%" left="40%" label="Morningside" intensity="medium" delay={0.5} />
            <Hotspot top="70%" left="55%" label="Berea" intensity="high" delay={0.8} />
            
            {/* Live Data Card */}
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute top-10 left-10 bg-white/5 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 z-20 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase">Live Signal</span>
              </div>
              <h4 className="text-4xl font-black text-white">42 Jobs</h4>
              <p className="text-slate-400 text-xs mt-1 font-light italic">Active requests in Durban North</p>
            </motion.div>

            {/* Bottom Suburb Ticker for extra "Tech" feel */}
            <div className="absolute bottom-8 left-0 right-0 px-10 z-20">
                <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
                    {suburbs.slice(0, 3).map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <ArrowUpRight size={14} className="text-green-400" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{s}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
              Know where the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white italic">hustle is.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-lg font-light leading-relaxed">
              Tydee's proprietary Service Heatmap analyzes real-time requests. Position yourself strategically to maximize your bidding success rate.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-colors">
                <Target className="text-indigo-400 mb-4" size={32} />
                <h5 className="text-white font-bold text-xl mb-2">Precision</h5>
                <p className="text-slate-500 text-sm leading-relaxed">Identify booking density in Umhlanga and Westville instantly.</p>
              </div>
              <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-colors">
                <Zap className="text-indigo-400 mb-4" size={32} />
                <h5 className="text-white font-bold text-xl mb-2">Real-Time</h5>
                <p className="text-slate-500 text-sm leading-relaxed">Signal updates every 60 seconds to keep you ahead.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Hotspot({ top, left, label, intensity, delay }: any) {
  return (
    <motion.div 
      className="absolute flex flex-col items-center" 
      style={{ top, left }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className={`h-4 w-4 rounded-full ${intensity === 'high' ? 'bg-indigo-500 shadow-[0_0_25px_#6366f1]' : 'bg-blue-400 shadow-[0_0_20px_#60a5fa]'}`} />
      <div className="absolute -inset-4 bg-indigo-500/20 rounded-full animate-ping" />
      <span className="mt-4 bg-black/60 backdrop-blur-md text-[10px] font-black text-white px-3 py-1.5 rounded-lg uppercase tracking-widest border border-white/10 shadow-xl">
        {label}
      </span>
    </motion.div>
  );
}