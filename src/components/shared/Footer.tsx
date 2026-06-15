"use client";
import React from "react";
import { Facebook, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ─── Route map ────────────────────────────────────────────────────────────────
// Add hrefs here as new pages are built. Entries without an href render as
// plain text so they don't become dead links.

const NAV_LINKS: Record<string, string> = {
  "Privacy Policy": "/privacy-policy",
  // "Terms of Service": "/terms",
  // "Cookie Policy":   "/cookie-policy",
  // "Compliance":      "/compliance",
};

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 md:pt-32 px-4 md:px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-12 md:gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-end gap-1 mb-6 w-fit">
              <Image
                src="/foona-logo.png"
                alt="Foona"
                width={120}
                height={32}
                className="h-8 w-auto object-contain"
              />
              <span className="text-fuchsia-500 font-black text-4xl leading-[0.55]">
                .
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-8">
              The infrastructure for South Africa's digital service economy.
              Starting in Durban, built for the continent.
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              <AppStoreButton platform="Apple" />
              <AppStoreButton platform="Google" />
            </div>
          </div>

          {/* Navigation Links */}
          <FooterColumn
            title="Platform"
            links={[
              "Customer Hub",
              "Foona Pro",
              "Safety & Trust",
              "Service Heatmaps",
            ]}
          />
          <FooterColumn
            title="Earn"
            links={[
              "Professional Signup",
              "Earnings Dashboard",
              "Pro Benefits",
              "Foona Academy",
            ]}
          />
          <FooterColumn
            title="Capital"
            links={[
              "Investor Relations",
              "Forbes 30U30",
              "Careers",
              "Press Room",
            ]}
          />
          <FooterColumn
            title="Legal"
            links={[
              "Privacy Policy",
              "Terms of Service",
              "Compliance",
              "Cookie Policy",
            ]}
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-6">
            <SocialIcon
              icon={<Linkedin size={18} />}
              href="https://www.linkedin.com/company/Foona-inc/?viewAsMember=true"
            />
            <SocialIcon
              icon={<Facebook size={18} />}
              href="https://www.facebook.com/FoonaInc"
            />
            <SocialIcon
              icon={<Instagram size={18} />}
              href="https://www.instagram.com/foonaservices"
            />
          </div>

          <div className="flex flex-col md:items-end items-center gap-2 text-center md:text-right">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2026 Foona Technologies (Pty) Ltd
            </p>
            <p className="text-slate-300 text-[9px] uppercase tracking-[0.1em]">
              Durban, South Africa • Registered PTY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col">
      <h4 className="font-black text-slate-900 mb-6 text-[10px] md:text-xs uppercase tracking-[0.2em]">
        {title}
      </h4>
      <ul className="space-y-4">
        {links.map((link) => {
          const href = NAV_LINKS[link];
          const inner = (
            <>
              {link}
              <ArrowUpRight
                size={12}
                className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1"
              />
            </>
          );

          return (
            <li key={link}>
              {href ? (
                <Link
                  href={href}
                  className="text-slate-500 text-sm font-medium hover:text-[#4f46e5] cursor-pointer transition-colors flex items-center group"
                >
                  {inner}
                </Link>
              ) : (
                <span className="text-slate-500 text-sm font-medium hover:text-[#4f46e5] cursor-pointer transition-colors flex items-center group">
                  {inner}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#4f46e5] hover:text-white cursor-pointer transition-all border border-slate-100"
    >
      {icon}
    </a>
  );
}

function AppStoreButton({ platform }: { platform: "Apple" | "Google" }) {
  return (
    <button className="flex items-center justify-center bg-black text-white px-5 py-3 rounded-xl border border-black hover:bg-slate-800 transition-all w-full xs:w-40 active:scale-95">
      <div className="text-left">
        <p className="text-[7px] uppercase leading-none opacity-60">
          {platform === "Apple" ? "Download on the" : "Get it on"}
        </p>
        <p className="text-xs font-bold leading-tight mt-1">
          {platform === "Apple" ? "App Store" : "Google Play"}
        </p>
      </div>
    </button>
  );
}