import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orderly — QR ordering για μαγαζιά εστίασης",
  description: "Απλό QR ordering για καφέ, bars, εστιατόρια και beach bars.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Orderly — QR ordering για μαγαζιά εστίασης",
    description: "Απλό QR ordering για καφέ, bars, εστιατόρια και beach bars.",
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
