import Image from "next/image";
import { navLinks } from "@/lib/navLinks";
import type { LinksArrayType } from "@/lib/types";
import { Mail, MapPin, Phone } from "lucide-react";


const serviceLinks: LinksArrayType = [
    { label: "Pompy ciepła", href: "#uslugi" },
    { label: "Klimatyzacja", href: "#uslugi" },
    { label: "Rekuperacja", href: "#uslugi" },
    { label: "Fotowoltaika", href: "#uslugi" },
    { label: "Serwis", href: "#kontakt" },
]

export default function Footer() {
    return (
        <footer className="bg-foreground text-card">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand section */}
                    <div className="lg:col-span-1">
                        <Image
                            src='/images/logo-transparent.png'
                            alt="Accord Service - logo"
                            width={700}
                            height={700}
                            className="mb-4 h-10 w-auto brightness-200 rounded-xl bg-white shadow-md shadow-blue-900"
                        />
                        <p className="text-sm leading-relaxed text-card/60">
                            Profesjonalne rozwiązania grzewcze, klimatyzacyjne i fotowoltaiczne od 1984 roku
                        </p>
                    </div>

                    {/* Services section */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card/40">Usługi</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-card/70 transition-colors hover:text-card"> 
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nav links section */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card/40">Accord Service</h4>
                        <ul className="space-y-3">
                            {navLinks.map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-card/70 transition-colors hover:text-card">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact section */}
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-card/40">Kontakt</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="tel:601475547" className="flex items-center gap-3 text-sm text-card/70 transition-colors hover:text-card">
                                    <Phone className="h-4 w-4 text-accent"/>
                                    601 47 55 47
                                </a>
                            </li>
                            <li>
                                <a href="mailto:accordservice@interia.pl" className="flex items-center gap-3 text-sm text-card/70 transition-colors hover:text-card">
                                    <Mail className="h-4 w-4 text-accent"/>
                                    accordservice@interia.pl
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://share.google/9emUNr7ADPnOUdc4r" className="flex items-center gap-3 text-sm text-card/70 transition-colors hover:text-card">
                                    <MapPin className="h-4 w-4 text-accent"/>
                                    Masów, woj. opolskie
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Bottom bar */}
            <div className="border-t border-card/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
                    <p className="text-xs text-card/40">
                        {"\u00A9"} {new Date().getFullYear()} Accord Services. Wszelkie prawa zastrzeżone.
                    </p>
                    <p className="text-xs text-card/40">F.U.H. Accord Service - Rok założenia 1984</p>
                </div>
            </div>
        </footer>
    )
}