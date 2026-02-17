"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "../animations/Reveal";
import Link from "next/link";
import { CheckCircle2, Users, Star, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[#050505] flex flex-col justify-center items-center px-4 md:px-6 pt-20">
      
      {/* Visual Container: Height is smaller on mobile to keep buttons above the fold */}
      <div className="relative w-full max-w-7xl h-[80vh] md:h-[75vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group border border-white/10">
        
        <Image 
          src="/tydee-pros.png" 
          alt="Tydee Professionals"
          fill
          className="object-cover object-[center_20%] md:object-center opacity-90 transition-transform duration-1000" 
          priority
        />
        
        {/* Heavier gradient on mobile for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-20 p-4 md:p-6"
        >
          {/* Tagline: Responsive Text sizing */}
          <div className="mb-8 md:mb-10 w-full">
            <Reveal width="100%">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter text-center leading-[0.9]">
                THE HUSTLE, <br />
                <span className="text-indigo-500">DIGITIZED.</span>
              </h2>
            </Reveal>
          </div>

          {/* Action Buttons: Stacked on mobile (w-full), side-by-side on desktop */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto mb-10 md:mb-12">
            <button className="w-full md:w-auto bg-[#4f46e5] text-white px-8 md:px-12 py-5 md:py-6 rounded-full font-black text-lg md:text-xl active:scale-95 transition-all">
              Get Tydee
            </button>
            
            <Link href="/pro" className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-white text-black px-8 md:px-12 py-5 md:py-6 rounded-full font-black text-lg md:text-xl active:scale-95 transition-all flex items-center justify-center gap-2">
                Join as Pro <ArrowRight size={20} />
              </button>
            </Link>
          </div>

          {/* Trust Signals: Horizontal scrollable on mobile, flex-wrap on desktop */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-2">
            <div className="flex md:flex-wrap justify-start md:justify-center gap-6 md:gap-12 bg-black/60 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] border border-white/10 min-w-max md:min-w-0">
              <Signal icon={<CheckCircle2 size={18}/>} text="SAB Backed" />
              <Signal icon={<Users size={18}/>} text="100+ Pros" />
              <Signal icon={<Star size={18}/>} text="Africa's #1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Signal({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 text-slate-200 text-[12px] md:text-sm whitespace-nowrap">
      <span className="text-indigo-500">{icon}</span>
      <span className="font-bold tracking-tight">{text}</span>
    </div>
  );
}