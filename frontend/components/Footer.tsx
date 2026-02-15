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
            <div>
                <div>
                    {/* Brand section */}
                    <div className="lg:col-span-1">
                        <Image
                            src='/images/logo-transparent.png'
                            alt="Accord Service - logo"
                            width={700}
                            height={700}
                            className="mb-4 h-10 w-auto brightness-200"
                        />
                        <p className="text-sm leading-relaxed text-card/60">
                            Profesjonalne rozwiązania grzewcze, klimatyzacyjne i fotowoltaiczne od 1984 roku
                        </p>
                    </div>

                    {/* Services section */}
                    <div>
                        <h4>Usługi</h4>
                        <ul>
                            {serviceLinks.map(link => (
                                <li key={link.label}>
                                    <a href={link.href}> 
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Nav links section */}
                    <div>
                        <h4>F.U.H Accord Service</h4>
                        <ul>
                            {navLinks.map(link => (
                                <li key={link.label}>
                                    <a href={link.href}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact section */}
                    <div>
                        <h4>Kontakt</h4>
                        <ul>
                            <li>
                                <a href="tel:601475547">
                                    <Phone />
                                    601 47 55 47
                                </a>
                            </li>
                            <li>
                                <a href="mailto:accordservice@interia.pl">
                                    <Mail />
                                    accordservice@interia.pl
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://share.google/9emUNr7ADPnOUdc4r">
                                    <MapPin />
                                    Masów, woj. opolskie
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            
        </footer>
    )
}