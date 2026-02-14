"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ShieldCheck, Gavel } from "lucide-react"; // Switched Zap to Gavel for bidding

export default function UserPath() {
  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        
        {/* iPhone Mockup with your Partner Dashboard */}
        <div className="order-2 lg:order-1 relative flex justify-center">
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative w-full max-w-[320px]"
          >
            <div className="relative z-10 bg-slate-900 rounded-[3.2rem] p-3 shadow-2xl border-[6px] border-slate-800">
              <div className="relative aspect-[9/19.5] w-full bg-slate-100 rounded-[2.5rem] overflow-hidden">
                <Image 
                  src="/tydee-pro-screen.png" 
                  alt="Tydee Partner Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-full z-20" />
            </div>

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <ShieldCheck className="text-green-600" size={20}/>
              </div>
              <p className="text-xs font-bold whitespace-nowrap text-slate-800">Verified Pro On-Site</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="order-1 lg:order-2">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
            Marketplace <br/>at the <span className="text-[#4f46e5] italic text-[1.1em]">speed</span> of life.
          </h2>
          <p className="text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-light">
            Tydee digitizes the hustle. Access a constant stream of opportunities in Durban, Cape Town and Johannesburg 
            bid with confidence, and grow your professional reputation.
          </p>
          
          <ul className="space-y-8">
            <li className="flex items-start gap-5">
              <div className="bg-indigo-50 p-3 rounded-2xl text-[#4f46e5]">
                <Gavel size={24} />
              </div>
              <div>
                <h4 className="font-black text-lg">Smart Bidding</h4>
                <p className="text-slate-400 text-sm">Direct access to marketplace opportunities with clear pricing.</p>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <div className="bg-indigo-50 p-3 rounded-2xl text-[#4f46e5]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-black text-lg">Durban-Centric</h4>
                <p className="text-slate-400 text-sm">Real-time leads.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}