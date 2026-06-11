'use client'

import { useEffect, useState, useRef } from "react"
import { Realization, RealizationsGridProps } from "./type"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SERVICE_TO_SLUG: Record<string, string> = {
    'pompy': 'pompy-ciepla',
    'klimatyzacja': 'klimatyzacja',
    'rekuperacja': 'rekuperacja',
    'fotowoltaika': 'fotowoltaika'
}

export default function RealizationsCarousel({ citySlug, service, limit }: RealizationsGridProps) {
    const [items, setItems] = useState<Realization[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const params = new URLSearchParams()
        if (citySlug) params.set('city_slug', citySlug)
        if (service) params.set('service', service)

        fetch(`/api/realizations/?${params}`)
            .then(r => r.json())
            .then(data => {
                setItems(limit ? data.slice(0, limit) : data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [citySlug, service, limit])

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current
            const scrollAmount = clientWidth * 0.8 
            const scrollTo = direction === 'left' 
                ? scrollLeft - scrollAmount 
                : scrollLeft + scrollAmount
            
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

    if (loading) {
        return (
            <div className="w-full px-4 py-8">
                <div className="mb-8 h-20 w-64 animate-pulse rounded-lg bg-muted" />
                <div className="flex gap-6 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-80 w-[85%] flex-shrink-0 animate-pulse rounded-2xl bg-muted sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]" />
                    ))}
                </div>
            </div>
        )
    }

    if (!items.length) return null

    return (
        <div className="relative w-full overflow-hidden px-4 py-8">
            {/* Header sekcji */}
            <div className="mb-8 flex items-end justify-between px-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Nasze Realizacje</h2>
                    <p className="mt-2 text-muted-foreground">Zobacz ostatnie montaże u naszych klientów.</p>
                </div>
                
                {/* Przyciski nawigacji */}
                <div className="hidden gap-2 sm:flex">
                    <button 
                        onClick={() => scroll('left')}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all hover:bg-accent hover:text-primary"
                        aria-label="Poprzednie"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all hover:bg-accent hover:text-primary"
                        aria-label="Następne"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Kontener scrollowalny */}
            <div 
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/uslugi/${SERVICE_TO_SLUG[item.service] || 'realizacje'}/${item.city_slug}`}
                        className="w-[85%] flex-shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                        <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
                            {/* Obrazek */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={item.cover_image_url}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="flex items-center gap-1 text-xs font-medium">
                                        <MapPin className="h-3 w-3" />
                                        {item.city}
                                    </div>
                                </div>
                            </div>

                            {/* Treść */}
                            <div className="p-5">
                                <h3 className="mb-1 text-lg font-semibold text-foreground line-clamp-1">
                                    {item.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                        {item.device_model || 'Realizacja indywidualna'}
                                    </p>
                                    {item.area_m2 && (
                                        <span className="text-xs font-medium bg-secondary px-2 py-1 rounded-md whitespace-nowrap">
                                            {item.area_m2} m²
                                        </span>
                                    )}
                                </div>
                                
                                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-primary">
                                    <span>Szczegóły realizacji</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Wskaźnik scrollowania (mobilny - opcjonalny wizualny akcent) */}
            <div className="mt-2 flex justify-center gap-1 sm:hidden">
                <div className="h-1.5 w-8 rounded-full bg-primary" />
                <div className="h-1.5 w-2 rounded-full bg-border" />
                <div className="h-1.5 w-2 rounded-full bg-border" />
            </div>
        </div>
    )
}