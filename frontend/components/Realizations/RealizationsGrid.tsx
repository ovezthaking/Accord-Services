'use client'

import { useEffect, useState } from "react"
import { Realization, RealizationsGridProps } from "./type"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin } from "lucide-react"

const SERVICE_TO_SLUG: Record<string, string> = {
    'pompy': 'pompy-ciepla',
    'klimatyzacja': 'klimatyzacja',
    'rekuperacja': 'rekuperacja',
    'fotowoltaika': 'fotowoltaika'
}

export default function RealizationsGrid({ citySlug, service, limit }: RealizationsGridProps) {
    const [items, setItems] = useState<Realization[]>([])
    const [loading, setLoading] = useState<Boolean>(true)

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

    if (loading) return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
            ))}
        </div>
    )

    if (!items.length) return (
        <p className="text-muted-foreground">Brak realizacji do wyświetlenia.</p>
    )

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: Realization) => (
                <Link
                    key={item.id}
                    href={`/uslugi/${SERVICE_TO_SLUG[item.service]}/${item.city_slug}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={item.cover_image_url}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-foreground/10" />
                    </div>
                    <div className="p-5">
                        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{item.city}</span>
                            {item.area_m2 && <span>· {item.area_m2} m<sup>2</sup></span>}
                        </div>
                        <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                        {item.device_model && (
                            <p className="text-sm text-muted-foreground">{item.device_model}</p>
                        )}
                        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                            <span>Realizacje z miejscowości {item.city}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
