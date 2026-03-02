import ServicePage from "@/components/Services/ServicePage"
import { servicePageProps } from "@/components/Services/types"

const data: servicePageProps = {
    title: 'Klimatyzacja',
    description: 'Zapewniamy kompleksową obsługę w zakresie doboru, montażu i serwisu systemów klimatyzacji pomieszczeń w biurach, sklepach oraz domach na teranie woj Opolskiego',
    images: [
        {
            src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89825358_889485641504483_5225617989566464_n-1536x1152.jpg',
            alt: 'Czarna klimatyzacja w zielonym pokoju',
        },
        {
            src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/89706554_216104213101511_4730558412394332160_n.jpg',
            alt: 'Biała klimatyzacja w zielonym pokoju',
        },
        {
            src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90541294_2267920563311667_7270341100445892608_n-1536x1152.jpg',
            alt: 'Biała klimatyzacja w żóltym pokoju',
        },
        {
            src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/03/90455992_251233462566565_1381706118882918400_n-1536x1152.jpg',
            alt: 'Wysoka biała klimatyzacja na szarej ścianie',
        },
        {
            src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/92490970_2876368322439342_5375790477394051072_n.jpg',
            alt: 'Biała klimatyzacja obok drzwi balkonowych nad grzejnikiem w zielonym pokoju',
        },
        {
            src: 'http://www.accord.opole.pl/wordpress/wp-content/uploads/2020/04/91679234_266989877653145_8612664628377288704_n.jpg',
            alt: 'Biała klimatyzacja w szarym pokoju',
        },
    ]
}

export default function AirConditioningPage() {
    return (
        <ServicePage {...data}>
            TEST
        </ServicePage>
    )
}