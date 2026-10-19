"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Facebook,
  HelpCircle,
  Instagram,
  LifeBuoy,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SUPPORT_EMAIL   = "support@foona.co.za";
const WHATSAPP_URL    = "https://wa.me/27789465946?text=Hi%20Foona%2C%20I%20scanned%20your%20QR%20code%20and%20would%20like%20to%20get%20in%20touch!";
const WHATSAPP_LABEL  = "+27 78 946 5946";

// Update these two URLs with your exact Facebook & Instagram profile handles:
const INSTAGRAM_URL   = "https://www.instagram.com/getfoona/";
const INSTAGRAM_LABEL = "@Foona";
const FACEBOOK_URL    = "https://web.facebook.com/FoonaInc/";
const FACEBOOK_LABEL  = "Foona South Africa";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQ_SECTIONS = [
  {
    id:     "getting-started",
    number: "02",
    title:  "Getting Started",
    dark:   true,
    icon:   Zap,
    items: [
      {
        q: "What is Foona?",
        a: "Foona is a two-sided digital marketplace that connects customers with verified home-service professionals across the eThekwini municipality and greater KwaZulu-Natal region. Customers post jobs, Pros submit competitive bids, and Foona manages the entire booking, live-tracking, and payment workflow — all from a single platform.",
      },
      {
        q: "Is Foona available in my area?",
        a: "Foona currently operates across the eThekwini municipality including Durban, Pinetown, Umlazi, Chatsworth, Phoenix, and surrounding areas in KwaZulu-Natal. Coverage is expanding. Enter your address in the app to check real-time availability in your neighbourhood.",
      },
      {
        q: "What services does Foona offer?",
        a: "Foona supports a wide range of home and personal services: residential and commercial cleaning, hair braiding and styling, beauty and nail services, mobile barbering, plumbing repairs, geyser servicing, and outdoor maintenance such as gutter cleaning. New service categories are added regularly.",
      },
      {
        q: "How do I create an account?",
        a: "Download the Foona app from the App Store or Google Play. Tap 'Create Account', choose whether you are registering as a Customer or a Professional, and follow the on-screen steps. Customers are active immediately. Professionals go through a one-time identity and background-check verification before their profile goes live in the marketplace.",
      },
    ],
  },
  {
    id:     "customers",
    number: "03",
    title:  "For Customers",
    dark:   false,
    icon:   Users,
    items: [
      {
        q: "How do I post a job?",
        a: "Open the Foona app, select your service category, and answer a short set of questions about your specific requirements — room count, flooring type, hair length, and so on. Foona uses your answers to build a detailed job brief that is automatically shown to qualified Pros in your area. You will typically start receiving bids within minutes.",
      },
      {
        q: "How do I choose between the bids I receive?",
        a: "Each bid shows the Pro's name, star rating, verified status, quote amount, and any notes they have added. Tap a Pro's profile to view their work history, completed jobs, and customer reviews before accepting. There is no obligation to accept any bid.",
      },
      {
        q: "Can I cancel a booking after confirming?",
        a: "Yes. Open the booking in your job history and tap 'Cancel Booking.' Cancellations made more than 2 hours before the scheduled start time incur no charge. Late cancellations may result in a partial fee to compensate the Pro for their travel and reserved time slot.",
      },
      {
        q: "What if the Pro doesn't show up?",
        a: "If a confirmed Pro fails to arrive within the agreed time window, tap 'Report Issue' inside the job screen. Foona will investigate, rebook you with an available Pro at no additional cost, and issue a credit to your account for the inconvenience.",
      },
      {
        q: "How does the PIN handshake work at the start of a job?",
        a: "When a Pro arrives, they will ask you for a 4-digit PIN that is automatically generated and displayed in your app. You share this PIN verbally with the Pro to confirm their arrival and formally start the job. The job cannot be marked as 'in progress' without your PIN — protecting both parties at all times.",
      },
      {
        q: "Can I rebook the same Pro in future?",
        a: "Yes. After a completed job, save the Pro to your Favourites list from their profile. The next time you post a similar job, their profile will be highlighted in your bid feed so you can accept their quote with a single tap.",
      },
    ],
  },
  {
    id:     "professionals",
    number: "04",
    title:  "For Professionals",
    dark:   true,
    icon:   HelpCircle,
    items: [
      {
        q: "How does the Pro verification process work?",
        a: "After submitting your registration, Foona's vetting team reviews your identity documents (South African ID or passport), proof of skill or trade certification, and runs a background check. The process typically takes 2–5 business days. You will receive a notification once your account is cleared and your profile is live in the marketplace.",
      },
      {
        q: "My verification has been pending for more than 5 days — what do I do?",
        a: "First, confirm that all submitted documents are clearly legible and not expired. If everything is correct, email support@foona.co.za with your registered phone number and the subject line 'Verification Status — [Your Name]'. Our team will prioritise your review within 24 hours.",
      },
      {
        q: "How do I submit a bid on a job?",
        a: "Open the Marketplace tab in your Pro app. Jobs matching your service categories appear in real time. Tap any job to view the full brief — property details, customer requirements, and location. Enter your quote and an optional note to the customer, then tap 'Submit Bid.' You will be notified when the customer responds.",
      },
      {
        q: "Why wasn't my bid accepted?",
        a: "Customers choose based on price, rating, and profile strength. Common reasons bids are overlooked include a quote above the customer's budget, an incomplete profile, a low rating, or the customer selecting a Pro they have used before. Completing your profile, collecting reviews, and pricing competitively will significantly improve your acceptance rate.",
      },
      {
        q: "What is the Squad / Collaboration feature?",
        a: "Squad jobs let you sub-contract work on your active bookings to other verified Pros on the platform. As a Lead Pro you set a payout per member and define how many Pros you need. As a joining Pro you apply to existing squads and receive your payout automatically upon job completion. All squad payments are protected by Foona Escrow.",
      },
      {
        q: "Can I update my services or service area?",
        a: "Yes. Go to Profile → Services & Location in your Pro app. You can add or remove service categories and update your preferred working radius at any time. Changes take effect across the marketplace within 30 minutes.",
      },
    ],
  },
  {
    id:     "payments",
    number: "05",
    title:  "Payments & Billing",
    dark:   false,
    icon:   CreditCard,
    items: [
      {
        q: "How does payment work for customers?",
        a: "Foona currently operates on a cash-on-completion model. You agree to a price when accepting a bid, and payment is made directly to the Pro once the job is done. Foona Escrow protection is also available for pre-paid bookings — locking in your Pro and releasing payment only once you are satisfied.",
      },
      {
        q: "When do Pros receive their payouts?",
        a: "Earnings from completed jobs are processed weekly every Thursday and paid directly into your registered bank account via EFT. The minimum payout threshold is R100. Squad earnings are split and disbursed automatically within the same weekly cycle.",
      },
      {
        q: "Are there any fees for using Foona?",
        a: "Foona charges a platform service fee on completed jobs. The current fee structure is displayed in the Earnings section of your Pro app. Customers never pay a booking or subscription fee — posting jobs and managing bids is always free.",
      },
      {
        q: "What happens if there is a payment dispute?",
        a: "If you believe a payment has been incorrectly processed or withheld, contact support@foona.co.za with your job ID and a description of the dispute. Our payments team investigates all disputes within 72 hours and provides written confirmation of the outcome.",
      },
    ],
  },
  {
    id:     "safety",
    number: "06",
    title:  "Safety & Trust",
    dark:   true,
    icon:   ShieldCheck,
    items: [
      {
        q: "How does Foona verify that Pros are trustworthy?",
        a: "Every Pro on the platform has passed a documented identity check, background screening, and skill verification before their profile goes live. Verified Pros carry a blue 'Verified' badge visible on their profile. Customers can view a Pro's rating, review history, and job-completion rate before accepting any bid.",
      },
      {
        q: "What do I do if I feel unsafe during a job?",
        a: "Your safety is the absolute priority. Leave the situation and call emergency services (10111 or 10177) immediately. Once you are safe, report the incident through the app via 'Report Safety Issue' or email support@foona.co.za. Foona will suspend the involved account pending a full investigation and cooperate with law enforcement as required.",
      },
      {
        q: "How do I report misconduct or a complaint?",
        a: "Tap 'Report Issue' on the relevant job card in the app, or email support@foona.co.za with your job ID and a description of the incident. All reports are reviewed within 24 hours. Serious violations result in immediate account suspension pending investigation.",
      },
      {
        q: "Is my personal information shared with Pros or Customers?",
        a: "Only the information necessary to complete a booking is shared between parties. Customers see a Pro's name, rating, photo, and verified status. Pros see a job description and general location — your full home address is only revealed to an assigned Pro after you accept their bid. See our Privacy Policy for full details.",
      },
    ],
  },
];

