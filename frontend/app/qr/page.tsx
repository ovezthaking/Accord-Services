import Link from "next/link"
import { Phone, Star, Globe, MapPin, Clock, ChevronRight } from "lucide-react"
import Image from "next/image"

const actions = [
    {
        icon: Globe,
        label: "Przejdź do strony",
        description: "Sprawdź nasze usługi i ofertę",
        href: "/",
        style: "primary" as const,
    },
    {
        icon: Phone,
        label: "Zadzwoń teraz",
        description: "Pon–Sob: 9:00–17:00",
        href: "tel:601475547",
        style: "accent" as const,
    },
    {
        icon: Star,
        label: "Oceń nas w Google",
        description: "Twoja opinia wiele znaczy",
        href: "https://g.page/r/Cd6B_g8YJOq4EBM/review",
        style: "outline" as const,
        external: true,
    },
    {
        icon: MapPin,
        label: "Znajdź nas na mapie",
        description: "ul. Opolska 27, Masów",
        href: "https://maps.app.goo.gl/18bXW9szX722san56",
        style: "outline" as const,
        external: true,
    },
]

export default function QRPage() {
    return (
        <main className="min-h-[calc(100vh-theme(spacing.32))] flex items-center justify-center px-4 py-16 bg-background">
            <div className="w-full max-w-sm mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-5 shadow-lg shadow-primary/25">
                        <Image src={'/images/favicon.png'} width={800} height={800} alt="Accord Service Icon"/>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                        Accord Service
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Pompy ciepła · Klimatyzacja · Fotowoltaika
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted rounded-full px-3 py-1">
                        <Clock className="h-3 w-3" />
                        <span>Pon–Sob: 9:00–17:00</span>
                    </div>
                </div>

                {/* Action cards */}
                <div className="flex flex-col gap-3">
                    {actions.map((action) => {
                        const Icon = action.icon
                        const isExternal = action.external

                        const baseClasses =
                            "group flex items-center gap-4 w-full rounded-2xl px-5 py-4 text-left transition-all duration-200 active:scale-[0.98]"

                        const styleClasses = {
                            primary:
                                "bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90",
                            accent:
                                "bg-accent text-accent-foreground shadow-md shadow-accent/20 hover:bg-accent/90",
                            outline:
                                "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted shadow-sm",
                        }

                        const iconBgClasses = {
                            primary: "bg-white/15",
                            accent: "bg-white/15",
                            outline: "bg-primary/10",
                        }

                        const iconColorClasses = {
                            primary: "text-primary-foreground",
                            accent: "text-accent-foreground",
                            outline: "text-primary",
                        }

                        const chevronClasses = {
                            primary: "text-primary-foreground/50",
                            accent: "text-accent-foreground/50",
                            outline: "text-muted-foreground",
                        }

                        const labelClasses = {
                            primary: "text-primary-foreground",
                            accent: "text-accent-foreground",
                            outline: "text-foreground",
                        }

                        const descClasses = {
                            primary: "text-primary-foreground/70",
                            accent: "text-accent-foreground/70",
                            outline: "text-muted-foreground",
                        }

                        return (
                            <Link
                                key={action.label}
                                href={action.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className={`${baseClasses} ${styleClasses[action.style]}`}
                            >
                                <div
                                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${iconBgClasses[action.style]}`}
                                >
                                    <Icon className={`h-5 w-5 ${iconColorClasses[action.style]}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold ${labelClasses[action.style]}`}>
                                        {action.label}
                                    </p>
                                    <p className={`text-xs mt-0.5 ${descClasses[action.style]}`}>
                                        {action.description}
                                    </p>
                                </div>
                                <ChevronRight
                                    className={`h-4 w-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5 ${chevronClasses[action.style]}`}
                                />
                            </Link>
                        )
                    })}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground/60 mt-10">
                    F.U.H. Accord Service · od 1984 roku
                </p>
            </div>
        </main>
    )
}