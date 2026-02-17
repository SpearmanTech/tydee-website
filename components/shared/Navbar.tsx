"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hammer, User, ChevronDown, Download, ArrowLeft, Linkedin, Facebook, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);

  const menuLinks = [
    { name: "The Issue", href: "#problem" },
    { name: "Mission", href: "#mission" },
    { name: "Asset Hub", href: "/equipment-hub" },
    { name: "Safety", href: "#safety" },
    { name: "Support", href: "#support" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-[100] px-4 md:px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-white/80 border-b border-slate-200/50"
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-indigo-600">
          tydee<span className="text-fuchsia-500">.</span>
        </Link>
        
        {/* Desktop Links - Hidden on small mobile */}
        <div className="hidden lg:flex gap-8 items-center font-bold text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {menuLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-indigo-600 transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Register Dropdown - Hidden on XS mobile to save space */}
          <div className="relative hidden sm:block">
            <button 
              onMouseEnter={() => setShowRegisterMenu(true)}
              onClick={() => setShowRegisterMenu(!showRegisterMenu)}
              className="flex items-center gap-2 bg-slate-100 text-slate-900 px-4 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200"
            >
              Register <ChevronDown size={14} className={showRegisterMenu ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>

            <AnimatePresence>
              {showRegisterMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseLeave={() => setShowRegisterMenu(false)}
                  className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 border border-slate-100 p-2 overflow-hidden"
                >
                  <Link href="/pro" className="flex items-center gap-4 w-full p-4 hover:bg-indigo-50 rounded-2xl transition-colors text-left group">
                    <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Hammer size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">Professional</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Start Earning</p>
                    </div>
                  </Link>
                  <button className="flex items-center gap-4 w-full p-4 hover:bg-fuchsia-50 rounded-2xl transition-colors text-left group">
                    <div className="bg-fuchsia-100 p-2 rounded-lg group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">Customer</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Book a Service</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Download Button: Shrunk on mobile for better fit */}
          <button className="bg-indigo-600 text-white px-4 md:px-6 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-indigo-200 active:scale-95">
            <Download size={14} /> <span className="hidden xs:inline uppercase tracking-widest">App</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            <Menu size={22} className="text-slate-900" />
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#050505] z-[110] flex flex-col text-white"
          >
            {/* Header with Close */}
            <div className="px-6 py-6 flex justify-between items-center border-b border-white/10">
               <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-slate-400 font-bold text-xs tracking-widest uppercase"
              >
                <ArrowLeft size={16} /> Close
              </button>
              <div className="text-xl font-black tracking-tighter text-indigo-500">tydee.</div>
            </div>

            {/* Vertical Links Area */}
            <div className="flex-1 flex flex-col justify-center px-8">
              <div className="space-y-6">
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-4xl sm:text-6xl font-black text-white hover:text-indigo-400 transition-all tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer Area within Mobile Menu */}
            <div className="p-8 bg-white/5 border-t border-white/10 space-y-8">
              <div className="flex flex-col gap-2">
                <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em]">Durban Launch 2026</p>
                <div className="flex gap-4 mt-2">
                  <div className="p-3 bg-white/5 rounded-full border border-white/10 text-white"><Facebook size={18} /></div>
                  <div className="p-3 bg-white/5 rounded-full border border-white/10 text-white"><Linkedin size={18} /></div>
                  <div className="p-3 bg-white/5 rounded-full border border-white/10 text-white"><MessageCircle size={18} /></div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/pro" onClick={() => setIsOpen(false)} className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2">
                  <Hammer size={18} /> REGISTER AS PRO
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}