// ─── Issue categories for the contact form ────────────────────────────────────

const CATEGORIES = [
  "Select a category…",
  "Account & Login",
  "Booking Issue",
  "Payment or Payout",
  "Pro Verification",
  "Safety Incident",
  "Technical Problem",
  "Squad / Collaboration",
  "Other",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Single expanding FAQ item */
function FaqItem({
  q, a, id, dark,
}: {
  q: string; a: string; id: string; dark: boolean;
}) {
  const [open, setOpen] = useState(false);

  const border  = dark ? "border-white/10"       : "border-slate-200";
  const qColor  = dark ? "text-white"            : "text-[#0a0f1e]";
  const aColor  = dark ? "text-slate-400"        : "text-slate-500";
  const iconCol = dark ? "text-indigo-400"       : "text-indigo-500";
  const hoverBg = dark ? "hover:bg-white/[0.03]" : "hover:bg-indigo-50/40";

  return (
    <div className={`border-b ${border} last:border-b-0`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left transition-colors ${hoverBg} group`}
        aria-expanded={open}
      >
        <span className={`font-bold text-sm md:text-base leading-snug ${qColor}`}>
          {q}
        </span>
        <span
          className={`shrink-0 transition-transform duration-300 ${iconCol} ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className={`pb-6 text-sm md:text-base font-light leading-relaxed ${aColor}`}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** FAQ section block — mirrors the privacy policy section layout exactly */
function FaqSection({
  id, number, title, dark, icon: Icon, items,
}: (typeof FAQ_SECTIONS)[0]) {
  const ghostNum = dark ? "text-white/[0.025]" : "text-indigo-500/[0.06]";
  const label    = dark ? "text-indigo-400"    : "text-indigo-600";
  const heading  = dark ? "text-white"         : "text-[#0a0f1e]";
  const bg       = dark ? "bg-[#050505]"       : "bg-white";

  return (
    <section
      id={id}
      className={`relative px-4 md:px-6 py-20 md:py-28 overflow-hidden ${bg}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Ghost number */}
          <div
            aria-hidden
            className={`absolute right-6 md:right-12 top-8 text-[120px] md:text-[180px] font-black leading-none select-none pointer-events-none tabular-nums ${ghostNum}`}
          >
            {number}
          </div>

          {/* Section label + title */}
          <div className="mb-10 md:mb-14 relative">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-2 rounded-xl ${dark ? "bg-indigo-500/20" : "bg-indigo-50"}`}
              >
                <Icon size={16} className={label} />
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${label}`}
              >
                Section {number}
              </span>
            </div>

            <h2
              className={`text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter ${heading}`}
            >
              {title}
            </h2>
            <div className="mt-5 h-[3px] w-12 bg-indigo-500 rounded-full" />
          </div>

          {/* FAQ accordion */}
          <div className={`max-w-4xl divide-y ${dark ? "divide-white/10" : "divide-slate-200"} border-t ${dark ? "border-white/10" : "border-slate-200"}`}>
            {items.map((item, i) => (
              <FaqItem
                key={i}
                id={`${id}-${i}`}
                q={item.q}
                a={item.a}
                dark={dark}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  // Smooth scroll when arriving via QR code hash (#contact-channels)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, []);

  // Contact form state
  const [form, setForm] = useState({
    name: "", email: "", category: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const subject = encodeURIComponent(
      `[${form.category || "Support"}] Message from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCategory: ${form.category}\n\n${form.message}`
    );

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  // Build quick-access nav items from FAQ sections
  const quickLinks = FAQ_SECTIONS.map((s) => ({
    id: s.id, number: s.number, title: s.title,
  }));

  return (
    <main className="bg-[#050505]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex flex-col justify-end px-4 md:px-6 pt-24 pb-16 md:pb-24 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/10 blur-[140px] rounded-full -z-0 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <div className="bg-indigo-500/20 p-2.5 rounded-xl">
                <LifeBuoy className="text-indigo-400 w-5 h-5" />
              </div>
              <span className="text-indigo-400 font-black tracking-widest uppercase text-[10px] md:text-xs">
                Help · Support Centre
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.88] tracking-tighter mb-8 md:mb-10">
              HOW CAN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white italic">
                WE HELP?
              </span>
            </h1>

            <div className="flex flex-wrap gap-6 md:gap-10 text-sm">
              <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  Response Time
                </p>
                <p className="text-slate-300 font-bold">Within 24 hours</p>
              </div>
              <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  Support Email
                </p>
                <p className="text-slate-300 font-bold">{SUPPORT_EMAIL}</p>
              </div>
              <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">
                  Coverage
                </p>
                <p className="text-slate-300 font-bold">
                  eThekwini · KwaZulu-Natal
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 01 — Contact Channels (white) — QR CODE TARGET ───────── */}
      <section id="contact-channels" className="scroll-mt-8 relative bg-white px-4 md:px-6 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Ghost number */}
            <div
              aria-hidden
              className="absolute right-6 md:right-12 top-8 text-[120px] md:text-[180px] font-black leading-none select-none pointer-events-none tabular-nums text-indigo-500/[0.06]"
            >
              01
            </div>

            {/* Header */}
            <div className="mb-10 md:mb-14 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-indigo-50">
                  <MessageCircle size={16} className="text-indigo-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                  Section 01
                </span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter text-[#0a0f1e]">
                Get in Touch
              </h2>
              <div className="mt-5 h-[3px] w-12 bg-indigo-500 rounded-full" />
            </div>

            {/* Primary Contact Channel Cards (WhatsApp, Email, Response Times) */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mb-6">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-emerald-500/40 hover:bg-emerald-50/30 transition-all"
              >
                <div className="p-3 rounded-2xl bg-emerald-50 w-fit mb-6">
                  <MessageCircle size={20} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-black text-[#0a0f1e] text-lg leading-tight mb-1">
                    WhatsApp
                  </p>
                  <p className="text-slate-500 text-sm font-light mb-4">
                    Chat with us directly for urgent queries or bookings.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-sm group-hover:gap-2.5 transition-all">
                    {WHATSAPP_LABEL}
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="group flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-slate-200 hover:border-indigo-500/40 hover:bg-indigo-50/40 transition-all"
              >
                <div className="p-3 rounded-2xl bg-indigo-50 w-fit mb-6">
                  <Mail size={20} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-black text-[#0a0f1e] text-lg leading-tight mb-1">
                    Email Support
                  </p>
                  <p className="text-slate-500 text-sm font-light mb-4">
                    Detailed queries, quotes, and documentation.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-indigo-600 font-bold text-sm group-hover:gap-2.5 transition-all">
                    {SUPPORT_EMAIL}
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>

              {/* Response time */}
              <div className="flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-slate-200 bg-slate-50">
                <div className="p-3 rounded-2xl bg-slate-100 w-fit mb-6">
                  <Wrench size={20} className="text-slate-500" />
                </div>
                <div>
                  <p className="font-black text-[#0a0f1e] text-lg leading-tight mb-1">
                    Response Times
                  </p>
                  <ul className="space-y-2 mt-3">
                    {[
                      { label: "General queries",     time: "Within 24 hours" },
                      { label: "Payment disputes",    time: "Within 72 hours" },
                      { label: "Safety incidents",    time: "Within 2 hours"  },
                      { label: "Verification status", time: "Within 24 hours" },
                    ].map((row) => (
                      <li key={row.label} className="flex items-start justify-between gap-4">
                        <span className="text-slate-500 text-xs font-light">{row.label}</span>
                        <span className="text-[#0a0f1e] text-xs font-bold shrink-0">{row.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Media Channels (Instagram & Facebook) */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mb-16">
              {/* Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-3xl border border-slate-200 hover:border-pink-500/40 hover:bg-pink-50/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-pink-50 text-pink-600 shrink-0">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="font-black text-[#0a0f1e] text-base leading-tight mb-0.5">
                      Instagram
                    </p>
                    <p className="text-slate-500 text-xs font-light">
                      See recent jobs, transformations & verified Pros.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-pink-600 font-bold text-xs sm:text-sm shrink-0 ml-4 group-hover:translate-x-0.5 transition-transform">
                  {INSTAGRAM_LABEL}
                  <ArrowUpRight size={14} />
                </span>
              </a>

              {/* Facebook */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-3xl border border-slate-200 hover:border-blue-600/40 hover:bg-blue-50/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 shrink-0">
                    <Facebook size={20} />
                  </div>
                  <div>
                    <p className="font-black text-[#0a0f1e] text-base leading-tight mb-0.5">
                      Facebook
                    </p>
                    <p className="text-slate-500 text-xs font-light">
                      Community updates, reviews & service announcements.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-blue-600 font-bold text-xs sm:text-sm shrink-0 ml-4 group-hover:translate-x-0.5 transition-transform">
                  {FACEBOOK_LABEL}
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </div>

            {/* Quick nav to FAQ sections */}
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-6">
                Jump to a Topic
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-indigo-500/40 hover:bg-indigo-50/50 transition-all group"
                  >
                    <span className="text-[10px] font-black text-indigo-400 tabular-nums w-6 shrink-0">
                      {link.number}
                    </span>
                    <span className="text-[#0a0f1e] font-bold text-sm group-hover:text-indigo-600 transition-colors leading-tight">
                      {link.title}
                    </span>
                    <ArrowUpRight
                      size={12}
                      className="ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0"
                    />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ sections 02–06 (alternating dark/white) ───────────────────── */}
      {FAQ_SECTIONS.map((section) => (
        <FaqSection key={section.id} {...section} />
      ))}

      {/* ── Contact form (white) ──────────────────────────────────────────── */}
      <section id="send-message" className="relative bg-white px-4 md:px-6 py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Ghost number */}
            <div
              aria-hidden
              className="absolute right-6 md:right-12 top-8 text-[120px] md:text-[180px] font-black leading-none select-none pointer-events-none tabular-nums text-indigo-500/[0.06]"
            >
              07
            </div>

            {/* Header */}
            <div className="mb-10 md:mb-14 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-indigo-50">
                  <Send size={16} className="text-indigo-600" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                  Section 07
                </span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter text-[#0a0f1e]">
                Send a Message
              </h2>
              <div className="mt-5 h-[3px] w-12 bg-indigo-500 rounded-full" />
            </div>

            {/* Form or success state */}
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-start gap-6 p-8 md:p-12 rounded-3xl border border-slate-200 bg-indigo-50/40"
                  >
                    <div className="p-3 rounded-2xl bg-indigo-100 w-fit">
                      <CheckCircle2 size={24} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-black text-[#0a0f1e] text-2xl leading-tight mb-2">
                        Message opened in your mail app.
                      </p>
                      <p className="text-slate-500 text-sm font-light leading-relaxed">
                        If your mail client didn't open, send directly to{" "}
                        <a
                          href={`mailto:${SUPPORT_EMAIL}`}
                          className="text-indigo-600 font-bold hover:underline"
                        >
                          {SUPPORT_EMAIL}
                        </a>
                        . We respond within 24 hours on business days.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="text-[10px] font-black uppercase tracking-widest text-slate-500"
                        >
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-[#0a0f1e] text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="text-[10px] font-black uppercase tracking-widest text-slate-500"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-[#0a0f1e] text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="category"
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500"
                      >
                        Issue Category
                      </label>
                      <div className="relative">
                        <select
                          id="category"
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="w-full appearance-none px-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-[#0a0f1e] text-sm font-medium focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition pr-10"
                        >
                          {CATEGORIES.map((cat) => (
                            <option
                              key={cat}
                              value={cat === CATEGORIES[0] ? "" : cat}
                              disabled={cat === CATEGORIES[0]}
                            >
                              {cat}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Describe your issue in as much detail as possible. Include your job ID if relevant."
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-[#0a0f1e] text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 transition resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2.5 bg-[#0a0f1e] hover:bg-indigo-700 text-white font-black text-sm px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Send size={15} />
                        Send Message
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer bar ───────────────────────────────────────────────────── */}
      <section className="bg-[#050505] border-t border-white/5 px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-white font-black text-lg tracking-tighter mb-1">
              FOONA TECHNOLOGIES
            </p>
            <p className="text-slate-600 text-sm">
              Durban, KwaZulu-Natal · South Africa
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-white text-sm font-medium transition-colors"
            >
              <Instagram size={14} />
              Instagram
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-white text-sm font-medium transition-colors"
            >
              <Facebook size={14} />
              Facebook
            </a>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-white text-sm font-medium transition-colors"
            >
              {SUPPORT_EMAIL}
              <ArrowUpRight size={13} />
            </a>
            <a
              href="/privacy"
              className="text-slate-500 hover:text-white text-sm font-medium transition-colors"
            >
              Privacy Policy
            </a>
            <p className="text-slate-600 text-sm">
              © 2025 Foona Technologies (Pty) Ltd
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}