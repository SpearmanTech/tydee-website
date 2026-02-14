import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white py-24 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="text-3xl font-black text-[#4f46e5] mb-6 tracking-tighter">tydee</div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
              The infrastructure for South Africa's digital service economy. 
              Starting in Durban, built for the continent.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Refined Mock App Store Buttons */}
              <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg border border-black hover:bg-slate-800 transition-colors w-36">
                <div className="text-left">
                  <p className="text-[8px] uppercase leading-none">Download on the</p>
                  <p className="text-sm font-bold leading-tight">App Store</p>
                </div>
              </button>
              <button className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg border border-black hover:bg-slate-800 transition-colors w-36">
                <div className="text-left">
                  <p className="text-[8px] uppercase leading-none">Get it on</p>
                  <p className="text-sm font-bold leading-tight">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-[0.15em]">Platform</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Customer Hub</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Tydee Pro</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Safety & Trust</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Service Heatmaps</li>
            </ul>
          </div>

          {/* Earn Column (Future-Proofing for your Pros) */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-[0.15em]">Earn</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Professional Signup</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Earnings Dashboard</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Pro Benefits</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Tydee Academy</li>
            </ul>
          </div>

          {/* Company & Investor Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-[0.15em]">Capital</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Investor Relations</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Forbes 30U30</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Press Room</li>
            </ul>
          </div>

          {/* Governance Column */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-[0.15em]">Legal</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Compliance</li>
              <li className="hover:text-[#4f46e5] cursor-pointer transition-colors">Cookie Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6">
             {/* Mock Social Links */}
             <div className="w-5 h-5 bg-slate-200 rounded-full cursor-pointer hover:bg-[#4f46e5] transition-colors" />
             <div className="w-5 h-5 bg-slate-200 rounded-full cursor-pointer hover:bg-[#4f46e5] transition-colors" />
             <div className="w-5 h-5 bg-slate-200 rounded-full cursor-pointer hover:bg-[#4f46e5] transition-colors" />
          </div>
          <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">
            © 2026 Tydee Technologies (Pty) Ltd • Durban, South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}