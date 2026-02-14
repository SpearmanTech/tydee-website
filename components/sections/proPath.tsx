"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, ShieldCheck, Zap, ArrowRight, HardHat, Hammer } from "lucide-react";

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
  const scrollRef = useRef(null);

  const scrollToSection = (id?: string) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="pro" className="py-32 bg-[#0a0f1e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-4 block">
            For the Professionals
          </span>
          <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tight">
            THE PRO <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-400">ECOSYSTEM.</span>
          </h2>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -800 }} // Adjust left constraint based on card count
          className="flex gap-8 px-6 lg:px-[calc((100vw-1280px)/2)]"
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              onClick={() => scrollToSection(benefit.id)}
              className="min-w-[350px] md:min-w-[450px] group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:border-indigo-500/50 transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} p-[1px] mb-10`}>
                <div className="w-full h-full bg-[#0a0f1e] rounded-[calc(1rem-1px)] flex items-center justify-center text-white">
                  {benefit.icon}
                </div>
              </div>

              <h3 className="text-3xl font-black mb-4 text-white">{benefit.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-12 font-light">
                {benefit.description}
              </p>

              <div className="flex items-center text-xs font-black tracking-widest text-indigo-400 group-hover:text-white transition-all uppercase">
                Explore Feature <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}