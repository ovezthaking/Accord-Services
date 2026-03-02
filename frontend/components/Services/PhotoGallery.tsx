'use client'

import ImageGallery from 'react-image-gallery'
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import { useRef } from 'react';
import 'react-image-gallery/styles/image-gallery.css'

export default function PhotoGallery2({images}: {images: GalleryItem[]}) {
    const galleryRef = useRef<ImageGalleryRef>(null);

    return (
        <div className='w-full flex flex-col items-center'>
            <h3>Nasze realizacje</h3>
            <div className='max-w-7xl'>
                <ImageGallery
                    ref={galleryRef}
                    items={images}
                    onSlide={(index) => console.log("Slid to", index)}
                />  
            </div>
        </div>
        
  );
}