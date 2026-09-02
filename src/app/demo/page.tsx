import type { Metadata } from "next";
import { DemoApp } from "@/components/demo/DemoApp";
import { demoMeta } from "@/lib/landing-content";

export const metadata: Metadata = {
  title: demoMeta.title,
  description: demoMeta.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Orderly Demo — δοκιμαστικά δεδομένα",
    description: demoMeta.description,
    locale: "el_GR",
    type: "website",
  },
};

export default function DemoPage() {
  return <DemoApp />;
}
