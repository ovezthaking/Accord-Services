import { statsArray } from "@/lib/statsArray"
import { highlightsArrayType, StatsArrayType } from "@/lib/types"
import { Award, Clock, LucideBadgeCheck, Wrench } from "lucide-react"
import Image from "next/image"

const higlights: highlightsArrayType = [
    {
        icon: Award,
        title: 'Doświadczenie',
        description: 'Ponad 40 lat pracy w branży instalacyjnej – wiemy, co działa w praktyce, a nie tylko na papierze.'
    },
    {
        icon: LucideBadgeCheck,
        title: "Czołowi producenci",
        description: "Wykonujemy instalacje z użyciem produktów od czołowych producentów.",
    },
    {
        icon: Wrench,
        title: "Kompleksowa obsługa",
        description: "Od projektu, przez montaż, po serwis – masz jedną firmę, która odpowiada za całość.",
    },
    {
        icon: Clock,
        title: "Lokalna firma, szybki kontakt",
        description: "Działamy w Opolu i okolicy – jesteśmy dostępni także po zakończeniu montażu",
    },
]

const stats: StatsArrayType = [
    { value: "40+", label: "lat doświadczenia" },
    { value: "300+", label: "wykonanych instalacji" },
    { value: "Setki", label: "obsłużonych klientów w regionie" },
    { value: "Dziesiątki", label: "serwisów rocznie" },
]

export default function AboutSection() {
    return (
        <section id="o-nas" className="bg-muted py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Text */}
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Dlaczego my</p>
                            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                40 lat doświadczenia, które przekłada się na realne doświadczenie w branży
                            </h2>
                            <p className="mb-4 leading-relaxed text-muted-foreground">
                                Działamy od 1984 roku, pomagamy mieszkańcom Opola i okolic obniżać koszty ogrzewania i poprawić komfort życia w domu.
                            </p>
                            <p className="mb-4 leading-relaxed text-muted-foreground">
                                Zrealizowaliśmy setki instalacji – od małych systemów klimatyzacji po kompleksowe instalacje pomp ciepła i fotowoltaiki dla przemysłu.
                            </p>
                            <p className="mb-10 leading-relaxed text-muted-foreground">
                                Nie jesteśmy firmą „od wszystkiego”. Specjalizujemy się w instalacjach, które mają działać bezproblemowo przez lata – i dokładnie tak je projektujemy.
                            </p>
                        

                            {/* Highlights */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {higlights.map(item => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.title} className="flex gap-4">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                                                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Visual side */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="overflow-hidden rounded-2xl">
                                        <Image
                                            src='/images/service-ac.jpg'
                                            alt="Montaż klimatyzacji"
                                            width={400}
                                            height={400}
                                            className="h-48 w-full object-cover md:h-64"
                                        />
                                    </div>
                                    <div className="overflow-hidden rounded-2xl bg-primary p-6">
                                        <div className="text-4xl font-bold text-primary-foreground">
                                            {statsArray.find(item => item.label === 'lat doświadczenia')?.value}
                                        </div>
                                        <div className="mt-1 text-sm text-primary-foreground/70">lat na rynku</div>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="overflow-hidden rounded-2xl bg-accent p-6">
                                        <div className="text-4xl font-bold text-accent-foreground">
                                            {statsArray.find(item => item.label === 'realizacji')?.value}
                                        </div>
                                        <div className="mt-1 text-sm text-accent-foreground/80">działających instalacji</div>
                                    </div>
                                    <div className="overflow-hidden rounded-2xl">
                                        <Image
                                            src='/images/service-solar.jpg'
                                            alt="Instalacja fotowoltaiczna"
                                            width={400}
                                            height={400}
                                            className="h-48 w-full object-cover md:h-64"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2">
                            <div className="rounded-2xl border border-border bg-card p-6">
                                <h3 className="mb-3 text-base font-bold text-foreground">Realne doradztwo, nie sprzedaż na siłę</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground mb-2">
                                    Dobieramy rozwiązanie do Twojego domu i budżetu – nie sprzedajemy najdroższej opcji, tylko najbardziej opłacalną.
                                </p>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    Nie zostawiamy klienta po montażu – zapewniamy serwis i wsparcie.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-primary p-7 text-primary-foreground">
                                <h3 className="mb-5 text-lg font-bold">Nasze realizacje w liczbach</h3>
                                <div className="grid grid-cols-2 gap-5">
                                    {stats.map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                                        <div className="mt-1 text-sm text-primary-foreground/70">{stat.label}</div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    )
}
