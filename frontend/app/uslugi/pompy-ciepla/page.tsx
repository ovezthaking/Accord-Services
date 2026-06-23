import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import Image from "next/image"
import { FadeIn } from "@/components/fx/FadeIn"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Pompy ciepła - wycena, doradztwo i montaż | Accord Service - Opole i okolice',
    description: 'Profesjonalny montaż pomp ciepła w Opolu i okolicach.' + 
    'Zmniejsz rachunki za ogrzewanie i zadbaj o środowisko. ' +
    'Sprawdź naszą ofertę i zyskaj dotację!'
}

const data: servicePageProps = {
    title: 'Pompy ciepła - wycena, montaż',
    description: 'Dobieramy instalację do Twojego domu i budżetu. Sprawdź, ile możesz zaoszczędzić.',
    service: 'pompy',
    images: [
        {
            original: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgCqngpZ-zF_TCxErrjbmrDHS-gsX1gCCRzkAwMAgGw&s=10'
        }
    ],
}

export default function HeatPumpsPage() {
    return (
        <ServicePage {...data}>
            <FadeIn direction="up" delay={50}>
                <p className="my-5 mb-10 leading-relaxed text-card-foreground mx-auto max-w-7xl px-4 md:px-6">
                    Montujemy pompy ciepła w Opolu i okolicznych miejscowościach, dojeżdzamy też do innych województw.
                    Każdą instalację dobieramy indywidualnie - tak, aby była opłacalna, wydajna i bezproblemowa w użytkowaniu przez lata.
                </p>
            </FadeIn>

            <FadeIn direction="up" delay={100} className="mb-12 px-0 md:px-6">
                <div className="relative aspect-[1024/352] w-full overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                    <Image
                        src="/images/services/heatpumps/banner.png"
                        alt="Pompa ciepła powietrze-woda"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
            </FadeIn>

            {/* 3. SEKCJA ANALIZY - Wykorzystuje pełną szerokość dostępną w ServicePage */}
            <section className="not-prose mb-12 px-0 md:px-6">
                <FadeIn direction="up" delay={150}>
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-emerald-50/60 p-6 shadow-sm md:p-10">
                        <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium tracking-wide text-emerald-800">
                            Dobór rozwiązania
                        </p>
                        <p className="mb-6 text-xl font-semibold md:text-2xl">Czy pompa ciepła jest dla Ciebie?</p>
                        
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <p className="mb-3 font-medium text-foreground/90">Pompa ciepła to dobre rozwiązanie, jeśli:</p>
                                <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                                    <li>• Budujesz nowy dom</li>
                                    <li>• Modernizujesz instalację grzewczą</li>
                                    <li>• Chcesz obniżyć rachunki za ogrzewanie</li>
                                    <li>• Planujesz fotowoltaikę</li>
                                </ul>
                            </div>
                            <div>
                                <p className="mb-3 font-medium text-foreground/90">Może wymagać dodatkowej analizy, jeśli:</p>
                                <ul className="space-y-3 text-sm text-muted-foreground md:text-base">
                                    <li>• Dom jest stary i słabo ocieplony</li>
                                    <li>• Instalacja grzewcza jest przestarzała</li>
                                </ul>
                            </div>
                        </div>
                        
                        <p className="mt-8 rounded-xl border border-emerald-200/60 bg-emerald-100/40 px-4 py-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                            W takich przypadkach doradzamy najlepsze rozwiązanie - nie sprzedajemy "na siłę".
                        </p>
                    </div>
                </FadeIn>
            </section>

            {/* 4. TRZY KAFELKI - Kluczowe zmiany w paddingu i gridzie */}
            <section className="not-prose grid gap-6 px-0 md:px-6 lg:grid-cols-3 mb-12">
                
                {/* Karta: Oszczędności */}
                <FadeIn direction="up" delay={200} className="flex w-full">
                    <div className="flex flex-col rounded-2xl border border-border/60 bg-gradient-to-br from-amber-50 via-background to-background p-6 shadow-sm md:p-8 w-full">
                        <p className="mb-3 inline-flex w-fit rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                            Zalety
                        </p>
                        <p className="mb-3 text-lg font-semibold tracking-tight md:text-xl">Ile można zaoszczędzić?</p>
                        <p className="mb-2 text-sm text-foreground/90">W większości realizacji nasi klienci:</p>
                        <ul className="mb-6 flex-grow space-y-2 text-sm text-muted-foreground">
                            <li>• Obniżają koszty ogrzewania o 50-70%</li>
                            <li>• Ograniczają obsługę systemu do minimum</li>
                            <li>• Zwiększają komfort w domu przez cały rok</li>
                        </ul>
                        <p className="rounded-xl border border-amber-200/60 bg-amber-100/40 px-4 py-3 text-sm text-foreground/90">
                            Pompa ciepła może ogrzewać dom, chłodzić go latem i przygotowywać ciepłą wodę.
                        </p>
                    </div>
                </FadeIn>

                {/* Karta: Koszty */}
                <FadeIn direction="up" delay={250} className="flex w-full">
                    <div className="flex flex-col rounded-2xl border border-border/60 bg-background p-6 shadow-sm md:p-8 w-full">
                        <p className="mb-3 inline-flex w-fit rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                            Wycena
                        </p>
                        <p className="mb-3 text-lg font-semibold tracking-tight md:text-xl">Ile kosztuje pompa ciepła?</p>
                        <p className="text-sm text-foreground/90">Koszt instalacji zależy od wielkości domu i rodzaju systemu.</p>
                        <p className="mb-2 mt-4 text-sm font-medium">Orientacyjne ceny:</p>
                        <ul className="mb-6 flex-grow space-y-2 text-sm text-muted-foreground">
                            <li>• Mały dom (do 120 m<sup>2</sup>): od 25 000 zł</li>
                            <li>• Średni dom (120-180 m<sup>2</sup>): 30 000 - 45 000 zł</li>
                            <li>• Większe instalacje: od 50 000 zł</li>
                        </ul>
                        <p className="rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm">
                            Dokładną wycenę przygotujemy po krótkiej rozmowie - bez zobowiązań.
                        </p>
                    </div>
                </FadeIn>

                {/* Karta: Montaż */}
                <FadeIn direction="up" delay={300} className="flex w-full">
                    <div className="flex flex-col rounded-2xl border border-border/60 bg-gradient-to-br from-sky-50 via-background to-background p-6 shadow-sm md:p-8 w-full">
                        <p className="mb-3 inline-flex w-fit rounded-full border border-sky-200 bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
                            Instalacja
                        </p>
                        <p className="mb-3 text-lg font-semibold tracking-tight md:text-xl">Jak wygląda montaż?</p>
                        <ul className="mb-6 flex-grow space-y-2 text-sm text-muted-foreground">
                            <li>• Kontakt i konsultacja</li>
                            <li>• Dobór urządzenia i wycena</li>
                            <li>• Montaż (zwykle 1-3 dni)</li>
                            <li>• Uruchomienie i instruktaż</li>
                            <li>• Serwis i wsparcie</li>
                        </ul>
                        <p className="rounded-xl border border-sky-200/60 bg-sky-100/40 px-4 py-3 text-sm text-foreground/90">
                            Zajmujemy się wszystkim - od projektu po uruchomienie.
                        </p>
                    </div>
                </FadeIn>
            </section>
        </ServicePage>
    )
}
