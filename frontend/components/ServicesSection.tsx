"use client"

import { ServicesArrayType } from "@/lib/types"
import { Flame, Wind } from "lucide-react"

const services: ServicesArrayType = [
    {
        icon: Flame,
        title: 'Pompy Ciepła',
        description: 'Nowoczesne pompy ciepła powietrze-woda i gruntowe. Ogrzewanie, chłodzenie i przygotowanie ciepłej wody użytkowej w jednym urządzeniu.',
        image: '/images/hero-heat-pump.jpg',
        features: ["Oszczędność do 75% kosztów ogrzewania", "Dotacje rządowe", "Ciche działanie"]
    },
    {
        icon: Wind,
        title: 'Klimatyzacja',
        description: 'Profesjonalny montaż klimatyzacji domowej i przemysłowej. Systemy split i multi-split od najlepszych producentów.',
        image: '/images/service-ac.jpg',
        features: ["Systemy inwerterowe", "Montaż i serwis", "Gwarancja producenta"]
    }
]

export default function ServicesSection() {
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
            </div>
        </section>
    )
}