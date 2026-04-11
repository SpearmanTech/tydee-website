"use client";
import { Reveal } from "../animations/Reveal";
import { X, Check } from "lucide-react"; 

export default function Problem() {
  return (
    <section id="problem" className="py-20 md:py-32 px-4 md:px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <Reveal width="100%">
          <h2 className="text-4xl md:text-7xl font-black mb-10 md:mb-16 max-w-4xl leading-[0.9] tracking-tighter text-[#0a0f1e]">
            Seek.<br/>
            Find.<br/>
            <span className="text-[#4f46e5]">Foona.</span>
          </h2>
        </Reveal>

        {/* Grid: 1 column on mobile, 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          
          {/* THE OLD WAY */}
          <div className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-red-600 font-black text-xl md:text-2xl mb-6 md:mb-8 uppercase tracking-widest">The Old Way</h3>
            <ul className="space-y-4 md:space-y-6 text-slate-500 text-base md:text-lg">
              <li className="flex gap-4 items-start">
                <X className="text-red-400 shrink-0 mt-1" size={20} />
                <span>Calling multiple contractors just to get a single reply</span>
              </li>
              <li className="flex gap-4 items-start">
                <X className="text-red-400 shrink-0 mt-1" size={20} />
                <span>Comparing confusing quotes scattered across WhatsApps</span>
              </li>
              <li className="flex gap-4 items-start">
                <X className="text-red-400 shrink-0 mt-1" size={20} />
                <span>Blindly trusting unvetted strangers in your home</span>
              </li>
              <li className="flex gap-4 items-start">
                <X className="text-red-400 shrink-0 mt-1" size={20} />
                <span>Awkward cash negotiations and surprise call-out fees</span>
              </li>
            </ul>
          </div>

          {/* THE FOONA WAY */}
          <div className="bg-[#4f46e5] p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
            {/* Subtle glow effect for mobile pop */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 blur-[60px] rounded-full" />
            
            <h3 className="text-indigo-200 font-black text-xl md:text-2xl mb-6 md:mb-8 uppercase tracking-widest">The Foona Way</h3>
            <ul className="space-y-4 md:space-y-6 text-lg md:text-xl">
              <li className="flex gap-4 items-start">
                <Check className="text-green-400 shrink-0 mt-1" size={24} />
                <span className="font-bold">Post once and let competitive bids come to you</span>
              </li>
              <li className="flex gap-4 items-start">
                <Check className="text-green-400 shrink-0 mt-1" size={24} />
                <span className="font-bold">Compare prices, profiles, and reviews in one place</span>
              </li>
              <li className="flex gap-4 items-start">
                <Check className="text-green-400 shrink-0 mt-1" size={24} />
                <span className="font-bold">Strictly vetted, ID-verified professionals</span>
              </li>
              <li className="flex gap-4 items-start">
                <Check className="text-green-400 shrink-0 mt-1" size={24} />
                <span className="font-bold">Secure, cashless payments via the platform</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}