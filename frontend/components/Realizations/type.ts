export type Realization = {
    id: number,
    title: string,
    description: string,
    city: string,
    city_slug: string,
    service: string,
    cover_image_url: string,
    device_model: string,
    area_m2: number | null
}

export type RealizationsGridProps = {
    citySlug?: string,
    service?: string,
    limit?: number
}
