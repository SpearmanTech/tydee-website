"use client";
import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, ArrowRight, Hammer } from "lucide-react";
import { useRouter } from "next/navigation";

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  id?: string;
}

const benefits: Benefit[] = [
  {
    title: "Demand Maps",
    description: "Real-time heatmaps showing where Durban needs your skills most.",
    icon: <TrendingUp size={32} />,
    color: "from-green-400 to-emerald-500",
    id: "demand-maps" 
  },
  {
    title: "Instant Payouts",
    description: "No more invoicing. Get your earnings sent directly to your account.",
    icon: <Zap size={32} />,
    color: "from-yellow-400 to-orange-500",
    id: "earnings" 
  },
  {
    title: "Verified Safety",
    description: "Work with peace of mind. Every customer is identity-verified.",
    icon: <ShieldCheck size={32} />,
    color: "from-blue-400 to-indigo-500",
    id: "safety"
  },
  {
    title: "Equipment Rentals",
    description: "Access high-grade tools without the upfront cost. Rent and earn.",
    icon: <Hammer size={32} />,
    color: "from-purple-400 to-pink-500",
    id: "equipment-rentals"
  }
];

export default function ProPath() {
  const router = useRouter(); 

  const handleNavigation = (id?: string) => {
    if (!id) return;
    if (id === "equipment-rentals") {
      router.push("/equipment-hub");
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="pro" className="py-20 md:py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-[10px] md:text-sm mb-4 block">
            For the Professionals
          </span>
          <h2 className="text-4xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            THE PRO <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-400">ECOSYSTEM.</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container: Snap-scroll for mobile, Drag for desktop */}
      <div className="relative">
        <div 
          className="flex gap-4 md:gap-8 px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:px-[calc((100vw-1280px)/2)]"
          style={{ scrollbarWidth: 'none' }}
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(benefit.id)}
              className="min-w-[85vw] md:min-w-[450px] snap-center group relative p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl hover:border-indigo-500/50 transition-all duration-500 cursor-pointer mb-4"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${benefit.color} p-[1px] mb-8 md:mb-10`}>
                <div className="w-full h-full bg-[#050505] rounded-[calc(0.75rem-1px)] md:rounded-[calc(1rem-1px)] flex items-center justify-center text-white">
                  {/* Scaled icons for mobile */}
                  <div className="scale-75 md:scale-100">
                    {benefit.icon}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 text-white uppercase tracking-tighter">
                {benefit.title}
              </h3>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 font-light">
                {benefit.description}
              </p>

              <div className="flex items-center text-[10px] md:text-xs font-black tracking-widest text-indigo-400 group-hover:text-white transition-all uppercase">
                {benefit.id === "equipment-rentals" ? "View Coming Soon" : "Explore Feature"} 
                <ArrowRight size={16} className="ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
          {/* Spacer for mobile to allow last card to center */}
          <div className="min-w-[10vw] md:hidden" />
        </div>
      </div>
    </section>
  );
}