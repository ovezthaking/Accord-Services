import Image from "next/image";
import { useState } from "react";

export default function PhotoGallery({images}) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    return (
        <>
            <Image 
                width={800}
                height={800}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
            />
        </>
    )
}