"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "../animations/Reveal";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex flex-col justify-center items-center text-center px-6">
      
           {/* 2. The Visual & Buttons Layer */}
      <div className="relative w-full max-w-7xl h-[50vh] md:h-[60vh] rounded-[3rem] overflow-hidden group shadow-2xl">
        {/* Full Bleed Image */}
        <Image 
          src="/tydee-pros.png" 
          alt="Tydee Professionals"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105" 
          priority
        />
        
        {/* Dark Overlay for Button Contrast */}
        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/20" />

        {/* Hovering Action Buttons over the image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-6 p-6"
        >
          <button className="w-full md:w-auto bg-[#4f46e5] text-white px-12 py-6 rounded-full font-black text-xl hover:bg-white hover:text-[#4f46e5] transition-all shadow-2xl active:scale-95">
            Get Tydee
          </button>
          <button className="w-full md:w-auto bg-white text-[#0a0f1e] px-12 py-6 rounded-full font-black text-xl hover:bg-[#4f46e5] hover:text-white transition-all shadow-2xl active:scale-95">
            Join as Pro
          </button>
        </motion.div>
      </div>

      {/* Decorative Durban Tag */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
         <p className="text-8xl font-black text-slate-100 uppercase select-none">Durban</p>
      </div>
    </section>
  );
}