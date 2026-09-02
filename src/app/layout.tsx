import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/lib/landing-content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteMeta.title,
    template: "%s · Orderly",
  },
  description: siteMeta.description,
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    locale: "el_GR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
