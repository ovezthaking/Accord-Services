import { CheckCircle, FileSearch, HardHat, MessageSquare } from "lucide-react"
import { FadeIn } from "./fx/FadeIn"

const steps = [
    {
        icon: MessageSquare,
        number: "01",
        title: "Kontakt",
        description:
            "Bezpłatna konsultacja, oddzwaniamy i ustalamy potrzeby.",
    },
    {
        icon: FileSearch,
        number: "02",
        title: "Wycena",
        description:
            "Dostajesz konkretną ofertę.",
    },
    {
        icon: HardHat,
        number: "03",
        title: "Realizacja",
        description:
            "Montaż - szybki i profesjonalny.",
    },
    {
        icon: CheckCircle,
        number: "04",
        title: "Serwis i gwarancja",
        description:
            "Jesteśmy dostępni po instalacji.",
    },
]

export default function ProcessSection() {
    return (
        <section id="realizacja" className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <FadeIn className="mb-16 text-center" direction="up" delay={60}>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                        Jak działamy
                    </p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Jak wygląda współpraca
                    </h2>
                    <p className="mx-auto max-w-lg text-lg leading-relaxed text-muted-foreground">
                        Od pierwszego kontaktu do gotowej instalacji - każdego klienta traktujemy indywidualnie
                    </p>
                </FadeIn>

                {/* Process description */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <FadeIn key={step.number} direction="up" delay={index * 90 + 80}>
                                <div className="group relative">
                                    <div className="md:h-72 lg:h-80 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                                        <span className="mb-4 block text-4xl font-bold text-muted-foreground/20">{step.number}</span>
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}