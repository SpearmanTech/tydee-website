"use client";
import { motion } from "framer-motion";
import { Zap, Target, ArrowUpRight } from "lucide-react";

export default function DemandMapFeature() {
  const suburbs = ["Umhlanga", "Morningside", "Westville", "Glenwood", "Berea"];

  return (
    <section id="demand-maps" className="relative py-20 md:py-32 bg-[#050505] px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Visual Engine: Scaled for Mobile */}
        <div className="relative order-2 lg:order-1 group w-full">
          <div className="relative h-[400px] md:h-[600px] w-full bg-slate-900/50 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
            
            {/* The Scanner Sweep Animation */}
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[100px] md:h-[150px] bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent z-10 pointer-events-none"
            />

            {/* Pulsing Hotspots - Adjusted for mobile scale */}
            <Hotspot top="15%" left="55%" label="Umhlanga" intensity="high" delay={0.2} />
            <Hotspot top="40%" left="30%" label="Morningside" intensity="medium" delay={0.5} />
            <Hotspot top="65%" left="50%" label="Berea" intensity="high" delay={0.8} />
            
            {/* Live Data Card: Made smaller on mobile */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/5 backdrop-blur-2xl p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 z-20 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-black text-indigo-400 tracking-widest uppercase">Live Signal</span>
              </div>
              <h4 className="text-2xl md:text-4xl font-black text-white">42 Jobs</h4>
              <p className="text-slate-400 text-[10px] md:text-xs mt-1 font-light italic">Active in Durban North</p>
            </motion.div>

            {/* Bottom Suburb Ticker: Hidden on small mobile to reduce clutter, visible on md+ */}
            <div className="absolute bottom-6 left-0 right-0 px-6 md:px-10 z-20 hidden sm:block">
                <div className="flex justify-between items-center bg-black/40 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                    {suburbs.slice(0, 3).map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <ArrowUpRight size={12} className="text-green-400" />
                            <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-tighter">{s}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Text Content: Centered on mobile */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 leading-none tracking-tighter">
              Know where the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white italic">hustle is.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mb-10 md:mb-12 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              Tydee's proprietary Service Heatmap analyzes real-time requests. Position yourself strategically to maximize your bidding success rate.
            </p>

            {/* Feature Cards: Stacked on mobile, Grid on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="p-6 md:p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-colors text-left">
                <Target className="text-indigo-400 mb-4" size={28} />
                <h5 className="text-white font-bold text-lg md:text-xl mb-2">Precision</h5>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Identify booking density in Umhlanga and Westville instantly.</p>
              </div>
              <div className="p-6 md:p-8 bg-white/5 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-colors text-left">
                <Zap className="text-indigo-400 mb-4" size={28} />
                <h5 className="text-white font-bold text-lg md:text-xl mb-2">Real-Time</h5>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Signal updates every 60 seconds to keep you ahead.</p>
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
      <div className={`h-3 w-3 md:h-4 md:w-4 rounded-full ${intensity === 'high' ? 'bg-indigo-500 shadow-[0_0_20px_#6366f1]' : 'bg-blue-400 shadow-[0_0_15px_#60a5fa]'}`} />
      <div className="absolute -inset-3 bg-indigo-500/20 rounded-full animate-ping" />
      <span className="mt-3 bg-black/60 backdrop-blur-md text-[8px] md:text-[10px] font-black text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg uppercase tracking-widest border border-white/10 shadow-xl">
        {label}
      </span>
    </motion.div>
  );
}