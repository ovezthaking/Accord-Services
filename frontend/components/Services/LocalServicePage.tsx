import Link from "next/link";
import { Button } from "../ui/button";
import { LocalServicePageProps } from "./types";

export default function LocalServicePage({
     city, citySlug, service, serviceKey,
     serviceLabel, serviceDeclination
    }: LocalServicePageProps) {
    return (
        <main className="bg-background">
            <section>
                <p>
                    {serviceLabel} · {city}
                </p>
                <h1>
                    {serviceLabel} {city}
                </h1>
                <p>
                    Montujemy {serviceDeclination.toLowerCase()} w miejscowości {city} i okolicach. 
                    Każdą instalację dobieramy indywidualnoe - tak, aby była opłacalna i bezproblemowa 
                    przez lata.
                </p>
                <div>
                    <Button asChild size='lg' >
                        <Link href='/#kontakt'>Umów bezpłatną wycenę</Link>
                    </Button>
                    <Button asChild size='lg' variant='outline'>
                        <Link href={`/uslugi/${service}`}>Więcej o usłudze</Link>
                    </Button>
                </div>
            </section>

            {/* realizacje z tego miasta */}
            <section>
                <h2>
                    Nasze realizacje w miejscowości {city}
                </h2>
                {/* realizationgrid */}
            </section>
        </main>
    )
}