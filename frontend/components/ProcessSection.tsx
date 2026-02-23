import { CheckCircle, FileSearch, HardHat, MessageSquare } from "lucide-react"

const steps = [
    {
        icon: MessageSquare,
        number: "01",
        title: "Konsultacja",
        description:
            "Bezpłatna rozmowa i analiza Twoich potrzeb. Doradzimy najlepsze rozwiązanie dla Twojego domu lub firmy.",
    },
    {
        icon: FileSearch,
        number: "02",
        title: "Projekt i wycena",
        description:
            "Przygotujemy szczegółowy projekt techniczny oraz transparentną wycenę bez ukrytych kosztów.",
    },
    {
        icon: HardHat,
        number: "03",
        title: "Realizacja",
        description:
            "Profesjonalny montaż. Terminowo i zgodnie z najwyższymi standardami.",
    },
    {
        icon: CheckCircle,
        number: "04",
        title: "Serwis i gwarancja",
        description:
            "Pełna obsługa serwisowa, przeglądy gwarancyjne i pogwarancyjne. Zawsze jesteśmy do dyspozycji.",
    },
]

export default function ProcessSection() {
    return (
        <section id="realizacja" className="bg-background py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6">
                {/* Header */}
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
                        Jak działamy
                    </p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                        Prosty proces, profesjonalny efekt
                    </h2>
                    <p className="mx-auto max-w-lg text-lg leading-relaxed text-muted-foreground">
                        Od pierwszego kontaktu do gotowej instalacji - każdego klienta traktujemy indywidualnie
                    </p>
                </div>

                {/* Process description */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map(step => {
                        const Icon = step.icon
                        return (
                            <div key={step.number} className="group relative">
                                <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                                    <span className="mb-4 block text-4xl font-bold text-muted-foreground/20">{step.number}</span>
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}