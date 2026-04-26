import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import findGalleryCadidates from "@/utils/findGalleryCandidates"
import Image from "next/image"
import { FadeIn } from "@/components/fx/FadeIn"

const galleryImages = findGalleryCadidates('photovoltaics')

const data: servicePageProps = {
    title: 'Fotowoltaika',
    description: 'To jeden z najskuteczniejszych sposobów pozyskiwania energii elektrycznej z promieniowania słonecznego, który zdobywa w Polsce coraz większą popularność. System fotowoltaiczny wykorzystuje zjawisko, w którym promienie słoneczne są przetwarzane w prąd przez panele fotowoltaiczne połączone w baterie słoneczne. Następnie wyprodukowany prąd zostaje wprowadzony do sieci energetycznej.',
    images: galleryImages
}

export default function PhotovoltaicsPage() {
    return (
        <ServicePage {...data}>
            <FadeIn direction="up" delay={80}>
                <Image
                    src='/images/services/photovoltaics/banner.png'
                    alt="Kompleksowa obługa - kroki do realizacji"
                    width={1900}
                    height={500}
                />
            </FadeIn>
        </ServicePage>
    )
}