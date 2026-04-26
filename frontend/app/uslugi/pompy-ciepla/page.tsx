import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import Image from "next/image"

const data: servicePageProps = {
    title: 'Pompy ciepła - wycena, montaż',
    description: 'Dobieramy instalację do Twojego domu i budżetu. Sprawdź, ile możesz zaoszczędzić.',
    images: [
        {
            original: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgCqngpZ-zF_TCxErrjbmrDHS-gsX1gCCRzkAwMAgGw&s=10'
        }
    ]
}

export default function HeatPumpsPage() {
    return (
        <>

            <ServicePage {...data}>
                <p className="my-5 mb-10 leading-relaxed text-card-foreground mx-auto max-w-7xl px-6">
                    Montujemy pompy ciepła w Opolu i okolicznych miejscowościach, dojeżdzamy też do innych województw.

                    Każdą instalację dobieramy indywidualnie - tak, aby była opłacalna, wydajna i bezproblemowa w użytkowaniu przez lata.
                </p>
                <section className="not-prose mb-10 grid gap-8 md:grid-cols-2 md:items-center">
                    <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-emerald-50/60 p-6 shadow-sm md:p-8">
                        <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium tracking-wide text-emerald-800">
                            Dobór rozwiązania
                        </p>

                        <p className="mb-3 text-lg font-semibold leading-relaxed tracking-tight md:text-xl">Czy pompa ciepła jest dla Ciebie?</p>

                        <p className="mb-2 leading-relaxed text-foreground/90">Pompa ciepła to dobre rozwiązanie, jeśli:</p>

                        <ul className="mb-6 space-y-2 text-sm text-muted-foreground md:text-base">
                            <li>Budujesz nowy dom</li>
                            <li>Modernizujesz instalację grzewczą</li>
                            <li>Chcesz obniżyć rachunki za ogrzewanie</li>
                            <li>Planujesz fotowoltaikę</li>
                        </ul>

                        <p className="mb-2 leading-relaxed font-medium text-foreground/90">Może wymagać dodatkowej analizy, jeśli:</p>

                        <ul className="mb-5 space-y-2 text-sm text-muted-foreground md:text-base">
                            <li>Dom jest stary i słabo ocieplony</li>
                            <li>Instalacja grzewcza jest przestarzała</li>
                        </ul>

                        <p className="rounded-xl border border-emerald-200/60 bg-emerald-100/40 px-4 py-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                            W takich przypadkach doradzamy najlepsze rozwiązanie - nie sprzedajemy "na siłę".
                        </p>
                    </div>

                    <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border/60 bg-muted/20 shadow-sm md:min-h-[340px]">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                        <Image
                            src="http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/AT-PA-1.png"
                            alt="Pompa ciepła powietrze-woda"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="rounded-2xl object-contain p-4 md:object-scale-down md:p-0"
                        />
                    </div>
                </section>

                <section className="not-prose grid gap-6 md:grid-cols-2">
                    {/* <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
                        <Image
                            src="http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/zastosownie-pompy-ciep%C5%82a-2.png"
                            alt="Zastosowanie pompy ciepła"
                            width={900}
                            height={900}
                            className="h-auto w-full"
                        />
                    </div> */}

                    <div className="relative self-start overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-amber-50 via-background to-background p-6 shadow-sm md:self-center md:p-8">
                        <p className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-medium tracking-wide text-amber-800">
                            Realne oszczędności
                        </p>

                        <p className="mb-3 text-lg font-semibold leading-relaxed tracking-tight md:text-xl">Ile można zaoszczędzić?</p>

                        <p className="mb-2 leading-relaxed text-foreground/90">W większości realizacji nasi klienci:</p>
                        <ul className="mb-6 space-y-2 text-sm text-muted-foreground md:text-base">
                            <li>Obniżają koszty ogrzewania o 50-70%</li>
                            <li>Ograniczają obsługę systemu do minimum</li>
                            <li>Zwiększają komfort w domu przez cały rok</li>
                        </ul>

                        <p className="rounded-xl border border-amber-200/60 bg-amber-100/40 px-4 py-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                            Pompa ciepła może ogrzewać dom, chłodzić go latem i przygotowywać ciepłą wodę.
                        </p>
                    </div>

                    {/* <div className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
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
                    </div> */}

                    <div className="grid gap-6">
                        <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm md:p-8">
                            <p className="mb-3 text-lg font-semibold leading-relaxed tracking-tight md:text-xl">Ile kosztuje pompa ciepła?</p>

                            <p className="text-foreground/90">Koszt instalacji zależy od wielkości domu i rodzaju systemu.</p>

                            <p className="mb-2 mt-4 font-medium">Orientacyjne ceny:</p>
                            <ul className="mb-2 space-y-2 text-sm text-muted-foreground md:text-base">
                                <li>Mały dom (do 120 m<sup>2</sup>): od 25 000 zł</li>
                                <li>Średni dom (120-180 m<sup>2</sup>): 30 000 - 45 000 zł</li>
                                <li>Większe instalacje: od 50 000 zł</li>
                            </ul>

                            <p className="mt-4 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 text-sm leading-relaxed md:text-base">
                                Dokładną wycenę przygotujemy po krótkiej rozmowie - bez zobowiązań.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-sky-50 via-background to-background p-6 shadow-sm md:p-8">
                            <p className="mb-3 text-lg font-semibold leading-relaxed tracking-tight md:text-xl">Jak wygląda montaż pompy ciepła?</p>

                            <ul className="mb-4 space-y-2 text-sm text-muted-foreground md:text-base">
                                <li>Kontakt i konsultacja</li>
                                <li>Dobór urządzenia i wycena</li>
                                <li>Montaż (zwykle 1-3 dni)</li>
                                <li>Uruchomienie i instruktaż</li>
                                <li>Serwis i wsparcie</li>
                            </ul>

                            <p className="rounded-xl border border-sky-200/60 bg-sky-100/40 px-4 py-3 text-sm leading-relaxed text-foreground/90 md:text-base">
                                Zajmujemy się wszystkim - od projektu po uruchomienie.
                            </p>
                        </div>
                        
                    </div>
                </section>
            </ServicePage>
        </>
    )
}