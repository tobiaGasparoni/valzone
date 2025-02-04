"use client";

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

  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`h-full bg-white ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {configured ? children : <p>Loading...</p>}
      </body>
    </html>
  );
}
