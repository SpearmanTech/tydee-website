"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ShieldCheck, Gavel } from "lucide-react";

export default function UserPath() {
  return (
    <section id="user-path" className="py-20 md:py-32 px-4 md:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* iPhone Mockup: Adjusted for Mobile Viewports */}
        <div className="order-2 lg:order-1 relative flex justify-center w-full">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative w-full max-w-[260px] md:max-w-[320px]"
          >
            {/* The Phone Frame */}
            <div className="relative z-10 bg-slate-900 rounded-[2.5rem] md:rounded-[3.2rem] p-2 md:p-3 shadow-2xl border-[4px] md:border-[6px] border-slate-800">
              <div className="relative aspect-[9/19.5] w-full bg-slate-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">
                <Image 
                  src="/tydee-pro-screen.png" 
                  alt="Tydee Partner Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-6 bg-slate-900 rounded-full z-20" />
            </div>

            {/* Floating Badge: Scaled for mobile */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-6 md:-top-6 md:-right-12 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 md:gap-3 z-30"
            >
              <div className="bg-green-100 p-1.5 md:p-2 rounded-full">
                <ShieldCheck className="text-green-600" size={16} md={20}/>
              </div>
              <p className="text-[10px] md:text-xs font-bold whitespace-nowrap text-slate-800">Verified Pro On-Site</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Text Content: Centered on Mobile */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <h2 className="text-4xl md:text-7xl font-black mb-6 md:mb-8 leading-none tracking-tighter text-[#0a0f1e]">
            Marketplace <br/>at the <span className="text-[#4f46e5] italic">speed</span> of life.
          </h2>
          <p className="text-lg md:text-xl text-slate-500 mb-8 md:mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
            Tydee digitizes the hustle. Access a constant stream of opportunities in Durban, bid with confidence, and grow your professional reputation.
          </p>
          
          <ul className="space-y-6 md:space-y-8 text-left max-w-md mx-auto lg:mx-0">
            <li className="flex items-start gap-4 md:gap-5">
              <div className="bg-indigo-50 p-3 rounded-xl md:rounded-2xl text-[#4f46e5] shrink-0">
                <Gavel size={22} md={24} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg text-[#0a0f1e]">Smart Bidding</h4>
                <p className="text-slate-400 text-sm">Direct access to marketplace opportunities with clear pricing.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 md:gap-5">
              <div className="bg-indigo-50 p-3 rounded-xl md:rounded-2xl text-[#4f46e5] shrink-0">
                <MapPin size={22} md={24} />
              </div>
              <div>
                <h4 className="font-black text-base md:text-lg text-[#0a0f1e]">Durban-Centric</h4>
                <p className="text-slate-400 text-sm">Exclusive real-time leads within the eThekwini municipality.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}