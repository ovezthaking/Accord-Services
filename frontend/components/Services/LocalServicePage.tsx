import Link from "next/link";
import { Button } from "../ui/button";
import { LocalServicePageProps } from "./types";
import RealizationsGrid from "../Realizations/RealizationsGrid";

export default function LocalServicePage({
     city, citySlug, service, serviceKey,
     serviceLabel, serviceDeclination
    }: LocalServicePageProps) {
    return (
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
                    Każdą instalację dobieramy indywidualnoe - tak, aby była opłacalna i bezproblemowa 
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
                <RealizationsGrid citySlug={citySlug} service={serviceKey} />
            </section>
        </main>
    )
}