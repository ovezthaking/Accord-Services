import PhotoGallery from "./PhotoGallery";
import { servicePageProps } from "./types";

export default function ServicePage({title, description, images, children}: servicePageProps) {
    return (
        <main>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
            {children}
            {images && <PhotoGallery images={images}/>}
        </main>
    )
}