'use client'

import Image from "next/image";
import { useState } from "react";
import { photoGalleryProps } from "./types";

export default function PhotoGallery({images}: photoGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    return (
        <>
            <Image 
                key={activeIndex}
                width={800}
                height={800}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
            />
        </>
    )
}