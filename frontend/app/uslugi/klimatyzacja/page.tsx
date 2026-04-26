import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import findGalleryCadidates from "@/utils/findGalleryCandidates"
import Image from "next/image"
import { FadeIn } from "@/components/fx/FadeIn"

const galleryImages = findGalleryCadidates('airconditioning')

const data: servicePageProps = {
    title: 'Klimatyzacja',
    description: 'Zapewniamy kompleksową obsługę w zakresie doboru, montażu i serwisu systemów klimatyzacji pomieszczeń w biurach, sklepach oraz domach na terenie województwa opolskiego.',
    images: galleryImages
}

export default function AirConditioningPage() {
    return (
        <ServicePage {...data}>
            <section className="not-prose grid gap-8 md:grid-cols-2 md:items-center">
                <FadeIn direction="right" delay={70}>
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
                </FadeIn>

                <FadeIn direction="left" delay={130}>
                    <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-border bg-muted/30 p-4 md:min-h-[220px] md:p-8">
                        <Image
                            src="/images/services/airconditioning/brands.png"
                            width={1500}
                            height={1000}
                            alt="Logo producentów klimatyzacji"
                            className="mx-auto h-auto w-full max-w-[560px]"
                        />
                    </div>
                </FadeIn>
            </section>
        </ServicePage>
    )
}