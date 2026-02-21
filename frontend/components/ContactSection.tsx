"use client"

import { contactInfoType } from "@/lib/types";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";


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
        value: "Masów, woj. opolskie",
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
        <section id="#kontakt" className="bg-muted">
            <div>
                <div>
                    <p>Kontakt</p>
                    <h2>
                        Porozmawiajmy o twoim projekcie
                    </h2>
                    <p>
                        Skontaktuj się z nami, aby uzyskać 
                        bezpłatną wycenę lub umówic się na 
                        bezpłatną konsultację
                    </p>
                </div>

                <div>
                    {/* Info */}
                    <div>
                        <div>
                            {contactInfo.map(item => {
                                const Icon = item.icon
                                const Wrapper = item.href ? 'a' : 'div'
                                return (
                                    <Wrapper
                                        key={item.label}
                                        {...(item.href ? { href: item.href } : {})}
                                    >
                                        <div>
                                            <Icon />
                                        </div>
                                        <div>
                                            <p>{item.label}</p>
                                            <p>{item.value}</p>
                                        </div>
                                    </Wrapper>
                                )
                            })}
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <h3>Wyślij zapytanie</h3>
                            <div>
                                <div className="space-y-2">
                                   <Label htmlFor="name" className="text-foreground">Imię i nazwisko</Label>
                                   <Input id="name" placeholder="Jan Kowalski" className="bg-background text-foreground" />
                                </div>
                                <div className="space-y-2">
                                   <Label htmlFor="phone" className="text-foreground">Telefon</Label>
                                   <Input id="phone" type="tel" placeholder="601 234 567" className="bg-background text-foreground" />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                   <Label htmlFor="email" className="text-foreground">E-mail</Label>
                                   <Input id="email" type="email" placeholder="jan@email.com" className="bg-background text-foreground" />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                   <Label htmlFor="service" className="text-foreground">Usługa</Label>
                                   <select
                                        id="service"
                                        defaultValue=''
                                    >
                                        <option value='' disabled>Wybierz usługę...</option>
                                        <option value="pompy">Pompy ciepła</option>
                                        <option value="klimatyzacja">Klimatyzacja</option>
                                        <option value="rekuperacja">Rekuperacja</option>
                                        <option value="fotowoltaika">Fotowoltaika</option>
                                        <option value="serwis">Serwis</option>
                                   </select>
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                   <Label htmlFor="name" className="text-foreground">Wiadomość</Label>
                                   <Textarea id="message" placeholder="Opisz swoje potrzeby..." rows={4} className="bg-background text-foreground" />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                size='lg'
                                className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                            >
                                <Send className="mr-2 h-4 w-4" />
                                Wyślij wiadomość
                            </Button>
                            <p className="mt-3 text-center text-xs text-muted-foreground">
                                Odpowiadamy w ciągu 24 godzin.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}