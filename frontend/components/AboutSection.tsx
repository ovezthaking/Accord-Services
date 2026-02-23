import { statsArray } from "@/lib/statsArray"
import { highlightsArrayType } from "@/lib/types"
import { Award, Clock, LucideBadgeCheck, Wrench } from "lucide-react"
import Image from "next/image"

const higlights: highlightsArrayType = [
    {
        icon: Award,
        title: 'Doświadczenie',
        description: 'Ponad 40 lat na rynku instalacji grzewczych i klimatyzacyjnych.'
    },
    {
        icon: LucideBadgeCheck,
        title: "Czołowi producenci",
        description: "Wykonujemy instalacje z użyciem produktów od czołowych producentów.",
    },
    {
        icon: Wrench,
        title: "Pełna obsługa",
        description: "Od projektu, przez montaż, po serwis gwarancyjny i pogwarancyjny.",
    },
    {
        icon: Clock,
        title: "Szybka realizacja",
        description: "Terminowosc i profesjonalizm na kazdym etapie wspolpracy.",
    },
]

export default function AboutSection() {
    return (
        <section id="o-nas" className="bg-muted py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Text */}
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">O nas</p>
                            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                Od 1984 roku dostarczamy sprawdzone rozwiązania
                            </h2>
                            <p className="mb-4 leading-relaxed text-muted-foreground">
                                Firma Accord Service działa na rynku od ponad 40 lat,
                                oferując kompleksowe usługi w zakresie ogrzewania, 
                                klimatyzacji, wentylacji i odnawialnych źródeł energii.
                            </p>
                            <p className="mb-8 leading-relaxed text-muted-foreground">
                                Naszym priorytetem jest zadowolenie klienta - od pierwszej konsultacji, przez profesjonalny montaż, aż po niezawodny serwis. Działamy na terenie Opola i całego województwa opolskiego.
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
                                        <div className="mt-1 text-sm text-accent-foreground/80">zrealizowanych projektów</div>
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
                </div>
            </div>
        </section>
    )
}
