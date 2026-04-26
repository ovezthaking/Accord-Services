"use client"

import { Phone, Mail, X, Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { navLinks } from "@/lib/navLinks"
import Link from "next/link"

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const [callMenuOpen, setCallMenuOpen] = useState<boolean>(false)
    const desktopCallMenuRef = useRef<HTMLDivElement>(null)
    const mobileCallMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!callMenuOpen) return

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node
            const clickedDesktopMenu = desktopCallMenuRef.current?.contains(target)
            const clickedMobileMenu = mobileCallMenuRef.current?.contains(target)

            if (!clickedDesktopMenu && !clickedMobileMenu) {
                setCallMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [callMenuOpen])

    return (
        <>
            {/* small top bar */}
            <div id="top" className="bg-primary text-primary-foreground">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
                    <div className="flex items-center gap-6">
                        <a href="tel:601475547" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <Phone className="h-3.5 w-3.5" />
                            <span>601 47 55 47</span>
                        </a>
                        <a href="tel:783636363" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                            <Phone className="h-3.5 w-3.5" />
                            <span>783 636 363</span>
                        </a>
                        <a href="mailto:accordservice@interia.pl" className="hidden items-center gap-2 transition-opacity hover:opacity-80 sm:flex">
                            <Mail className="h-3.5 w-3.5" />
                            <span>accordservice@interia.pl</span>
                        </a>
                    </div>
                    <span className="hidden text-primary-foreground/70 md:block">Od 1984 roku w Opolu</span>
                </div>
            </div>

            {/* Main */}
            <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/#top" className="flex items-center gap3">
                        <Image
                            src="/images/logo-transparent.png"
                            width={1900}
                            height={700}
                            alt="Accord Service - logo"
                            className="h-16 w-auto"
                        />
                    </Link>
                    
                    {/* Desktop */}
                    <nav aria-label="Nawigacja główna" className="hidden items-center gap-1 lg:flex">
                        {navLinks.map(link =>(
                            <Link
                                key={link.label}
                                href={link.href}
                                className="rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>    
                    
                    {/* Smaller screens toggle - open nav */}
                    <div className="flex items-center gap-3">
                        <div ref={desktopCallMenuRef} className="relative hidden sm:block">
                            <Button
                                type="button"
                                className="bg-accent text-accent-foreground hover:bg-accent/90"
                                onClick={() => setCallMenuOpen(!callMenuOpen)}
                                aria-expanded={callMenuOpen}
                                aria-haspopup="true"
                            >
                                <Phone className="mr-2 h-4 w-4" />
                                Zadzwoń
                            </Button>
                            {callMenuOpen && (
                                <div className="absolute right-0 mt-2 flex w-44 flex-col overflow-hidden rounded-md border border-border bg-card shadow-lg">
                                    <a
                                        href="tel:601475547"
                                        className="px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                        onClick={() => setCallMenuOpen(false)}
                                    >
                                        601 475 547
                                    </a>
                                    <a
                                        href="tel:783636363"
                                        className="px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                        onClick={() => setCallMenuOpen(false)}
                                    >
                                        783 636 363
                                    </a>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="rounded-md p-2 text-foreground lg:hidden"
                            onClick={() => {
                                setMobileOpen(!mobileOpen)
                                setCallMenuOpen(false)
                            }}
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
                                    onClick={() => {
                                        setMobileOpen(false)
                                        setCallMenuOpen(false)
                                    }}
                                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div ref={mobileCallMenuRef} className="relative mt-2">
                                <Button
                                    type="button"
                                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                                    onClick={() => setCallMenuOpen(!callMenuOpen)}
                                    aria-expanded={callMenuOpen}
                                    aria-haspopup="true"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Zadzwoń
                                </Button>
                                {callMenuOpen && (
                                    <div className="mt-2 flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-lg">
                                        <a
                                            href="tel:601475547"
                                            className="px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                            onClick={() => {
                                                setCallMenuOpen(false)
                                                setMobileOpen(false)
                                            }}
                                        >
                                            601 475 547
                                        </a>
                                        <a
                                            href="tel:783636363"
                                            className="px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                            onClick={() => {
                                                setCallMenuOpen(false)
                                                setMobileOpen(false)
                                            }}
                                        >
                                            783 636 363
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                )}
            </header>
        </>
    )
}
