"use client";
import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Star, PhoneCall } from "lucide-react";

export default function SafetyFeature() {
  return (
    <section id="customer-safety" className="py-32 bg-slate-50 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: The "Peace of Mind" Visual */}
        <div className="relative">
          <div className="relative z-10 bg-white p-2 rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden">
             <div className="bg-slate-50 rounded-[3.2rem] p-8">
                
                {/* Live Tracking Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center gap-6 mb-6"
                >
                  <div className="h-16 w-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">Live Tracking</p>
                    <h4 className="text-lg font-black text-slate-900">Your Pro is 5 mins away</h4>
                  </div>
                </motion.div>

                {/* Pro Profile Snapshot */}
                <div className="p-6 bg-white rounded-3xl border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="h-14 w-14 bg-slate-200 rounded-xl overflow-hidden" />
                      <div>
                        <h5 className="font-black text-slate-900">Thabo M.</h5>
                        <p className="text-xs text-slate-500">Verified Plumber</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full text-yellow-600 text-xs font-bold">
                      <Star size={12} fill="currentColor" /> 4.9
                    </div>
                  </div>
                  
                  {/* Safety Badges */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      <ShieldCheck size={14} className="text-green-500" /> Vetted Background
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                      <PhoneCall size={14} className="text-blue-500" /> SOS Support
                    </div>
                  </div>
                </div>
             </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-500/10 blur-[100px]" />
        </div>

        {/* Right: The Trust Narrative */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-600 font-black tracking-widest uppercase text-xs mb-6 block">
              Customer Protection
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter">
              A higher standard <br/>
              <span className="text-indigo-600 italic">of trust.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-lg font-light leading-relaxed">
              Every Tydee Pro undergoes a multi-step vetting process, including criminal record checks and skill validation. Monitor your service in real-time and enjoy a cashless experience designed for your safety.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-lg">Identity Verified</h5>
                  <p className="text-slate-500 text-sm">We verify national ID and residential data for all Pros.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}