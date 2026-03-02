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
    images?: Array<GalleryItem>,
}
