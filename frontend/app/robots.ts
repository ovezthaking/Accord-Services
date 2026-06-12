import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/qr',
                    '/admin/',
                    '/static/',
                    '/media/',
                    '/api/',
                ],
            },
        ],
        sitemap: 'https://www.accord.opole.pl/sitemap.xml',
        host: 'https://www.accord.opole.pl',
    }
}
