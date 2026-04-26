"use client"

import { ServicesArrayType } from "@/lib/types"
import { ArrowRight, Fan, Flame, Sun, Wind } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn } from "./fx/FadeIn"

const services: ServicesArrayType = [
    {
        icon: Flame,
        title: 'Pompy Ciepła',
        description: 'Ogrzewanie, chłodzenie i ciepła woda w jednym systemie.',
        image: '/images/hero-background.jpg',
        features: ["Oszczędność nawet do 70% rocznie", "Dotacje rządowe", "Koszt: od 25 000 zł z montażem"],
        href: '/uslugi/pompy-ciepla'
    },
    {
        icon: Wind,
        title: 'Klimatyzacja',
        description: 'Komfort latem i dogrzewanie zimą. Systemy domowe i przemysłowe.',
        image: '/images/service-ac.jpg',
        features: ["Szybki montaż", "5 lat gwarancji", "Sterowanie z telefonu", "Koszt: od 3 500 zł"],
        href: '/uslugi/klimatyzacja'
    },
    {
        icon: Fan,
        title: 'Rekuperacja',
        description: 'Stały dopływ świeżego powietrza bez strat ciepła',
        image: '/images/service-ventilation.jpg',
        features: ["Niższe rachunki za ogrzewanie", "Odzysk ciepła do 95%", "Filtracja powietrza", "Eliminacja wilgoci"],
        href: '/uslugi/rekuperacja'
    },
    {
        icon: Sun,
        title: 'Fotowoltaika',
        description: 'Instalacje fotowoltaiczne dopasowane do Twoich potrzeb. Produkuj własną energię i uniezależnij sie od rosnących cen prądu.',
        image: '/images/service-solar.jpg',
        features: ["Niezależność energetyczna", "Niższe rachunki", "Zasilanie awaryjne", "Dotacje i ulgi"],
        href: '/uslugi/fotowoltaika'
    }
]

export default function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    return(
        <section id="uslugi" className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <FadeIn className="mb-16 max-w-2xl" direction="up" delay={60}>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Nasze usługi</p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Intalacje, które realnie obniżają koszty
                    </h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Dobieramy rozwiązanie do Twojego domu, budżetu i sposobu użytkowania.
                    </p>
                </FadeIn>

                {/* Tabs subsection */}
                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Tabs */}
                    <div className="flex flex-row gap-2 overflow-x-auto lg:col-span-2 lg:flex-col lg:gap-3">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            const isActive = activeIndex === index
                            return (
                                <FadeIn key={service.title} direction="right" delay={index * 90}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={`flex min-w-[160px] w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all lg:min-w-0 ${
                                            isActive
                                            ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                                            : 'border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted'
                                        }`}
                                    >
                                        <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-primary'}`}/>
                                        <span className="text-sm font-semibold">{service.title}</span>
                                    </button>
                                </FadeIn>
                            )
                        })}
                    </div>

                    {/* Active service details */}
                    <div className="lg:col-span-3">
                        <FadeIn direction="left" delay={180}>
                            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                            <div className="relative h-56 overflow-hidden md:h-72">
                                <Image
                                    src={services[activeIndex].image || '/placeholder.svg'}
                                    alt={services[activeIndex].title}
                                    width={4000}
                                    height={4000}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-foreground/20" />
                            </div>
                            <div className="p-6 md:p-8">
                                <h3 className="mb-3 text-2xl font-bold text-foreground">{services[activeIndex].title}</h3>
                                <p className="mb-6 leading-relaxed text-muted-foreground">{services[activeIndex].description}</p>
                                <ul className="mb-6 flex flex-col gap-2">
                                    {services[activeIndex].features.map((feature, index) => (
                                        <FadeIn key={feature} direction="up" delay={120 + index * 60} duration={450}>
                                            <li className="flex items-center gap-3 text-sm text-foreground">
                                                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                                                    <ArrowRight className="h-3 w-3" />
                                                </span>
                                                {feature}
                                            </li>
                                        </FadeIn>
                                    ))}
                                </ul>
                                
                                <Link
                                    href={services[activeIndex].href ? services[activeIndex].href : '#kontakt'}
                                    className='inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80'
                                >
                                    Dowiedz się więcej
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}
