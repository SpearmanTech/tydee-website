"use client";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Star, PhoneCall } from "lucide-react";

export default function SafetyFeature() {
  return (
    <section id="customer-safety" className="py-20 md:py-32 bg-slate-50 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Visual: The "Peace of Mind" Visual - Reordered for Mobile */}
        <div className="relative order-2 lg:order-1 w-full max-w-[500px] mx-auto lg:max-w-none">
          <div className="relative z-10 bg-white p-2 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
             <div className="bg-slate-50 rounded-[2.2rem] md:rounded-[3.2rem] p-5 md:p-8">
                
                {/* Live Tracking Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4 md:gap-6 mb-4 md:mb-6"
                >
                  <div className="h-12 w-12 md:h-16 md:w-16 bg-indigo-100 rounded-xl md:rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                    <MapPin size={24} md={32} />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Live Tracking</p>
                    <h4 className="text-sm md:text-lg font-black text-slate-900 leading-tight">Your Pro is 5 mins away</h4>
                  </div>
                </motion.div>

                {/* Pro Profile Snapshot */}
                <div className="p-4 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-slate-100">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className="flex gap-3 md:gap-4">
                      {/* Placeholder for Thabo's profile pic */}
                      <div className="h-10 w-10 md:h-14 md:w-14 bg-slate-200 rounded-lg md:rounded-xl overflow-hidden" />
                      <div>
                        <h5 className="font-black text-slate-900 text-sm md:text-base leading-none mb-1">Thabo M.</h5>
                        <p className="text-[10px] md:text-xs text-slate-500">Verified Plumber</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full text-yellow-600 text-[10px] md:text-xs font-bold">
                      <Star size={10} md={12} fill="currentColor" /> 4.9
                    </div>
                  </div>
                  
                  {/* Safety Badges */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 md:gap-3">
                    <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      <ShieldCheck size={14} className="text-green-500" /> Vetted Background
                    </div>
                    <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      <PhoneCall size={14} className="text-blue-500" /> SOS Support
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Decorative Elements - Scaled for Mobile */}
          <div className="absolute -top-5 -left-5 md:-top-10 md:-left-10 w-48 h-48 md:w-64 md:h-64 bg-indigo-500/10 blur-[60px] md:blur-[100px]" />
        </div>

        {/* Right: The Trust Narrative - Centered on Mobile */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-600 font-black tracking-widest uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">
              Customer Protection
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-6 md:mb-8 leading-[0.9] tracking-tighter">
              A higher standard <br className="hidden md:block" />
              <span className="text-indigo-600 italic">of trust.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 mb-8 md:mb-12 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              Every Tydee Pro undergoes a multi-step vetting process, including criminal record checks and skill validation. Monitor your service in real-time.
            </p>

            <div className="space-y-4 md:space-y-6 max-w-md mx-auto lg:mx-0 text-left">
              <div className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="bg-indigo-50 p-2 md:p-3 rounded-xl md:rounded-2xl text-indigo-600 shrink-0">
                  <ShieldCheck size={20} md={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-base md:text-lg">Identity Verified</h5>
                  <p className="text-slate-500 text-xs md:text-sm">We verify national ID and residential data for all Pros.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}