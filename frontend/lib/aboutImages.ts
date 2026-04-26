import findGalleryCadidates from "@/utils/findGalleryCandidates";
import { GalleryItem } from "react-image-gallery";

const photovoltaicsGalleryImages = findGalleryCadidates('photovoltaics')
const airconditioningGalleryImages = findGalleryCadidates('airconditioning')
const recuperationGalleryImages = findGalleryCadidates('recuperation')

const galleryImages = [...photovoltaicsGalleryImages, ...airconditioningGalleryImages, ...recuperationGalleryImages]

export const aboutImages: Array<GalleryItem> = galleryImages
