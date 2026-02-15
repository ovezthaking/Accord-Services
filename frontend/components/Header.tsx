"use client"

import { Phone, Mail, X, Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"


const navLinks = [
    { label: "Strona Główna", href: "#" },
    { label: "O Nas", href: "#o-nas" },
    { label: "Kontakt", href: "#kontakt" }
]

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    return (
        <>
            {/* small top bar */}
            <div className="bg-primary text-primary-foreground">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
                    <div className="flex items-center gap-6">
                        <a href="tel:601475547" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <Phone className="h-3.5 w-3.5" />
                            <span>601 47 55 47</span>
                        </a>
                        <a href="mailto:accordservice@op.pl" className="hidden items-center gap-2 transition-opacity hover:opacity-80 sm:flex">
                            <Mail className="h-3.5 w-3.5" />
                            <span>accordservice@op.pl</span>
                        </a>
                    </div>
                    <span className="hidden text-primary-foreground/70 md:block">Od 1984 roku w Opolu</span>
                </div>
            </div>

            {/* Main */}
            <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <a href="#" className="flex items-center gap3">
                        <Image
                            src="/images/logo-transparent.png"
                            width={700}
                            height={700}
                            alt="Accord Service - logo"
                            className="h-12 w-auto"
                        />
                    </a>
                    
                    {/* Desktop */}
                    <nav aria-label="Nawigacja główna" className="hidden items-center gap-1 lg:flex">
                        {navLinks.map(link =>(
                            <a
                                key={link.label}
                                href={link.href}
                                className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>    
                    
                    {/* Smaller screens toggle - open nav */}
                    <div className="flex items-center gap-3">
                        <Button asChild className="hidden bg-accent text-accent-foreground hover:bg-accent/90  sm:inline-flex">
                            <a href="tel:601475547">
                                <Phone className="mr-2 h-4 w-4"/>
                                Zadzwoń
                            </a>
                        </Button>
                        <button
                            type="button"
                            className="rounded-md p-2 text-foreground lg:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen? "Zamknij menu" : "Otwórz menu"}
                        >
                            {mobileOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                        </button>
                    </div>                
                </div>

                {/* Mobile */}
                {mobileOpen && (
                    <nav className="border-t border-border bg-card px-6 pb-6 pt-4 lg:hidden" aria-label="Nawigacja mobilna">
                        <div className="flex flex-col gap-2">
                            {navLinks.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">
                                <a href="tel:601475547">
                                    <Phone className="mr-2 h4 w-4"/>
                                    Zadzwoń teraz
                                </a>
                            </Button>
                        </div>
                    </nav>
                )}
            </header>
        </>
    )
}
