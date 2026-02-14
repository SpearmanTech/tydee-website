"use client";
import { motion } from "framer-motion";
import { Wallet, ArrowUpRight, CheckCircle2, Landmark } from "lucide-react";

export default function EarningsFeature() {
  return (
    <section id="earnings" className="py-32 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left: Text Narrative */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#4f46e5] font-black tracking-widest uppercase text-xs mb-6 block">
              Financial Freedom
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#0a0f1e] mb-8 leading-[0.9] tracking-tighter">
              Get paid. <br/>
              <span className="text-[#4f46e5] italic text-[1.1em]">Fast.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-12 max-w-lg font-light leading-relaxed">
              No more chasing clients for cash or sending manual invoices. Your earnings are tracked in real-time and paid out weekly—directly to your bank account.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="text-green-500" size={24} />
                <span className="font-bold text-slate-700">Automated Weekly Payouts</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="text-green-500" size={24} />
                <span className="font-bold text-slate-700">Zero Invoicing Hassle</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: The Earnings Dashboard Visual */}
        <div className="relative">
          <div className="bg-[#0a0f1e] p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-800 relative z-10">
            {/* Header: Wallet Balance */}
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">Available Balance</p>
                <h3 className="text-5xl font-black text-white">R 4,850.00</h3>
              </div>
              <div className="bg-indigo-500/20 p-4 rounded-3xl">
                <Wallet className="text-indigo-400" size={32} />
              </div>
            </div>

            {/* Weekly Goal Progress */}
            <div className="mb-12">
              <div className="flex justify-between mb-4">
                <span className="text-white font-bold">Weekly Goal</span>
                <span className="text-indigo-400 font-black">80%</span>
              </div>
              <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "80%" }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-blue-400"
                />
              </div>
            </div>

            {/* Recent Payouts Feed */}
            <div className="space-y-4">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Recent Activity</p>
              {[
                { label: "Plumbing Fix - Umhlanga", amount: "+R 850", date: "Today" },
                { label: "Electrical - Berea", amount: "+R 1,200", date: "Yesterday" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                      <ArrowUpRight size={16} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{item.label}</p>
                      <p className="text-slate-500 text-[10px]">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-white font-black">{item.amount}</span>
                </div>
              ))}
            </div>

            {/* Payout CTA */}
            <button className="w-full mt-10 bg-white text-[#0a0f1e] py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-indigo-500 hover:text-white transition-all">
              <Landmark size={20} />
              Withdraw Funds
            </button>
          </div>

          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/20 blur-[100px]" />
        </div>

      </div>
    </section>
  );
}