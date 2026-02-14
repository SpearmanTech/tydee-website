"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hammer, User, ChevronDown, Download, ArrowLeft, Linkedin, Facebook, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);

  const menuLinks = [
    { name: "The Issue", href: "#problem" },
    { name: "Mission", href: "#mission" },
    { name: "Earn", href: "#pro" },
    { name: "Safety", href: "#safety" },
    { name: "Support", href: "#support" },
    { name: "Durban Demand", href: "#demand" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-[100] px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-white/80 border-b border-slate-200/50"
      >
        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter text-indigo-600">
          tydee<span className="text-fuchsia-500">.</span>
        </div>
        
        {/* Desktop Links (Primary Only) */}
        <div className="hidden md:flex gap-8 items-center font-bold text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {menuLinks.slice(0, 3).map((link) => (
            <a key={link.name} href={link.href} className="hover:text-indigo-600 transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Register Dropdown */}
          <div className="relative hidden sm:block">
            <button 
              onMouseEnter={() => setShowRegisterMenu(true)}
              onClick={() => setShowRegisterMenu(!showRegisterMenu)}
              className="flex items-center gap-2 bg-slate-100 text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 transition-all border border-slate-200"
            >
              Register <ChevronDown size={16} className={showRegisterMenu ? "rotate-180 transition-transform" : "transition-transform"} />
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
                  <button className="flex items-center gap-4 w-full p-4 hover:bg-indigo-50 rounded-2xl transition-colors text-left group">
                    <div className="bg-indigo-100 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Hammer size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Professional</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Start Earning</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-4 w-full p-4 hover:bg-fuchsia-50 rounded-2xl transition-colors text-left group">
                    <div className="bg-fuchsia-100 p-2 rounded-lg group-hover:bg-fuchsia-600 group-hover:text-white transition-colors">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Customer</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">Book a Service</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-black hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200">
            <Download size={16} /> <span className="hidden xs:inline">Download</span>
          </button>

          {/* Hamburger Toggle */}
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col"
          >
            {/* Header with Back/Close */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-50">
               <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-xs tracking-widest transition-colors"
              >
                <ArrowLeft size={18} /> BACK
              </button>

              <div className="text-xl font-black tracking-tighter text-indigo-600">
                tydee<span className="text-fuchsia-500">.</span>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links Section */}
            <div className="flex-1 flex flex-col justify-center px-10">
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] mb-8">Menu</p>
              <div className="space-y-4">
                {menuLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-4xl sm:text-6xl font-black text-slate-900 hover:text-indigo-600 hover:translate-x-4 transition-all tracking-tighter"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Area inside Menu */}
            <div className="p-10 bg-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex flex-col gap-4">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Join the Durban Launch</p>
                <div className="flex gap-4">
                  <div className="p-3 bg-white rounded-full border border-slate-200 hover:text-indigo-600 cursor-pointer shadow-sm transition-all"><Facebook size={20} /></div>
                  <div className="p-3 bg-white rounded-full border border-slate-200 hover:text-indigo-600 cursor-pointer shadow-sm transition-all"><Linkedin size={20} /></div>
                  <div className="p-3 bg-white rounded-full border border-slate-200 hover:text-green-600 cursor-pointer shadow-sm transition-all"><MessageCircle size={20} /></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-2">
                  <Hammer size={18} /> REGISTER AS PRO
                </button>
                <button className="bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <User size={18} /> CUSTOMER SIGNUP
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}