import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import Image from "next/image"

const data: servicePageProps = {
    title: 'Klimatyzacja',
    description: 'Zapewniamy kompleksową obsługę w zakresie doboru, montażu i serwisu systemów klimatyzacji pomieszczeń w biurach, sklepach oraz domach na terenie województwa opolskiego.',
    images: [
        {
            // src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89825358_889485641504483_5225617989566464_n-1536x1152.jpg',
            originalAlt: 'Czarna klimatyzacja w zielonym pokoju',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89825358_889485641504483_5225617989566464_n-1536x1152.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89825358_889485641504483_5225617989566464_n-1536x1152.jpg'
        },
        {
            // src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89706554_216104213101511_4730558412394332160_n.jpg',
            originalAlt: 'Biała klimatyzacja w zielonym pokoju',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89706554_216104213101511_4730558412394332160_n.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89706554_216104213101511_4730558412394332160_n.jpg'
        },
        {
            // src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90541294_2267920563311667_7270341100445892608_n-1536x1152.jpg',
            originalAlt: 'Biała klimatyzacja w żóltym pokoju',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90541294_2267920563311667_7270341100445892608_n-1536x1152.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90541294_2267920563311667_7270341100445892608_n-1536x1152.jpg'
        },
        {
            // src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90455992_251233462566565_1381706118882918400_n-1536x1152.jpg',
            originalAlt: 'Wysoka biała klimatyzacja na szarej ścianie',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90455992_251233462566565_1381706118882918400_n-1536x1152.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90455992_251233462566565_1381706118882918400_n-1536x1152.jpg'
        },
        {
            // src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/92490970_2876368322439342_5375790477394051072_n.jpg',
            originalAlt: 'Biała klimatyzacja obok drzwi balkonowych nad grzejnikiem w zielonym pokoju',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/92490970_2876368322439342_5375790477394051072_n.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/92490970_2876368322439342_5375790477394051072_n.jpg',
        },
        {
            // src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/91679234_266989877653145_8612664628377288704_n.jpg',
            originalAlt: 'Biała klimatyzacja w szarym pokoju',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/91679234_266989877653145_8612664628377288704_n.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/91679234_266989877653145_8612664628377288704_n.jpg',
        },
    ]
}

export default function AirConditioningPage() {
    return (
        <ServicePage {...data}>
            <section className="not-prose grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                    <p className="mb-5 leading-relaxed text-card-foreground">
                        Montaż klimatyzacji przeprowadzamy w sposób dokładny i staranny, co zapewnia długoletnie,
                        bezawaryjne działanie instalacji. Posiadamy duże doświadczenie w branży i oferujemy szeroką
                        gamę urządzeń renomowanych producentów.
                    </p>

                    <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                        <li>Dobór urządzenia do metrażu i układu pomieszczeń</li>
                        <li>Profesjonalny montaż i uruchomienie systemu</li>
                        <li>Serwis gwarancyjny i pogwarancyjny</li>
                    </ul>
                </div>

                <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-border bg-muted/30 p-4 md:min-h-[220px] md:p-8">
                    <Image
                        src="http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/loga-ac.png"
                        width={1500}
                        height={1000}
                        alt="Logo producentów klimatyzacji"
                        className="mx-auto h-auto w-full max-w-[560px]"
                    />
                </div>
            </section>
        </ServicePage>
    )
}