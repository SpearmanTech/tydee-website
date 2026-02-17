"use client";
import React from 'react';
import { motion } from "framer-motion";
import { CheckCircle2, QrCode, Smartphone, MessageCircle } from "lucide-react";

export default function SuccessPage() {
  const whatsappMessage = encodeURIComponent("Hey! I just joined Tydee as a Founding Member Pro in Durban. Check it out: https://tydee-website.vercel.app/pro");

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center py-12 md:py-20 px-6 overflow-x-hidden">
      {/* 1. Main Grid: Stacks on mobile, side-by-side on desktop */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">
        
        {/* LEFT COLUMN: SUCCESS CONTENT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left order-1"
        >
          <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30 mx-auto md:mx-0">
            <CheckCircle2 className="text-indigo-400" size={32} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
            YOU'RE IN, <br />
            <span className="text-indigo-500">FOUNDING MEMBER.</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-sm mx-auto md:mx-0">
            Your application is being vetted. As a founding member, you'll get 0% platform fees for 3 months and priority access to high-demand Durban zones.
          </p>

          <div className="space-y-6 mb-10 text-left max-w-xs mx-auto md:mx-0">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">How we support you:</h3>
            <SupportItem title="Business Coaching" desc="Free workshops on scaling your service business in SA." />
            <SupportItem title="Equipment Access" desc="Discounted tool rentals through our Asset Hub." />
          </div>

          <div className="flex flex-col gap-4">
            <a 
              href={`https://wa.me/?text=${whatsappMessage}`}
              className="bg-[#25D366] text-black px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-green-500/10"
            >
              <MessageCircle size={20} /> SHARE ON WHATSAPP
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: APP MOCKUP & QR */}
        <div className="relative flex flex-col items-center order-2">
          
          {/* Mock App Animation: Scaled for mobile */}
          <div className="relative w-[260px] md:w-[280px] h-[520px] md:h-[580px] bg-[#111] rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-[#222] overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.15)]">
            <div className="absolute top-0 w-full h-6 bg-[#222] flex justify-center items-end pb-1">
              <div className="w-12 md:w-16 h-1 bg-white/10 rounded-full" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -350, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="p-4 pt-10"
            >
              <div className="bg-indigo-600 h-28 md:h-32 rounded-2xl mb-4 p-4 flex flex-col justify-end">
                <p className="text-[8px] md:text-[10px] font-bold opacity-70 tracking-widest">DAILY EARNINGS</p>
                <p className="text-xl md:text-2xl font-black">R1,450.00</p>
              </div>
              <div className="space-y-3 md:space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white/5 h-16 md:h-20 rounded-xl md:rounded-2xl border border-white/5 p-3 md:p-4 flex items-center gap-3 md:gap-4">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-white/10 rounded-full shrink-0" />
                    <div className="flex-1 space-y-1.5 md:space-y-2">
                      <div className="h-1.5 md:h-2 w-16 md:w-20 bg-white/20 rounded" />
                      <div className="h-1.5 md:h-2 w-24 md:w-32 bg-white/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* QR CODE SECTION: Centered and responsive */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-8 md:-bottom-10 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex items-center gap-4 md:gap-6 border border-slate-200 w-[90%] md:w-auto"
          >
            <div className="bg-slate-100 p-2 rounded-xl shrink-0">
               <QrCode size={48} md={64} className="text-black" />
            </div>
            <div className="text-left text-black">
              <p className="font-black text-[10px] md:text-sm uppercase leading-none">Download App</p>
              <p className="text-[8px] md:text-[10px] text-slate-500 font-bold mt-1">SCAN TO INSTALL EXPO</p>
              <div className="flex gap-2 mt-2">
                <Smartphone size={14} md={16} className="text-indigo-600" />
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter">iOS & Android</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Ambient background glow for mobile depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/10 blur-[100px] md:blur-[150px] -z-10" />
    </main>
  );
}

function SupportItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4 group">
      <div className="mt-1 w-4 h-4 md:w-5 md:h-5 rounded-full border border-indigo-500/50 flex items-center justify-center shrink-0">
        <div className="w-1 h-1 bg-indigo-500 rounded-full" />
      </div>
      <div>
        <p className="font-black text-xs md:text-sm text-white">{title}</p>
        <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}