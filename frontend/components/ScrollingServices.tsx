const items: Array<string> = [
    'POMPY CIEPŁA',
    'KLIMATYZACJA',
    'REKUPERACJA',
    'FOTOWOLTAIKA',
    'SERWIS',
    'MONTAŻ',
    'PROJEKTOWANIE',
    'DORADZTWO',
]

export default function ScrollingServices() {
    return (
        <div aria-hidden='true' className="overflow-hidden border-y border-border bg-card py-4">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
                {[...items, ...items].map((item, index) => (
                    <span key={`${item}-${index}`} className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        <span>{item}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-accent"/>
                    </span>
                ))}
            </div>
        </div>
    )
}
