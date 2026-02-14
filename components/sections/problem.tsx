"use client";
import { Reveal } from "../animations/Reveal";

export default function Problem() {
  return (
    <section className="py-32 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-5xl md:text-7xl font-black mb-16 max-w-4xl">
            The market is <span className="text-red-600">messy.</span> <br/>
            We make it <span className="text-[#4f46e5]">Tydee.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-red-600 font-black text-2xl mb-8 uppercase tracking-widest">The Old Way</h3>
            <ul className="space-y-6 text-slate-400 text-lg">
              <li className="flex gap-4"><span>✕</span> Endless bidding wars for basic jobs</li>
              <li className="flex gap-4"><span>✕</span> Unverified quotes that change last minute</li>
              <li className="flex gap-4"><span>✕</span> No safety protocols for service in your home</li>
            </ul>
          </div>

          <div className="bg-[#4f46e5] p-12 rounded-[2.5rem] shadow-2xl text-white">
            <h3 className="text-indigo-200 font-black text-2xl mb-8 uppercase tracking-widest">The Tydee Way</h3>
            <ul className="space-y-6 text-xl">
              <li className="flex gap-4"><span className="text-green-400">✓</span> Instant, fixed-price booking</li>
              <li className="flex gap-4"><span className="text-green-400">✓</span> Vetted professionals you can trust</li>
              <li className="flex gap-4"><span className="text-green-400">✓</span> Cashless payments & real-time tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}