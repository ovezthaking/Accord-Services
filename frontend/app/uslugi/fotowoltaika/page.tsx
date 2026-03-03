import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"
import Image from "next/image"

const data: servicePageProps = {
    title: 'Fotowoltaika',
    description: 'To jeden z najskuteczniejszych sposobów pozyskiwania energii elektrycznej z promieniowania słonecznego, który zdobywa w Polsce coraz większą popularność. System fotowoltaiczny wykorzystuje zjawisko, w którym promienie słoneczne są przetwarzane w prąd przez panele fotowoltaiczne połączone w baterie słoneczne. Następnie wyprodukowany prąd zostaje wprowadzony do sieci energetycznej.',
    images: [
        {
            originalAlt: 'Biały panel energetyczny od fotowoltaiki na drewnianej ścianie',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90470379_205772064082144_5549799492548558848_n-2-1536x1152.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90470379_205772064082144_5549799492548558848_n-2-1536x1152.jpg'
        },
        {
            originalAlt: 'Panele fotowoltaiczne na czarnym dachu',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/05/95329445_240379947167624_4792183075603742720_n.jpg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/05/95329445_240379947167624_4792183075603742720_n.jpg'
        },
        {
            originalAlt: 'Biały panel energetyczny od fotowoltaiki na szarej ścianie',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-24-at-19.07.181.jpeg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-24-at-19.07.181.jpeg'
        },
        {
            originalAlt: 'Dom z panelami fotowoltaicznymi',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-22-at-20.17.22-8-1.jpeg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-22-at-20.17.22-8-1.jpeg'
        },
        {
            originalAlt: 'Dom w budowie z panelami fotowoltaicznymi na dachu',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-24-at-19.04.16-1536x1153.jpeg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-24-at-19.04.16-1536x1153.jpeg'
        },
        {
            originalAlt: 'Panele fotowoltaiczne na polu',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/06/ligopv4kw1.jpeg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/06/ligopv4kw1.jpeg'
        },
        {
            originalAlt: 'Panele fotowoltaiczne na polu z bliska',
            original: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-24-at-19.06.48x-1536x657.jpeg',
            thumbnail: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2021/11/WhatsApp-Image-2021-11-24-at-19.06.48x-1536x657.jpeg'
        },
    ]
}

export default function PhotovoltaicsPage() {
    return (
        <ServicePage {...data}>
            <Image
                src='http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/pv-1.png'
                alt="Kompleksowa obługa - kroki do realizacji"
                width={1900}
                height={500}
            />
        </ServicePage>
    )
}