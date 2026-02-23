import { highlightsArrayType } from "@/lib/types"
import { Award, Clock, LucideBadgeCheck, Wrench } from "lucide-react"

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
        <section id="o-nas">

        </section>
    )
}