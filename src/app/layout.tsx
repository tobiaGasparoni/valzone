"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch("/amplify_outputs.json");
        const config = await response.json();
        Amplify.configure(config);
        setConfigured(true);
      } catch (error) {
        console.error("Failed to fetch Amplify config:", error);
      }
    }

    fetchConfig();
  }, []);

  if (!configured) {
    return <p>Loading...</p>; // Avoid rendering app before config is set
  }

  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`h-full bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
