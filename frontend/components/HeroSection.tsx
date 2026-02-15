import { ShieldCheck } from "lucide-react";
import Image from "next/image";

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
            <div className="relative mx-auto z-10 ">
                <div className="max-w-2xl">
                    <div className="text-card inline-flex items-center mb-6 gap-2 border border-card/20 rounded-full bg-card/10 px-4 py-2 text-sm backdrop-blur-sm">
                        <ShieldCheck className="text-accent h-4 w-4"/>
                        <span>Zaufaj firmie z 40-letnim doświadczeniem</span>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-card md:text-5xl lg:text-6xl">
                        <span className="text-balance">Komfort i ekologia{" "}</span>
                        <span className="text-balance text-accent">dla Twojego domu</span>
                    </h1>
                </div>
            </div>
        </section>
    )
}