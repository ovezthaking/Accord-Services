import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <main className="bg-background">
            <section className="mx-auto max-w-7xl px-6 pb-8 pt-24 md:pt-28">
                <Skeleton className="mb-3 h-4 w-32" />
                <Skeleton className="mb-5 h-12 w-2/3" />
                <Skeleton className="mb-3 h-5 w-full max-w-2xl" />
                <Skeleton className="mb-2 h-5 w-full max-w-xl" />
                <Skeleton className="mb-8 h-5 w-1/2 max-w-lg" />
                <div className="flex gap-3">
                    <Skeleton className="h-11 w-52" />
                    <Skeleton className="h-11 w-40" />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16">
                <Skeleton className="mb-8 h-8 w-64" />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                            <Skeleton className="h-48 w-full rounded-none" />
                            <div className="p-5">
                                <Skeleton className="mb-2 h-3 w-24" />
                                <Skeleton className="mb-1 h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="mt-4 h-4 w-36" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}