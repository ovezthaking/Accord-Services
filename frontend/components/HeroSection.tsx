import { ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { statsArray } from "@/lib/statsArray";
import { FadeIn } from "./fx/FadeIn";


export default function HeroSection() {
    return (
        <section id="hero" className="relative bg-foreground overflow-hidden ">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src='/images/hero-background.jpg'
                    alt="Nowoczesna pompa ciepła przy domu"
                    className="w-full h-full object-cover opacity-30 object-[68%_center] md:object-center"
                    width={1024}
                    height={1024}
                />
            </div>

            {/* Content */}
            <div className="relative mx-auto z-10 max-w-7xl px-6 py-28 md:py-40">
                <div className="max-w-2xl">
                    <FadeIn direction="down" delay={40}>
                        <div className="text-card inline-flex items-center mb-6 gap-2 border border-card/20 rounded-full bg-card/10 px-4 py-2 text-sm backdrop-blur-sm">
                            <ShieldCheck className="text-accent h-4 w-4"/>
                            <span>Zaufaj firmie z 40-letnim doświadczeniem</span>
                        </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={120}>
                        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-card md:text-4xl lg:text-5xl">
                            <span className="text-balance">Pompy ciepła Opole |{" "}</span>
                            <span className="text-balance text-accent">Klimatyzacja, Rekuperacja, Fotowoltaika</span>
                        </h1>
                    </FadeIn>

                    <FadeIn direction="up" delay={200}>
                        <p className="mb-10 max-w-lg text-lg leading-relaxed text-card/80">
                            Dobieramy, montujemy i serwisujemy instalacje 
                            dopasowane do Twoich potrzeb. 40 lat 
                            doświadczenia i setki realizacji w woj. opolskim.
                        </p>
                    </FadeIn>

                    <FadeIn direction="up" delay={280}>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button asChild size='lg' className="bg-accent text-accent-foreground hover:bg-accent/90">
                                <a href="#kontakt">
                                    Sprawdź darmową wycenę
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                            <Button asChild size='lg' variant='outline' className="border-card/30 bg-transparent text-card hover:bg-card/10 hover:text-card">
                                <a href="#uslugi">Poznaj nasze usługi</a>
                            </Button>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Stats */}
            {/* <div className="relative z-10 border-t border-card/10 bg-foreground/80 backdrop-blur-md">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-2 md:max-w-3xl">
                    {statsArray.map(stat => (
                        <div key={stat.label} className="px-6 py-6 text-center">
                            <div className="text-accent text-2xl font-bold md:text-3xl">{stat.value}</div>
                            <div className="text-card/60 mt-1 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div> */}
            <div className="relative z-10 border-t border-card/10 bg-foreground/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl flex-row items-center justify-around gap-8 px-6 py-8 sm:flex-row sm:justify-center sm:gap-16 md:gap-24">
                    <FadeIn direction="up" delay={80}>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-accent md:text-4xl">{statsArray[0].value}</div>
                            <div className="mt-1 text-sm text-card/60">{statsArray[0].label}</div>
                        </div>
                    </FadeIn>
                    <div className="hidden h-12 w-px bg-card/20 sm:block" />
                    <FadeIn direction="up" delay={180}>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-accent md:text-4xl">{statsArray[1].value}</div>
                            <div className="mt-1 text-sm text-card/60">{statsArray[1].label}</div>
                        </div>
                    </FadeIn>
                </div>
            </div>
            
        </section>
    )
}
