'use client'

import { useEffect, useState } from "react"

export type GalleryImage = {
    id: number,
    image_url: string,
    service: string,
    order: number
}

export default function useGallery(service?: string) {
    const [images, setImages] = useState<Array<GalleryImage>>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const params = service ? `?service=${service}` : ''

        fetch(`http://127.0.0.1:8000/api/gallery${params}`)
            .then(res => res.json())
            .then(data => {
                setImages(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [service])

    return { images, loading }
}
