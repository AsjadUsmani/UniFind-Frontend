import type React from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Providers from "./providers";

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UniFind Portal - Campus Lost & Found Hub",
  description:
    "Report, search, and claim lost or found items on campus. Your centralized hub for campus resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`font-sans antialiased`}>
      <Providers>
          {children}
          <Toaster />
          <Analytics />
      </Providers>
        </body>
    </html>
  );
}
