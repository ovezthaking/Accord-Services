import PhotoGallery from "./PhotoGallery";
import { servicePageProps } from "./types";
import Link from "next/link";
import { Button } from "../ui/button";
import { FadeIn } from "../fx/FadeIn";

export default function ServicePage({title, description, images, children}: servicePageProps) {
    return (
        <main className="bg-background">
            <section className="mx-auto max-w-7xl px-6 pb-8 pt-24 md:pt-28">
                <FadeIn className="max-w-3xl" direction="up" delay={40}>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Nasza usługa</p>
                    <h1 className="mb-5 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{title}</h1>
                    {description && <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{description}</p>}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href="/#kontakt">Umów bezpłatną wycenę</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/#uslugi">Zobacz wszystkie usługi</Link>
                        </Button>
                    </div>
                </FadeIn>
            </section>

            {children && (
                <section className="mx-auto max-w-7xl px-6 pb-12 mt-10">
                    <FadeIn direction="up" delay={70}>
                        <div className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm md:p-8">
                            <div className="prose prose-zinc max-w-none dark:prose-invert">{children}</div>
                        </div>
                    </FadeIn>
                </section>
            )}

            {images && (
                <FadeIn direction="up" delay={90}>
                    <PhotoGallery images={images}/>
                </FadeIn>
            )}
        </main>
    )
}