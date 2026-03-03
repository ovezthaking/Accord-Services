'use client'

import ImageGallery from 'react-image-gallery'
import type { GalleryItem, ImageGalleryRef } from "react-image-gallery";
import { useRef, useState } from 'react';
import 'react-image-gallery/styles/image-gallery.css'
import { Button } from '../ui/button';

export default function PhotoGallery2({images}: {images: GalleryItem[]}) {
    const galleryRef = useRef<ImageGalleryRef>(null);
    const [galleryShown, setGalleryShown] = useState<boolean>(false)

    const showGallery = () => {
        setGalleryShown(prevState => !prevState)
    }

    return (
        <section className='mx-auto w-full max-w-7xl px-6 pb-20'>
            <div className='rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8'>
                <div className='mb-6 max-w-2xl'>
                    <p className='mb-2 text-sm font-semibold uppercase tracking-wider text-accent'>Portfolio</p>
                    <h2 className='text-2xl font-bold tracking-tight text-card-foreground md:text-3xl'>Nasze realizacje</h2>
                    <p className='mt-3 leading-relaxed text-muted-foreground'>
                        Zobacz przykładowe montaże i estetykę wykonania naszych instalacji.
                    </p>
                </div>

                {galleryShown ? 
                    <ImageGallery
                        ref={galleryRef}
                        items={images}
                        additionalClass="service-image-gallery"
                    /> : 
                    <Button onClick={showGallery} className="bg-accent text-accent-foreground hover:bg-accent/90">
                        Pokaż galerię zdjęć
                    </Button>
                }
            </div>
        </section>
        
  );
}