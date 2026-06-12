export const SERVICE_MAP: Record<string, string> = {
    'pompy-ciepla': 'pompy',
    'klimatyzacja': 'klimatyzacja',
    'rekuperacja': 'rekuperacja',
    'fotowoltaika': 'fotowoltaika'
}

export const SERVICE_LABELS: Record<string, string> = {
    'pompy': 'Pompy Ciepła',
    'klimatyzacja': 'Klimatyzacja',
    'rekuperacja': 'Rekuperacja',
    'fotowoltaika': 'Fotowoltaika'
}

export const SERVICE_DELCINATIONS: Record<string, string> = {
    'pompy': 'Pompy Ciepła',
    'klimatyzacja': 'Klimatyzację',
    'rekuperacja': 'Rekuperację',
    'fotowoltaika': 'Fotowoltaikę'
}

export const CITIES: Array<{name: string, slug: string}> = [
    { name: 'Opole', slug: 'opole' },
    { name: 'Ozimek', slug: 'ozimek' },
    { name: 'Kluczbork', slug: 'kluczbork' },
    { name: 'Oleśno', slug: 'olesno' },
    { name: 'Krapkowice', slug: 'krapkowice' },
    { name: 'Strzelce Opolskie', slug: 'strzelce-opolskie' },
    { name: 'Namysłów', slug: 'namyslow' },
    { name: 'Prudnik', slug: 'prudnik' },
    { name: 'Nysa', slug: 'nysa' },
    { name: 'Brzeg', slug: 'brzeg' }
]

export const SERVICES = Object.keys(SERVICE_MAP)
