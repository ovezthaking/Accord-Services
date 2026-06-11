import LocalServicePage from "@/components/Services/LocalServicePage";
import { CITIES, SERVICE_DELCINATIONS, SERVICE_LABELS, SERVICE_MAP, SERVICES } from "@/lib/localPages";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { service: string; city: string }
}

export async function generateStaticParams() {
    return SERVICES.flatMap(service => 
        CITIES.map(city => ({ service, city: city.slug }))
    )
}

export async function generateMetadata({ params }:Props): Promise<Metadata> {
    const cityObj = CITIES.find(c => c.slug === params.city)
    const serviceKey = SERVICE_MAP[params.service]

    if (!cityObj || !serviceKey) return {}

    const serviceLabel = SERVICE_LABELS[serviceKey]

    return {
        title: `${serviceLabel} ${cityObj.name} - montaż i serwis | Accord Service`,
        description: `Profesjonalny montaż - ${serviceLabel.toLowerCase()} - w miejscowości ${cityObj.name} i okolicach. Ponad 40 lat doświadczenia. Bezpłatna wycena.`,
    }
}

export default function LocalPage({ params }: Props) {
    const cityObj = CITIES.find(c => c.slug === params.city)
    const serviceKey = SERVICE_MAP[params.service]

    if (!cityObj || !serviceKey) notFound()

    return (
        <LocalServicePage 
            city={cityObj.name}
            citySlug={params.city}
            service={params.service}
            serviceKey={serviceKey}
            serviceLabel={SERVICE_LABELS[serviceKey]}
            serviceDeclination={SERVICE_DELCINATIONS[serviceKey]}
        />
    )
}
