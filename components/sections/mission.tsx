"use client";
import { Reveal } from "../animations/Reveal";

export default function Mission() {
  return (
    <section id="mission" className="min-h-screen bg-tydee-black flex items-center justify-center px-6 py-32 overflow-hidden">
      <div className="max-w-5xl w-full text-center relative">
        {/* Subtle Background Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-tydee-indigo/20 blur-[120px] rounded-full" />
        
        <Reveal width="100%">
          <span className="text-tydee-magenta font-black tracking-[0.3em] uppercase text-sm mb-12 block">
            The South African Vision
          </span>
        </Reveal>
        
        <Reveal width="100%">
          <h2 className="text-white text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-none tracking-tighter mb-12">
            Scaling dignity through <span className="text-tydee-indigo">technology.</span>
          </h2>
        </Reveal>
        
        <Reveal width="100%">
          <p className="text-slate-400 text-xl md:text-3xl font-light leading-relaxed">
            We are solving youth unemployment by digitizing trust. 
            Tydee is the infrastructure for a new era of professional independence in South Africa.
          </p>
        </Reveal>
      </div>
    </section>
  );
}