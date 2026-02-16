import { ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import type { StatsArrayType } from "@/lib/types";

const statsArray: StatsArrayType = [
    { value: "40+", label: "lat doświadczenia" },
    { value: "XXXX+", label: "realizacji" },
    { value: "100%", label: "zadowolonych klientów" },
    { value: "24/7", label: "serwis gwarancyjny" },
]

export default function HeroSection() {
    return (
        <section className="relative bg-foreground overflow-hidden ">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src='/images/hero-background.jpg'
                    alt="Nowoczesna pompa ciepła przy domu"
                    className="w-full h-full object-cover opacity-40"
                    width={1024}
                    height={1024}
                />
            </div>

            {/* Content */}
            <div className="relative mx-auto z-10 max-w-7xl px-6 py-28 md:py-40">
                <div className="max-w-2xl">
                    <div className="text-card inline-flex items-center mb-6 gap-2 border border-card/20 rounded-full bg-card/10 px-4 py-2 text-sm backdrop-blur-sm">
                        <ShieldCheck className="text-accent h-4 w-4"/>
                        <span>Zaufaj firmie z 40-letnim doświadczeniem</span>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-card md:text-5xl lg:text-6xl">
                        <span className="text-balance">Komfort i ekologia{" "}</span>
                        <span className="text-balance text-accent">dla Twojego domu</span>
                    </h1>

                    <p className="mb-10 max-w-lg text-lg leading-relaxed text-card/80">
                        Pompy ciepła, klimatyzacja, rekuperacja i fotowoltaika. Kompleksowe rozwiązania od firmy z ponad 40-letnim stażem w Opolu i okolicach.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button asChild size='lg' className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <a href="#kontakt">
                                Bezpłatna wycena
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                        <Button asChild size='lg' variant='outline' className="border-card/30 bg-transparent text-card hover:bg-card/10 hover:text-card">
                            <a href="#uslugi">Poznaj nasze usługi</a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="relative z-10 border-t border-card/10 bg-foreground/80 backdrop-blur-md">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
                    {statsArray.map(stat => (
                        <div key={stat.label} className="px-6 py-6 text-center">
                            <div className="text-accent text-2xl font-bold md:text-3xl">{stat.value}</div>
                            <div className="text-card/60 mt-1 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
