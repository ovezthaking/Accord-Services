import Link from "next/link";
import { Button } from "../ui/button";
import { LocalServicePageProps } from "./types";
import RealizationsGrid from "../Realizations/RealizationsGrid";
import Script from "next/script";

const BASE_URL = "https://www.accord.opole.pl"

export default function LocalServicePage({
     city, citySlug, service, serviceKey,
     serviceLabel, serviceDeclination
}: LocalServicePageProps) {
    const servicePageUrl = `${BASE_URL}/uslugi/${service}`
    const localPageUrl = `${BASE_URL}/uslugi/${service}/${citySlug}`

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Strona główna",
                item: BASE_URL,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: serviceLabel,
                item: servicePageUrl,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: `${serviceLabel} ${city}`,
                item: localPageUrl,
            },
        ],
    }

    const localServiceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${serviceLabel} ${city}`,
        description: `Profesjonalny montaż ${serviceDeclination.toLowerCase()} w miejscowości ${city} i okolicach. Ponad 40 lat doświadczenia. Bezpłatna wycena.`,
        provider: {
            "@type": "HVACBusiness",
            name: "F.U.H. Accord Service",
            url: BASE_URL,
            telephone: "+48601475547",
            address: {
                "@type": "PostalAddress",
                streetAddress: "ul. Opolska 27",
                addressLocality: "Masów",
                postalCode: "46-024",
                addressCountry: "PL",
            },
        },
        areaServed: {
            "@type": "City",
            name: city,
        },
        url: localPageUrl,
    }

    return (
        <>
            <Script
                id={`breadcrumb-local-${service}-${citySlug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                strategy="afterInteractive"
            />
            <Script
                id={`local-service-schema-${service}-${citySlug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }}
                strategy="afterInteractive"
            />

            <main className="bg-background">
                <section className="mx-auto max-w-7xl px-6 pb-8 pt-24 md:pt-28">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                        {serviceLabel} · {city}
                    </p>
                    <h1 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                        {serviceLabel} {city}
                    </h1>
                    <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        Montujemy {serviceDeclination.toLowerCase()} w miejscowości {city} i okolicach. 
                        Każdą instalację dobieramy indywidualnie - tak, aby była opłacalna i bezproblemowa 
                        przez lata.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild size='lg' className="bg-accent text-accent-foreground hover:bg-accent/90" >
                            <Link href='/#kontakt'>Umów bezpłatną wycenę</Link>
                        </Button>
                        <Button asChild size='lg' variant='outline'>
                            <Link href={`/uslugi/${service}`}>Więcej o usłudze</Link>
                        </Button>
                    </div>
                </section>

                {/* realizacje z tego miasta */}
                <section className="mx-auto max-w-7xl px-6 py-16">
                    <h2 className="mb-8 text-2xl font-bold text-foreground">
                        Nasze realizacje w miejscowości {city}
                    </h2>
                    <RealizationsGrid citySlug={citySlug} />
                </section>
            </main>
        </>
    )
}