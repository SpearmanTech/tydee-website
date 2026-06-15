"use client";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

const EFFECTIVE_DATE = "1 June 2025";
const VERSION = "1.0";
const CONTACT_EMAIL = "privacy@foona.co.za";
const REGULATOR_EMAIL = "inforeg@justice.gov.za";
const REGULATOR_URL = "www.inforegulator.org.za";

// ─── Data ────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    dark: true,
    content: [
      {
        type: "p",
        // 🚀 FIX: Wrapped this entire string in single quotes ('') instead of double quotes ("")
        text: 'Foona Technologies (Pty) Ltd ("Foona", "we", "our", or "us") operates the Foona platform, a digital marketplace that connects consumers ("Users") with verified home-service professionals ("Pros") across the eThekwini municipality and greater KwaZulu-Natal region. The platform is accessible via the Foona mobile application and associated web interfaces (collectively, the "Platform").',
      },
      {
        type: "p",
        text: "We are committed to protecting the privacy and personal information of everyone who interacts with our Platform. This Privacy Policy explains what information we collect, why we collect it, how we use and protect it, and the rights you have over your data.",
      },
      {
        type: "p",
        text: "This Policy is governed by the Protection of Personal Information Act 4 of 2013 (POPIA), applicable South African data-protection law, and international best-practice standards. By accessing or using the Platform, you acknowledge that you have read and understood this Policy.",
      },
    ],
  },
  {
    id: "who-it-applies-to",
    number: "02",
    title: "Who This Policy Applies To",
    dark: false,
    content: [
      { type: "p", text: "This Policy applies to all individuals who interact with Foona:" },
      {
        type: "list",
        items: [
          { label: "Users", body: "Individuals who register on the Foona customer platform to post jobs, receive bids, and book home-service professionals." },
          { label: "Pros", body: "Vetted service professionals who register on the Foona Pro platform to access job leads, submit bids, and manage their earnings." },
          { label: "Visitors", body: "Anyone who browses our websites or marketing pages without completing registration." },
          { label: "Third Parties", body: "Service providers, payment processors, analytics partners, and others who interact with the Platform on our behalf." },
        ],
      },
    ],
  },
  {
    id: "information-we-collect",
    number: "03",
    title: "Information We Collect",
    dark: true,
    content: [
      {
        type: "subsection",
        heading: "Information You Provide Directly",
        items: [
          "Registration data: full name, email address, phone number, and password.",
          "Identity verification data (Pros only): national identity number (ID/passport), residential address, and supporting documents submitted during the vetting process.",
          "Professional credentials (Pros only): trade certifications, proof of skill, and portfolio information.",
          "Financial information: banking details provided for payout purposes, processed securely via our payment infrastructure.",
          "Job postings and service requests: descriptions, photos, location pins, and preferred scheduling submitted by Users.",
          "Communications: messages exchanged through the Platform's in-app chat and any correspondence with our support team.",
        ],
      },
      {
        type: "subsection",
        heading: "Information Collected Automatically",
        items: [
          "Device information: device type, operating system, unique device identifiers, and browser type.",
          "Location data: real-time GPS coordinates used to power our Service Heatmap and live Pro tracking features. Location access is requested explicitly and can be revoked at device level.",
          "Usage data: pages viewed, features accessed, search queries, bid activity, and session timestamps.",
          "Log data: IP addresses, crash reports, and error logs collected for Platform stability and security purposes.",
        ],
      },
      {
        type: "subsection",
        heading: "Information from Third Parties",
        items: [
          "Identity verification providers: results of background and criminal record checks conducted on Pros.",
          "Payment processors: transaction confirmation data from our payment and payout partners.",
          "Authentication providers: limited profile data (name, email) when you sign in via a supported single-sign-on provider (e.g. Google OAuth).",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    number: "04",
    title: "How We Use Your Information",
    dark: false,
    content: [
      { type: "p", text: "We use the personal information we collect to:" },
      {
        type: "list",
        items: [
          { body: "Create and manage your account, and verify your identity." },
          { body: "Match Users with relevant Pros based on location, skill category, and availability." },
          { body: "Power the Service Heatmap, displaying aggregated and anonymised demand signals to Pros." },
          { body: "Process payments and initiate weekly payouts to Pros via our banking integration." },
          { body: "Provide live tracking information to Users while a booked Pro is in transit." },
          { body: "Conduct vetting procedures (background checks, skill validation) for all Pros." },
          { body: "Send transactional communications (booking confirmations, payout notifications, account alerts)." },
          { body: "Send marketing communications, where you have opted in and subject to your right to opt out at any time." },
          { body: "Detect and prevent fraud, unauthorised access, and abuse of the Platform." },
          { body: "Improve Platform performance and user experience through analytics." },
          { body: "Comply with legal obligations, including POPIA, tax legislation, and any regulatory reporting requirements." },
        ],
      },
    ],
  },
  {
    id: "lawful-basis",
    number: "05",
    title: "Lawful Basis for Processing",
    dark: true,
    content: [
      {
        type: "p",
        text: "Under POPIA, we process your personal information only where one or more of the following lawful grounds apply:",
      },
      {
        type: "list",
        items: [
          { label: "Contractual necessity", body: "Processing required to perform the agreement between you and Foona (e.g. facilitating a booking, processing a payout)." },
          { label: "Consent", body: "Processing based on your explicit consent, such as location data collection and marketing communications." },
          { label: "Legitimate interests", body: "Processing necessary for Foona's legitimate business interests, including Platform security, fraud prevention, and service improvement, provided those interests do not override your rights." },
          { label: "Legal obligation", body: "Processing required to comply with applicable law." },
        ],
      },
    ],
  },
  {
    id: "sharing",
    number: "06",
    title: "How We Share Your Information",
    dark: false,
    content: [
      { type: "p", text: "We do not sell your personal information. We share it only in the circumstances described below:" },
      {
        type: "subsection",
        heading: "Between Platform Participants",
        body: "When a User accepts a bid, limited profile information about the assigned Pro (name, rating, photo, verified status) is shared with the User. Limited job details (description, location, scope) are shared with bidding Pros.",
      },
      {
        type: "subsection",
        heading: "Service Providers",
        body: "We engage trusted third-party processors, including cloud infrastructure providers (Firebase/Google Cloud), payment and payout processors, identity and background-check providers, and analytics platforms. All processors are bound by data-processing agreements aligned with POPIA requirements.",
      },
      {
        type: "subsection",
        heading: "Legal Requirements",
        body: "We may disclose personal information to law-enforcement authorities, courts, or regulators where required by applicable law, a valid court order, or to protect the rights, safety, or property of Foona, its users, or the public.",
      },
    ],
  },
  {
    id: "retention",
    number: "07",
    title: "Data Retention",
    dark: true,
    content: [
      { type: "p", text: "We retain personal information for as long as necessary to provide the Platform services and to comply with our legal obligations:" },
      {
        type: "list",
        items: [
          { label: "Account data", body: "Retained for the duration of your active account, plus up to 5 years following account closure to satisfy legal and regulatory obligations." },
          { label: "Financial records", body: "Retained for a minimum of 5 years in compliance with South African tax and financial legislation." },
          { label: "Background check results", body: "Retained for the period required by applicable law and our vetting partners' agreements." },
          { label: "Location & usage data", body: "Retained in aggregated or anonymised form for analytics; raw location data is deleted within 90 days of collection." },
        ],
      },
    ],
  },
  {
    id: "security",
    number: "08",
    title: "Data Security",
    dark: false,
    content: [
      {
        type: "p",
        text: "We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, accidental loss, destruction, or disclosure:",
      },
      {
        type: "list",
        items: [
          { body: "Encryption of data in transit using industry-standard TLS protocols." },
          { body: "Encryption of sensitive data at rest within our cloud infrastructure." },
          { body: "Strict access controls — internal access to personal information is limited to personnel who require it to perform their role." },
          { body: "Multi-factor authentication for internal systems handling personal data." },
          { body: "Regular security reviews and incident-response procedures." },
        ],
      },
      {
        type: "p",
        text: "No method of electronic transmission or storage is completely secure. In the event of a security breach likely to result in a risk to your rights and freedoms, we will notify you and the Information Regulator as required by POPIA.",
      },
    ],
  },
  {
    id: "your-rights",
    number: "09",
    title: "Your Rights Under POPIA",
    dark: true,
    content: [
      {
        type: "p",
        text: "Subject to applicable law and certain exceptions, you have the following rights in relation to your personal information:",
      },
      {
        type: "list",
        items: [
          { label: "Right of access", body: "Request confirmation of whether we hold your personal information and obtain a copy." },
          { label: "Right to correction", body: "Request that inaccurate or incomplete personal information be corrected." },
          { label: "Right to deletion", body: "Request deletion of your personal information where we no longer have a lawful basis to process it." },
          { label: "Right to object", body: "Object to processing based on our legitimate interests." },
          { label: "Right to withdraw consent", body: "Withdraw consent at any time where processing is consent-based, without affecting the lawfulness of prior processing." },
          { label: "Right to complain", body: "Submit a complaint to the South African Information Regulator if you believe we have processed your personal information unlawfully." },
        ],
      },
      {
        type: "p",
        text: "To exercise any of these rights, please contact us using the details in Section 13. We will respond within 30 days of receiving a verifiable request.",
      },
    ],
  },
  {
    id: "children",
    number: "10",
    title: "Children's Privacy",
    dark: false,
    content: [
      {
        type: "p",
        text: "The Platform is not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe that a minor has provided us with personal information, please contact us immediately and we will take steps to delete such information from our systems.",
      },
    ],
  },
  {
    id: "cross-border",
    number: "11",
    title: "Cross-Border Data Transfers",
    dark: true,
    content: [
      {
        type: "p",
        text: "Our cloud infrastructure (Google Firebase and Google Cloud Platform) may store and process data in data centres located outside South Africa. We ensure that any cross-border transfer of personal information is subject to appropriate safeguards, including contractual protections that meet POPIA's requirements for cross-border transfers, and that the recipient country provides an adequate level of protection.",
      },
    ],
  },
  {
    id: "changes",
    number: "12",
    title: "Changes to This Policy",
    dark: false,
    content: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal obligations. When we make material changes, we will notify you via the Platform, by email, or by posting a prominent notice on our website, at least 14 days before the changes take effect. Your continued use of the Platform after the effective date constitutes acceptance of the updated Policy.",
      },
    ],
  },
  {
    id: "contact",
    number: "13",
    title: "Contact Us & Information Officer",
    dark: true,
    content: [
      {
        type: "p",
        text: "For all privacy-related queries, data-subject requests, or complaints, please contact our Information Officer:",
      },
      { type: "contact" },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionContent({ content, dark }: { content: any[]; dark: boolean }) {
  const prose = dark ? "text-slate-400" : "text-slate-500";
  const labelColor = dark ? "text-indigo-400" : "text-indigo-600";
  const bulletBg = dark ? "bg-indigo-500/20" : "bg-indigo-50";
  const bulletDot = dark ? "bg-indigo-400" : "bg-indigo-500";
  const subheadColor = dark ? "text-white" : "text-[#0a0f1e]";
  const subheadBorder = dark ? "border-white/10" : "border-slate-200";
  const cardBg = dark ? "bg-white/[0.04]" : "bg-slate-50";

  return (
    <div className="space-y-6">
      {content.map((block: any, i: number) => {
        if (block.type === "p") {
          return (
            <p key={i} className={`${prose} text-base md:text-lg font-light leading-relaxed`}>
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="space-y-3">
              {block.items.map((item: any, j: number) => (
                <li key={j} className={`flex gap-4 items-start p-4 ${cardBg} rounded-2xl border ${subheadBorder}`}>
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${bulletDot}`} />
                  <span className={`text-sm md:text-base font-light leading-relaxed ${prose}`}>
                    {item.label && (
                      <span className={`font-bold ${subheadColor}`}>{item.label} — </span>
                    )}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "subsection") {
          return (
            <div key={i} className={`p-6 md:p-8 rounded-3xl border ${subheadBorder} ${cardBg}`}>
              <h4 className={`font-black text-base md:text-lg tracking-tight mb-4 ${subheadColor}`}>
                {block.heading}
              </h4>
              {block.body && (
                <p className={`${prose} text-sm md:text-base font-light leading-relaxed`}>
                  {block.body}
                </p>
              )}
              {block.items && (
                <ul className="space-y-2 mt-2">
                  {block.items.map((item: string, k: number) => (
                    <li key={k} className="flex gap-3 items-start">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${bulletDot}`} />
                      <span className={`text-sm font-light leading-relaxed ${prose}`}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }

        if (block.type === "contact") {
          return (
            <div key={i} className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-6 md:p-8 bg-white/[0.04] rounded-3xl border border-white/10">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                  Information Officer
                </p>
                <p className="text-white font-black text-lg mb-1">Foona Technologies (Pty) Ltd</p>
                <p className="text-slate-400 text-sm mb-4">Durban, KwaZulu-Natal, South Africa</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-indigo-400 font-bold text-sm hover:text-white transition-colors"
                >
                  {CONTACT_EMAIL}
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="p-6 md:p-8 bg-white/[0.04] rounded-3xl border border-white/10">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">
                  SA Information Regulator
                </p>
                <p className="text-white font-black text-lg mb-4">Information Regulator (SA)</p>
                <a
                  href={`mailto:${REGULATOR_EMAIL}`}
                  className="block text-slate-400 text-sm hover:text-white transition-colors mb-2"
                >
                  {REGULATOR_EMAIL}
                </a>
                <a
                  href={`https://${REGULATOR_URL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-400 font-bold text-sm hover:text-white transition-colors"
                >
                  {REGULATOR_URL}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#050505]">

      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex flex-col justify-end px-4 md:px-6 pt-24 pb-16 md:pb-24 overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <div className="bg-indigo-500/20 p-2.5 rounded-xl">
                <ShieldCheck className="text-indigo-400 w-5 h-5" />
              </div>
              <span className="text-indigo-400 font-black tracking-widest uppercase text-[10px] md:text-xs">
                Legal · Privacy
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.88] tracking-tighter mb-8 md:mb-10">
              PRIVACY<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-white italic">
                POLICY.
              </span>
            </h1>

            <div className="flex flex-wrap gap-6 md:gap-10 text-sm">
              <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">Effective Date</p>
                <p className="text-slate-300 font-bold">{EFFECTIVE_DATE}</p>
              </div>
              <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">Version</p>
                <p className="text-slate-300 font-bold">{VERSION}</p>
              </div>
              <div>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">Jurisdiction</p>
                <p className="text-slate-300 font-bold">Republic of South Africa · POPIA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="bg-white px-4 md:px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-8">Contents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 hover:border-indigo-500/40 hover:bg-indigo-50/50 transition-all group"
              >
                <span className="text-[10px] font-black text-indigo-400 tabular-nums w-6 shrink-0">
                  {s.number}
                </span>
                <span className="text-[#0a0f1e] font-bold text-sm group-hover:text-indigo-600 transition-colors leading-tight">
                  {s.title}
                </span>
                <ArrowUpRight
                  size={12}
                  className="ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative px-4 md:px-6 py-20 md:py-28 overflow-hidden ${
            section.dark ? "bg-[#050505]" : "bg-white"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              {/* Ghost section number */}
              <div
                aria-hidden
                className={`absolute right-6 md:right-12 top-8 text-[120px] md:text-[180px] font-black leading-none select-none pointer-events-none tabular-nums ${
                  section.dark ? "text-white/[0.025]" : "text-indigo-500/[0.06]"
                }`}
              >
                {section.number}
              </div>

              {/* Section label + title */}
              <div className="mb-10 md:mb-14 relative">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest mb-4 block ${
                    section.dark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  Section {section.number}
                </span>
                <h2
                  className={`text-3xl md:text-6xl font-black leading-[0.9] tracking-tighter ${
                    section.dark ? "text-white" : "text-[#0a0f1e]"
                  }`}
                >
                  {section.title}
                </h2>
                {/* underline accent */}
                <div className="mt-5 h-[3px] w-12 bg-indigo-500 rounded-full" />
              </div>

              {/* Content */}
              <div className="max-w-4xl">
                <SectionContent content={section.content} dark={section.dark} />
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* ── Footer bar ── */}
      <section className="bg-[#050505] border-t border-white/5 px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-white font-black text-lg tracking-tighter mb-1">FOONA TECHNOLOGIES</p>
            <p className="text-slate-600 text-sm">Durban, KwaZulu-Natal · South Africa</p>
          </div>
          <p className="text-slate-600 text-sm">
            © 2025 Foona Technologies (Pty) Ltd. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}