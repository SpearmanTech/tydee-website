import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

// 🚀 1. The God-Tier Meta Tags
export const metadata: Metadata = {
  title: "Foona | Verified Service Professionals & Equipment Rentals",
  description:
    "Book verified local professionals instantly. Foona is the premier talent marketplace for real-time service booking, secure escrow payments, and reliable equipment rentals. Get the job done right.",
  keywords: [
    "real time booking",
    "verified service professionals",
    "talent marketplace",
    "equipment rental",
    "instant payments",
    "Durban professionals",
    "KZN contractors",
    "Foona app"
  ],
  openGraph: {
    title: "Foona | Verified Service Professionals & Equipment Rentals",
    description:
      "Book verified local professionals instantly. Secure escrow payments and reliable equipment rentals in KwaZulu-Natal.",
    url: "https://foona.co.za",
    siteName: "Foona",
    locale: "en_ZA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 🚀 2. The Technical Schema Markup (Structured Data)
  // This feeds your marketplace data directly into Google's Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Foona Technologies",
    "image": "https://foona.co.za/foona-logo.png",
    "description": "The premier talent marketplace for real-time service booking, secure escrow payments, and reliable equipment rentals.",
    "url": "https://foona.co.za",
    "telephone": "+27699433764", // Support line
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Durban",
      "addressRegion": "KwaZulu-Natal",
      "addressCountry": "ZA"
    },
    "areaServed": [
      "Durban",
      "eThekwini",
      "Pinetown",
      "Umlazi",
      "Chatsworth",
      "Phoenix"
    ],
    "priceRange": "$$"
  };

  return (
    <html lang="en" className="scroll-smooth">
      {/* Injecting Schema Markup into the Head */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      
      {/* Mandatory <body> tag. 
          The background color is set to Foona's signature dark theme. 
      */}
      <body
        className={`${inter.className} bg-[#050505] text-white antialiased selection:bg-indigo-500 selection:text-white`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}