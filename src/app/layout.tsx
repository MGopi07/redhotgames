import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CanvasBackground from "@/components/CanvasBackground";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RED HOT GAMES – Premium iGaming Solutions",
  description: "Red Hot Games provides professional licensed software solutions, wagering recording systems, and betting terminals for the global iGaming and betting industries.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${outfit.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/* Remix Icons CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-950 font-sans relative">
        <CanvasBackground />
        <CursorGlow />
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
