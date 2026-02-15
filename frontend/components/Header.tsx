"use client"

import { Phone, Mail } from "lucide-react"

export default function Header() {

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
        </>
    )
}