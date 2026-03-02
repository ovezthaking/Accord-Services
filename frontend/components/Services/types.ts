import { ReactNode } from "react"

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
    images?: Array<imageType>,
}
