"use client"

import { contactInfoType } from "@/lib/types";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import ContactForm from "./ContactForm";


const contactInfo: contactInfoType = [
    {
        icon: Phone,
        label: "Telefon",
        value: "601 47 55 47",
        href: "tel:601475547",
    },
    {
        icon: Mail,
        label: "E-mail",
        value: "accordservice@interia.pl",
        href: "mailto:accordservice@interia.pl",
    },
    {
        icon: MapPin,
        label: "Adres",
        value: "ul. Opolska 27, 46-024 Masów, woj. opolskie",
        href: 'https://www.google.com/maps?newwindow=1&sca_esv=955d8677a95466f9&sxsrf=ANbL-n6nK7msBScC2S7aEwPKnQnVwR15Mw:1771695310547&si=AL3DRZGNtcdgKOqVhotcr-UG2kkYpwR2WO4qu3O00NmpwBmLnQK4IuiWlflH0mVqNJbs2sAJzylyt8IevYrYHZ5kbzmDPXt0N2hV7xzkCONId9lswyex8_BDGUY5bl57VGJy7Ecvg3qzirUomgAdHSUUNRHQrKvyHWpUlB_1bOhxW5A37PyZLkxA64y_QgPgAG_F22xe4GxW&biw=1272&bih=554&dpr=1.5&um=1&ie=UTF-8&fb=1&gl=pl&sa=X&geocode=KT-1-av4TeuAMd6B_g8YJOq4&daddr=Opolska+27,+46-024+Mas%C3%B3w',
    },
    {
        icon: Clock,
        label: "Godziny pracy",
        value: "Pon-Pt: 8:00 - 17:00",
        href: undefined,
    },
]

export default function ContactSection() {
    return (
        <section id="#kontakt" className="bg-muted py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Kontakt</p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Porozmawiajmy o twoim projekcie
                    </h2>
                    <p className="mx-auto max-w-lg text-lg leading-relaxed text-muted-foreground">
                        Skontaktuj się z nami, aby uzyskać 
                        bezpłatną wycenę lub umówic się na 
                        bezpłatną konsultację
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Info */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {contactInfo.map(item => {
                                const Icon = item.icon
                                const Wrapper = item.href ? 'a' : 'div'
                                return (
                                    <Wrapper
                                        key={item.label}
                                        {...(item.href ? { href: item.href, target: '_blank' } : {})}
                                        className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                                    >
                                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                                            <p className="mt-1 font-medium text-foreground">{item.value}</p>
                                        </div>
                                    </Wrapper>
                                )
                            })}
                            <div className="flex h-[180px] items-start rounded-xl border border-border bg-card p-0 transition-colors hover:border-primary/30">
                                <iframe className="w-full h-full rounded-xl" src="https://maps.google.com/maps?width=400&height=200&hl=en&q=Accord%20service&t=&z=9&ie=UTF8&iwloc=B&output=embed">
                                </iframe>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}