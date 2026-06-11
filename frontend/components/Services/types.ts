import { ReactNode } from "react"
import { GalleryItem } from "react-image-gallery"

type imageType = {
    src: string,
    alt: string
}

export type photoGalleryProps = {
    images: Array<imageType>
}

export type servicePageProps = {
    title: string,
    description?: string,
    children?: ReactNode,
    service?: string,
    images?: Array<GalleryItem>,
}

export type LocalServicePageProps = {
    city: string,
    citySlug: string,
    service: string,
    serviceKey: string,
    serviceLabel: string,
    serviceDeclination: string
}
