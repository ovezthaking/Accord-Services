import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import Image from "next/image"

const data: servicePageProps = {
    title: 'Pompy ciepła',
    description: 'Projektujemy i montujemy nowoczesne pompy ciepła dla domów i obiektów użytkowych. Pomagamy dobrać rozwiązanie, które łączy wysoki komfort, oszczędność i niskie koszty eksploatacji.',
}

export default function HeatPumpsPage() {
    return (
        <ServicePage {...data}>
            <section className="not-prose mb-10 grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                    <p className="mb-5 leading-relaxed text-card-foreground">
                        Oferujemy kompleksową realizację inwestycji: od audytu i doboru mocy, przez montaż,
                        uruchomienie, aż po opiekę serwisową. Stawiamy na sprawdzone urządzenia i rozwiązania,
                        które zapewniają stabilną pracę instalacji przez lata.
                    </p>

                    <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                        <li>Dobór pompy do zapotrzebowania budynku</li>
                        <li>Kompletny montaż i konfiguracja systemu</li>
                        <li>Wsparcie serwisowe i optymalizacja pracy</li>
                    </ul>
                </div>

                <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-border bg-muted/30">
                    <Image
                        src="http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/AT-PA-1.png"
                        alt="Pompa ciepła powietrze-woda"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="md:object-cover object-scale-down rounded-xl"
                    />
                </div>
            </section>

            <section className="not-prose grid gap-6">
                <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
                    <Image
                        src="http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/zastosownie-pompy-ciep%C5%82a-2.png"
                        alt="Zastosowanie pompy ciepła"
                        width={900}
                        height={900}
                        className="h-auto w-full"
                    />
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
                    <Image
                        src="http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/KOSZT-1.png"
                        alt="Porównanie kosztów ogrzewania"
                        width={900}
                        height={900}
                        className="h-auto w-full"
                    />
                    <p className="mt-4 text-sm text-muted-foreground md:text-base">
                        Zużycie energii, aby otrzymać 1,0 kW wydajności grzewczej.
                    </p>
                </div>
            </section>
        </ServicePage>
    )
}