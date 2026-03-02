'use client'

import Image from "next/image";
import { useState } from "react";
import { photoGalleryProps } from "./types";

export default function PhotoGallery({images}: photoGalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const onDecrease = () => {
        const nextIndex = activeIndex - 1
        console.log(activeIndex)
        if(nextIndex < 0) {
            setActiveIndex(images.length - 1)
        }
        else {
            setActiveIndex(nextIndex)
        }
    }

    const onIncrease = () => {
        const nextIndex = activeIndex + 1
        console.log(activeIndex)
        if(nextIndex > images.length - 1) {
            setActiveIndex(0)
        }
        else {
            setActiveIndex(nextIndex)
        }
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