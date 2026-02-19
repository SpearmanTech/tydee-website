"use client";
import { Reveal } from "../animations/Reveal";

export default function Mission() {
  return (
    <section 
      id="mission" 
      className="min-h-[80vh] md:min-h-screen bg-[#050505] flex items-center justify-center px-4 md:px-6 py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-5xl w-full text-center relative">
        
        {/* Responsive Background Glow */}
        <div className="absolute -top-10 md:-top-20 left-1/2 -translate-x-1/2 w-64 md:w-96 h-64 md:h-96 bg-indigo-600/10 blur-[80px] md:blur-[120px] rounded-full -z-10" />
        
        <Reveal width="100%">
          <span className="text-fuchsia-500 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-sm mb-8 md:mb-12 block">
            The South African Vision
          </span>
        </Reveal>
        
        <Reveal width="100%">
          {/* Adjusted clamp for better mobile wrapping */}
          <h2 className="text-white text-[clamp(2.2rem,10vw,5.5rem)] font-black leading-[0.9] tracking-tighter mb-8 md:mb-12">
            Scaling dignity through <br className="hidden md:block" /> 
            <span className="text-indigo-500">technology.</span>
          </h2>
        </Reveal>
        
        <Reveal width="100%">
          {/* Responsive paragraph sizing */}
          <p className="text-slate-400 text-lg md:text-3xl font-light leading-relaxed max-w-3xl mx-auto px-2">
            We are solving youth unemployment by digitizing trust. 
            <span className="block mt-4 md:mt-2">
              Tydee is the infrastructure for a new era of professional independence in South Africa.
            </span>
          </p>
        </Reveal>

        {/* Mobile-only CTA or Indicator */}
        <div className="mt-12 md:hidden flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}