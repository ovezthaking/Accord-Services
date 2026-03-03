import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import Image from "next/image"

const data: servicePageProps = {
    title: 'Rekuperacja',
    description: 'Rekuperacja w znacznym uproszczeniu oznacza odzyskiwanie ciepła. Rekuperator zawiera również filtry, które oczyszczają powietrze z różnego rodzaju zanieczyszczeń.',
    images: [
        {
            originalAlt: 'Niebieskie rury',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90618454_1048516892200273_8171670670757855232_n-1150x1536.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90618454_1048516892200273_8171670670757855232_n-1150x1536.jpg'
        },
        {
            originalAlt: 'Niebieskie i zielone rury',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/88360881_223909842087736_7210173942978314240_n.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/88360881_223909842087736_7210173942978314240_n.jpg'
        },
        {
            originalAlt: 'Narzędzia',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89841441_822465734918608_8858858278407372800_n.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89841441_822465734918608_8858858278407372800_n.jpg'
        },
    ]
}

export default function RecuperationPage() {
    return (
        <ServicePage {...data}>
            <section className="not-prose grid gap-8 md:grid-cols-2 md:items-center">
                <div className="flex flex-col justify-between gap-5 md:gap-20">
                    <div>
                        <p className="mb-4 leading-relaxed text-card-foreground">
                            Najwięcej ciepła ucieka z domu przez ściany, dach, okna, wentylację i piwnicę.
                            Ograniczenie tych strat to realna oszczędność, którą zapewnia poprawnie
                            zaprojektowany i wykonany system rekuperacji.
                        </p>
                        <p className="mb-5 leading-relaxed text-card-foreground">
                            Dzięki rekuperacji raz wytworzone ciepło jest odzyskiwane, a powietrze stale
                            filtrowane i wymieniane.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-3 text-lg font-semibold text-foreground">Rekuperacja w domu to korzyści:</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                            <li>Niższe koszty ogrzewania – nawet o 30%.</li>
                            <li>Świeże, oczyszczone z kurzu i zanieczyszczeń powietrze.</li>
                            <li>Lepszy komfort życia przez cały rok.</li>
                        </ul>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
                    <Image
                        src='http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/unnamed.jpg'
                        alt="Wizualizacja przepływu ciepła i działania rekuperacji"
                        width={900}
                        height={900}
                        className="h-auto w-full"
                    />
                </div>
            </section>
        </ServicePage>
    )
}