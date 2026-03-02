'use client'

import Image from "next/image";
import { useState } from "react";
import { photoGalleryProps } from "./types";

export default function PhotoGallery({images}: photoGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const onDecrease = () => {
        setActiveIndex(prevIndex => {
            if(prevIndex == 0) return images.length - 1
            
            return prevIndex - 1
        })
    }

    const onIncrease = () => {
        setActiveIndex(prevIndex => {
            if(prevIndex == images.length - 1) return 0

            return prevIndex + 1
        })
    }

    return (
        <>
            <button onClick={onDecrease}>-</button>
            <Image 
                key={activeIndex}
                width={800}
                height={800}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
            />
            <button onClick={onIncrease}>+</button>
        </>
    )
}