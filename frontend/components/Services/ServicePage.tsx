import PhotoGallery from "./PhotoGallery";
import { servicePageProps } from "./types";
import Link from "next/link";
import { Button } from "../ui/button";
import { FadeIn } from "../fx/FadeIn";
import Script from "next/script";

const BASE_URL = "https://www.accord.opole.pl"
 
const SERVICE_LABELS: Record<string, string> = {
    pompy: "Pompy ciepła",
    klimatyzacja: "Klimatyzacja",
    rekuperacja: "Rekuperacja",
    fotowoltaika: "Fotowoltaika",
    serwis: "Serwis",
}
 
const SERVICE_SLUGS: Record<string, string> = {
    pompy: "pompy-ciepla",
    klimatyzacja: "klimatyzacja",
    rekuperacja: "rekuperacja",
    fotowoltaika: "fotowoltaika",
    serwis: "serwis",
}

export default function ServicePage({title, description, images, service, children}: servicePageProps) {
    const serviceLabel = service ? SERVICE_LABELS[service] ?? title : title
    const serviceSlug = service ? SERVICE_SLUGS[service] : null
    const pageUrl = serviceSlug ? `${BASE_URL}/uslugi/${serviceSlug}` : BASE_URL

    const serviceSchema = service
        ? {
              "@context": "https://schema.org",
              "@type": "Service",
              name: serviceLabel,
              description: description ?? `Profesjonalny montaż i serwis – ${serviceLabel} – w Opolu i woj. opolskim.`,
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
                  "@type": "State",
                  name: "województwo opolskie",
              },
              url: pageUrl,
          }
        : null
 
    // Schema.org BreadcrumbList
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
                item: pageUrl,
            },
        ],
    }


    return (
        <>
            {serviceSchema && (
                <Script
                    id={`service-schema-${service}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
                    strategy="afterInteractive"
                />
            )}
            <Script
                id={`breadcrumb-schema-${service ?? "service"}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                strategy="afterInteractive"
            />

        
            <main className="bg-background">
                <section className="mx-auto max-w-7xl px-6 pb-8 pt-24 md:pt-28">
                    <FadeIn className="max-w-3xl" direction="up" delay={40}>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Nasza usługa</p>
                        <h1 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
                        {description && <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{description}</p>}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href="/#kontakt">Umów bezpłatną wycenę</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/#uslugi">Zobacz wszystkie usługi</Link>
                            </Button>
                        </div>
                    </FadeIn>
                </section>

                {children && (
                    <section className="mx-auto max-w-7xl px-6 pb-12 mt-10">
                        <FadeIn direction="up" delay={70}>
                            <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">
                                <div className="prose prose-zinc max-w-none dark:prose-invert">{children}</div>
                            </div>
                        </FadeIn>
                    </section>
                )}

                {(images || service) && (
                    <FadeIn direction="up" delay={90}>
                        <PhotoGallery service={service} images={images} />
                    </FadeIn>
                )}
            </main>
        </>
    )
}