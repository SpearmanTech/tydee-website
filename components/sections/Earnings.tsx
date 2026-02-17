"use client";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, CheckCircle2, Landmark } from "lucide-react";

export default function EarningsFeature() {
  return (
    <section id="earnings" className="py-20 md:py-32 bg-white px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* Left: Text Narrative - Centered on mobile */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#4f46e5] font-black tracking-widest uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">
              Financial Freedom
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-[#0a0f1e] mb-6 md:mb-8 leading-none tracking-tighter">
              Get paid. <br/>
              <span className="text-[#4f46e5] italic text-[1.05em] md:text-[1.1em]">Fast.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 mb-8 md:mb-12 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
              No more chasing clients for cash or sending manual invoices. Your earnings are tracked in real-time and paid out weekly—directly to your bank account.
            </p>

            <div className="space-y-3 md:space-y-4 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 text-left">
                <CheckCircle2 className="text-green-500 shrink-0 w-5 h-5 md:w-6 md:h-6" />
                <span className="font-bold text-sm md:text-base text-slate-700">Automated Weekly Payouts</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 text-left">
                <CheckCircle2 className="text-green-500 shrink-0 w-5 h-5 md:w-6 md:h-6" />
                <span className="font-bold text-sm md:text-base text-slate-700">Zero Invoicing Hassle</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: The Earnings Dashboard Visual */}
        <div className="relative w-full max-w-[500px] mx-auto lg:max-w-none">
          <div className="bg-[#0a0f1e] p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-slate-800 relative z-10">
            
            {/* Header: Wallet Balance */}
            <div className="flex justify-between items-start mb-8 md:mb-12">
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Available Balance</p>
                <h3 className="text-3xl md:text-5xl font-black text-white">R 4,850.00</h3>
              </div>
              <div className="bg-indigo-500/20 p-3 md:p-4 rounded-2xl md:rounded-3xl">
                <Wallet className="text-indigo-400 w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>

            {/* Weekly Goal Progress */}
            <div className="mb-8 md:mb-12">
              <div className="flex justify-between mb-3 md:mb-4">
                <span className="text-white text-sm md:text-base font-bold">Weekly Goal</span>
                <span className="text-indigo-400 text-sm md:text-base font-black">80%</span>
              </div>
              <div className="h-3 md:h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "80%" }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-400"
                />
              </div>
            </div>

            {/* Recent Payouts Feed */}
            <div className="space-y-3 md:space-y-4">
              <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 md:mb-4">Recent Activity</p>
              {[
                { label: "Plumbing Fix - Umhlanga", amount: "+R 850", date: "Today" },
                { label: "Electrical - Berea", amount: "+R 1,200", date: "Yesterday" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="p-1.5 md:p-2 bg-green-500/10 rounded-lg text-green-500">
                      <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <div>
                      <p className="text-white text-xs md:text-sm font-bold">{item.label}</p>
                      <p className="text-slate-500 text-[9px] md:text-[10px]">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-white text-sm md:text-base font-black">{item.amount}</span>
                </div>
              ))}
            </div>

            {/* Payout CTA */}
            <button className="w-full mt-8 md:mt-10 bg-white text-[#0a0f1e] py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-2 md:gap-3 hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98]">
              <Landmark className="w-4.5 h-4.5 md:w-5 md:h-5" />
              Withdraw Funds
            </button>
          </div>

          {/* Background Glow */}
          <div className="absolute -top-5 -right-5 md:-top-10 md:-right-10 w-48 h-48 md:w-64 md:h-64 bg-indigo-500/20 blur-[60px] md:blur-[100px]" />
        </div>

      </div>
    </section>
  );
}