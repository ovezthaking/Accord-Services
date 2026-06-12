import type { MetadataRoute } from 'next'
import { CITIES, SERVICES } from '@/lib/localPages'

const BASE_URL = 'https://www.accord.opole.pl'

const SERVICE_SLUGS: Record<string, string> = {
    'pompy-ciepla': 'pompy-ciepla',
    'klimatyzacja': 'klimatyzacja',
    'rekuperacja': 'rekuperacja',
    'fotowoltaika': 'fotowoltaika',
}

export default function sitemap(): MetadataRoute.Sitemap {
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

    const localPages: MetadataRoute.Sitemap = SERVICES.flatMap((service) =>
        CITIES.map((city) => ({
            url: `${BASE_URL}/uslugi/${service}/${city.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    )

    return [...staticPages, ...localPages]
}