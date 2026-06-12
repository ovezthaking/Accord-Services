import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ScrollingServices from "@/components/ScrollingServices";
import ServicesSection from "@/components/ServicesSection";
import { Metadata } from "next";
import Script from "next/script";

const BASE_URL = "https://www.accord.opole.pl"
 
export const metadata: Metadata = {
    alternates: {
        canonical: BASE_URL,
    },
    openGraph: {
        url: BASE_URL,
    },
}
 
// WebSite schema — umożliwia Google pokazanie searchbox w wynikach
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Accord Service",
    url: BASE_URL,
}
 
// BreadcrumbList dla strony głównej
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: BASE_URL,
        },
    ],
}

export default function Home() {
  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="breadcrumb-home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />


      <main className="overflow-x-hidden">
        <HeroSection />
        <ScrollingServices />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </>
  );
}
