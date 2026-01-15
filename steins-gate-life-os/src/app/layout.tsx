import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LabStateProvider } from "@/context/lab-state";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steins;Gate Life OS – Dashboard",
  description: "Temporal control center for the Steins;Gate Life OS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-gradient-to-br from-zinc-950 via-zinc-950 to-slate-900 text-white"
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LabStateProvider>{children}</LabStateProvider>
      </body>
    </html>
  );
}
