'use client'

import ImageGallery from 'react-image-gallery'
import type { GalleryItem } from "react-image-gallery";
import { useState } from 'react';
import 'react-image-gallery/styles/image-gallery.css'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import useGallery from '@/hooks/use-gallery';

type PhotoGalleryProps = {
    images: GalleryItem[] | undefined
    embedded?: boolean
    service?: string
}

export default function PhotoGallery2({images: staticImages, embedded = false, service}: PhotoGalleryProps) {
    const { images: dynamicImages, loading } = useGallery(service)
    const [galleryShown, setGalleryShown] = useState<boolean>(true)
    const isMobile = useIsMobile()

    const galleryItems: Array<GalleryItem> = service
        ? dynamicImages.map(img => ({
            original: img.image_url,
            thumbnail: img.image_url,
            originalAlt: `Zdjęcie ${img.service} ${img.order}`
        }))
        : (staticImages ?? [])

    const showGallery = () => {
        setGalleryShown(prevState => !prevState)
    }

    const Wrapper = embedded ? 'div' : 'section'

    return (
        <Wrapper className={cn(embedded ? 'w-full' : 'mx-auto w-full max-w-7xl px-6 pb-20')}>
            <div className='rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8'>
                <div className='mb-6 max-w-2xl'>
                    <p className='mb-2 text-sm font-semibold uppercase tracking-wider text-accent'>Portfolio</p>
                    <h2 className='text-2xl font-bold tracking-tight text-card-foreground md:text-3xl'>Nasze realizacje</h2>
                    <p className='mt-3 leading-relaxed text-muted-foreground'>
                        Zobacz przykładowe montaże i estetykę wykonania naszych instalacji.
                    </p>
                </div>

                <div className="flex justify-start">
                    <Button
                        onClick={showGallery}
                        variant={galleryShown ? "outline" : "default"}
                        className={galleryShown ? undefined : "bg-accent text-accent-foreground hover:bg-accent/90"}
                        aria-expanded={galleryShown}
                        aria-controls="service-gallery"
                    >
                        {galleryShown ? "Ukryj galerię" : "Pokaż galerię zdjęć"}
                    </Button>
                </div>

                <div
                    id="service-gallery"
                    className={cn(
                        "grid overflow-hidden transition-[grid-template-rows,opacity,margin-top] duration-500 ease-out",
                        galleryShown ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    )}
                >
                    <div className="min-h-0">
                        <ImageGallery
                            items={galleryItems}
                            additionalClass="service-image-gallery"
                            showThumbnails={!isMobile}
                            showPlayButton={true}
                            showFullscreenButton={true}
                            useBrowserFullscreen={true}
                        />
                    </div>
                </div>
            </div>
                </Wrapper>
        
  );
}