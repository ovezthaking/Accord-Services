import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";


const __inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const __spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accord Service - Pompy Ciepla, Klimatyzacja, Rekuperacja, Fotowoltaika | Opole",
  description: "Accord Service - od 1984 roku dostarczamy profesjonalne rozwiazania w zakresie pomp ciepla, klimatyzacji, rekuperacji i fotowoltaiki w Opolu i okolicach.",
};

export const viewport = {
  themeColor: '#0047CC',
}

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
        {children}
      </body>
    </html>
  );
}
