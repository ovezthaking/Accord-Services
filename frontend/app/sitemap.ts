import type { MetadataRoute } from 'next'
import { CITIES, SERVICES } from '@/lib/localPages'

const BASE_URL = 'https://www.accord.opole.pl'
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

type RealizationFromAPI = {
    city_slug: string
    service: string
}

async function getDynamicLocalPages(): Promise<{ service: string; citySlug: string }[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/api/realizations/`, {
            next: { revalidate: 86400 }, // odświeżaj raz dziennie
        })

        if (!res.ok) return []

        const data: RealizationFromAPI[] = await res.json()

        const hardcodedCitySlugs = new Set(CITIES.map((c) => c.slug))

        const serviceKeyToSlug: Record<string, string> = {
            pompy: 'pompy-ciepla',
            klimatyzacja: 'klimatyzacja',
            rekuperacja: 'rekuperacja',
            fotowoltaika: 'fotowoltaika',
        }

        const seen = new Set<string>()
        const result: { service: string; citySlug: string }[] = []

        for (const item of data) {
            const serviceSlug = serviceKeyToSlug[item.service]
            if (!serviceSlug) continue

            if (hardcodedCitySlugs.has(item.city_slug)) continue

            const key = `${serviceSlug}::${item.city_slug}`
            if (seen.has(key)) continue

            seen.add(key)
            result.push({ service: serviceSlug, citySlug: item.city_slug })
        }

        return result
    } catch (err) {
        console.error('[sitemap] Błąd pobierania realizacji z API:', err)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/uslugi/pompy-ciepla`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/uslugi/klimatyzacja`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/uslugi/rekuperacja`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/uslugi/fotowoltaika`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
    ]

    const hardcodedLocalPages: MetadataRoute.Sitemap = SERVICES.flatMap((service) =>
        CITIES.map((city) => ({
            url: `${BASE_URL}/uslugi/${service}/${city.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    )

    const dynamicPairs = await getDynamicLocalPages()
    const dynamicLocalPages: MetadataRoute.Sitemap = dynamicPairs.map(({ service, citySlug }) => ({
        url: `${BASE_URL}/uslugi/${service}/${citySlug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticPages, ...hardcodedLocalPages, ...dynamicLocalPages]
}