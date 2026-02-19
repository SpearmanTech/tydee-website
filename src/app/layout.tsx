import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tydee",
  description: "Pan-African premium on-demand service platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Mandatory <body> tag. 
          The background color is set to Tydee's signature dark theme. 
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
