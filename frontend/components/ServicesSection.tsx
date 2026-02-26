"use client"

import { ServicesArrayType } from "@/lib/types"
import { ArrowRight, Fan, Flame, Sun, Wind } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const services: ServicesArrayType = [
    {
        icon: Flame,
        title: 'Pompy Ciepła',
        description: 'Nowoczesne pompy ciepła powietrze-woda i gruntowe. Ogrzewanie, chłodzenie i przygotowanie ciepłej wody użytkowej w jednym urządzeniu.',
        image: '/images/hero-background.jpg',
        features: ["Oszczędność do 75% kosztów ogrzewania", "Dotacje rządowe", "Ciche działanie"],
        href: '/uslugi/pompy-ciepla'
    },
    {
        icon: Wind,
        title: 'Klimatyzacja',
        description: 'Profesjonalny montaż klimatyzacji domowej i przemysłowej. Systemy split i multi-split od najlepszych producentów.',
        image: '/images/service-ac.jpg',
        features: ["Systemy inwerterowe", "Montaż i serwis", "Gwarancja producenta"],
        href: '/uslugi/klimatyzacja'
    },
    {
        icon: Fan,
        title: 'Rekuperacja',
        description: 'Wentylacja mechaniczna z odzyskiem ciepła. Czyste powietrze i niskie rachunki za ogrzewanie przez cały rok.',
        image: '/images/service-ventilation.jpg',
        features: ["Odzysk ciepła do 95%", "Filtracja powietrza", "Eliminacja wilgoci"],
        href: '/uslugi/rekuperacja'
    },
    {
        icon: Sun,
        title: 'Fotowoltaika',
        description: 'Instalacje fotowoltaiczne dopasowane do Twoich potrzeb. Produkuj własną energię i uniezależnij sie od rosnących cen prądu.',
        image: '/images/service-solar.jpg',
        features: ["Darmowa energia ze słonca", "Zwrot inwestycji w 6-8 lat", "25 lat gwarancji"],
        href: '/uslugi/fotowoltaika'
    }
]

export default function ServicesSection() {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    return(
        <section id="uslugi" className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <div className="mb-16 max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Nasze usługi</p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Kompleksowe rozwiązania dla twojego komfortu
                    </h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Od pomp ciepła po fotowoltaikę - zapewniamy pełną obsługę od projektu po serwis.
                    </p>
                </div>

                {/* Tabs subsection */}
                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Tabs */}
                    <div className="flex flex-row gap-2 overflow-x-auto lg:col-span-2 lg:flex-col lg:gap-3">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            const isActive = activeIndex === index
                            return (
                                <button
                                    key={service.title}
                                    type="button"
                                    onClick={() => setActiveIndex(index)}
                                    className={`flex min-w-[160px] items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all lg:min-w-0 ${
                                        isActive
                                        ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                                        : 'border-border bg-card text-foreground hover:border-primary/30 hover:bg-muted'
                                    }`}
                                >
                                    <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-primary'}`}/>
                                    <span className="text-sm font-semibold">{service.title}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Active service details */}
                    <div className="lg:col-span-3">
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
                                    {services[activeIndex].features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                                                <ArrowRight className="h-3 w-3" />
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                <a
                                    href={services[activeIndex].href ? services[activeIndex].href : '#kontakt'}
                                    className='inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80'
                                >
                                    Dowiedz się więcej
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
