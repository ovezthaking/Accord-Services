import type { Icon } from "lucide-react"

export type LinksArrayType = Array<{ label: string, href: string}>
export type StatsArrayType = Array<{ label: string, value: string }>

export type ServicesArrayType = Array<{
    icon: typeof Icon,
    title: string,
    description: string,
    image: string,
    features: Array<string>
}>