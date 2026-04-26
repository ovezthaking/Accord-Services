import { galleryCandidatesType } from "@/lib/types"
import { existsSync, readdirSync } from "node:fs"
import path from "node:path"
import { GalleryItem } from "react-image-gallery"

export default function findGalleryCadidates(serviceFolder: string): Array<GalleryItem> {
    const galleryCandidates: galleryCandidatesType = [
    {
        directory: path.join(process.cwd(), "public", "images", serviceFolder, "gallery"),
        publicPath: `/images/${serviceFolder}/gallery`,
    },
    {
        directory: path.join(process.cwd(), "public", "images", "services", serviceFolder, "gallery"),
        publicPath: `/images/services/${serviceFolder}/gallery`,
    },
]

    const activeGallery = galleryCandidates.find(({ directory }) => existsSync(directory))

    const galleryImages: Array<GalleryItem> = activeGallery
        ? readdirSync(activeGallery.directory)
            .filter((fileName) => /\.(png|jpe?g|webp|avif)$/i.test(fileName))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
            .map((fileName, index) => {
                const imagePath = `${activeGallery.publicPath}/${fileName}`

                return {
                    originalAlt: `Zdjecie klimatyzacji ${index + 1}`,
                    original: imagePath,
                    thumbnail: imagePath,
                }
            })
        : []
    
    return galleryImages
}
