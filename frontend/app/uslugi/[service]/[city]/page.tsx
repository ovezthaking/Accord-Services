import LocalServicePage from "@/components/Services/LocalServicePage";
import { CITIES, SERVICE_DELCINATIONS, SERVICE_LABELS, SERVICE_MAP, SERVICES } from "@/lib/localPages";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = true

export const revalidate = 86400

type Props = {
    params: Promise<{ service: string; city: string }>
}

export const getCityFromAPI = async (citySlug: string): Promise<string | null> => {
    try {
        const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(
            `${backendUrl}/api/realizations/?city_slug=${citySlug}&limit=1`,
            { next: { revalidate: 86400 } }
        )
        if (!res.ok) return null
        const data = await res.json()
        return data[0]?.city ?? null
    } catch (err) {
        console.error("Błąd pobierania miasta z API: ", err)
        return null
    }
}

export async function generateStaticParams() {
    return SERVICES.flatMap(service => 
        CITIES.map(city => ({ service, city: city.slug }))
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { service, city: citySlug } = await params
    
    const serviceKey = SERVICE_MAP[service]
    if (!serviceKey) return {}

    const cityObj = CITIES.find(c => c.slug === citySlug)
    const cityName = cityObj?.name ?? await getCityFromAPI(citySlug)

    if (!cityName) return {}

    const serviceLabel = SERVICE_LABELS[serviceKey]

    return {
        title: `${serviceLabel} ${cityName} - montaż i serwis | Accord Service`,
        description: `Profesjonalny montaż - ${serviceLabel.toLowerCase()} - w miejscowości ${cityName} i okolicach. Ponad 40 lat doświadczenia. Bezpłatna wycena.`,
    }
}

export default async function LocalPage({ params }: Props) {
    const { service: serviceSlug, city: citySlug } = await params

    const serviceKey = SERVICE_MAP[serviceSlug]

    if (!serviceKey) notFound()

    const cityObj = CITIES.find(c => c.slug === citySlug)
    const cityName = cityObj?.name ?? await getCityFromAPI(citySlug)

    if (!cityName) notFound()

    return (
        <LocalServicePage 
            city={cityName}
            citySlug={citySlug}
            service={serviceSlug}
            serviceKey={serviceKey}
            serviceLabel={SERVICE_LABELS[serviceKey]}
            serviceDeclination={SERVICE_DELCINATIONS[serviceKey]}
        />
    )
}