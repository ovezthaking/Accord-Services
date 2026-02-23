import { statsArray } from "@/lib/statsArray"
import { highlightsArrayType } from "@/lib/types"
import { Award, Clock, LucideBadgeCheck, Wrench } from "lucide-react"
import Image from "next/image"

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
            <div>
                <div>
                    {/* Text */}
                    <div>
                        <p>O nas</p>
                        <h2>
                            Od 1984 roku dostarczamy sprawdzone rozwiązania
                        </h2>
                        <p>
                            Firma Accord Service działa na rynku od ponad 40 lat,
                            oferując kompleksowe usługi w zakresie ogrzewania, 
                            klimatyzacji, wentylacji i odnawialnych źródeł energii.
                        </p>
                        <p>
                            Naszym priorytetem jest zadowolenie klienta - od pierwszej konsultacji, przez profesjonalny montaż, aż po niezawodny serwis. Działamy na terenie Opola i całego województwa opolskiego.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div>
                        {higlights.map(item => {
                            const Icon = item.icon
                            return (
                                <div key={item.title}>
                                    <div>
                                        <Icon />
                                    </div>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Visual side */}
                <div>
                    <div>
                        <div>
                            <div>
                                <Image
                                    src='/images/service-ac.jpg'
                                    alt="Montaż klimatyzacji"
                                    width={400}
                                    height={400}
                                />
                            </div>
                            <div>
                                <div>
                                    {statsArray.find(item => item.label === 'lat doświadczenia')?.value}
                                </div>
                                <div>lat na rynku</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    {statsArray.find(item => item.label === 'realizacji')?.value}
                                </div>
                                <div>zrealizowanych projektów</div>
                            </div>
                            <div>
                                <Image
                                    src='/images/service-solar.jpg'
                                    alt="Instalacja fotowoltaiczna"
                                    width={400}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
