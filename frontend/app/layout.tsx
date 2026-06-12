import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";


const __inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const __spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const BASE_URL = "https://www.accord.opole.pl"

// export const metadata: Metadata = {
//   icons: { icon: '/images/favicon.png' },
//   title: "Accord Service - Pompy Ciepla, Klimatyzacja, Rekuperacja, Fotowoltaika | Opole",
//   description: "Accord Service - od 1984 roku dostarczamy profesjonalne rozwiazania w zakresie pomp ciepla, klimatyzacji, rekuperacji i fotowoltaiki w Opolu i okolicach.",
// };

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    icons: { icon: "/images/favicon.png" },
 
    title: {
        default: "Accord Service - Pompy Ciepła, Klimatyzacja, Rekuperacja, Fotowoltaika | Opole",
        template: "%s | Accord Service Opole",
    },
    description:
        "Accord Service – od 1984 roku dostarczamy profesjonalne rozwiązania w zakresie pomp ciepła, klimatyzacji, rekuperacji i fotowoltaiki w Opolu i okolicach. Ponad 1000 realizacji.",
 
    // --- Canonical / alternates ---
    alternates: {
        canonical: BASE_URL,
    },
 
    // --- Open Graph ---
    openGraph: {
        type: "website",
        locale: "pl_PL",
        url: BASE_URL,
        siteName: "Accord Service",
        title: "Accord Service - Pompy Ciepła, Klimatyzacja, Rekuperacja, Fotowoltaika | Opole",
        description:
            "Od 1984 roku montujemy pompy ciepła, klimatyzację, rekuperację i fotowoltaikę w Opolu i woj. opolskim. Bezpłatna wycena, ponad 1000 realizacji.",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Accord Service - profesjonalne instalacje grzewcze i klimatyzacyjne w Opolu",
            },
        ],
    },
 
    // --- Twitter / X Card ---
    twitter: {
        card: "summary_large_image",
        title: "Accord Service - Pompy Ciepła, Klimatyzacja | Opole",
        description:
            "Od 1984 roku montujemy pompy ciepła, klimatyzację, rekuperację i fotowoltaikę w Opolu i woj. opolskim.",
        images: ["/images/og-image.png"],
    },
 
    // --- Robots (domyślnie indeksuj wszystko poza wyjątkami z robots.ts) ---
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};


export const viewport = {
  themeColor: '#0047CC',
}


const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",  // bardziej precyzyjny typ niż LocalBusiness
    name: "F.U.H. Accord Service",
    alternateName: "Accord Service Opole",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo-transparent.png`,
    image: `${BASE_URL}/images/og-image.png`,
    description:
        "Profesjonalny montaż i serwis pomp ciepła, klimatyzacji, rekuperacji oraz fotowoltaiki w Opolu i woj. opolskim. Działamy od 1984 roku.",
    foundingYear: "1984",
    telephone: ["+48601475547", "+48783636363"],
    email: "accordservice@interia.pl",
    address: {
        "@type": "PostalAddress",
        streetAddress: "ul. Opolska 27",
        addressLocality: "Masów",
        postalCode: "46-024",
        addressRegion: "opolskie",
        addressCountry: "PL",
    },
    geo: {
        "@type": "GeoCoordinates",
        // współrzędne ul. Opolska 27, Masów
        latitude: 50.7093,
        longitude: 17.9567,
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            opens: "09:00",
            closes: "17:00",
        },
    ],
    areaServed: {
        "@type": "State",
        name: "województwo opolskie",
    },
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Usługi instalacyjne",
        itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pompy ciepła – montaż i serwis" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Klimatyzacja – montaż i serwis" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rekuperacja – projekt i montaż" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fotowoltaika – projekt i montaż" } },
        ],
    },
    sameAs: [
        "https://share.google/9emUNr7ADPnOUdc4r",
    ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${__inter.variable} ${__spaceGrotesk.variable} font-sans antialiased`}
      >
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          strategy="afterInteractive"
        />

        <Header />
        {children}
        <Toaster />
        <Footer />

        <GoogleAnalytics gaId="G-XCG4J88VSQ" />
      </body>
    </html>
  );
}
