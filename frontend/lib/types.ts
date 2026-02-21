import type { LucideIcon } from "lucide-react"

export type LinksArrayType = Array<{ label: string, href: string}>
export type StatsArrayType = Array<{ label: string, value: string }>

export type ServicesArrayType = Array<{
    icon: LucideIcon,
    title: string,
    description: string,
    image: string,
    features: Array<string>
}>

export type contactInfoType = Array<{
    icon: LucideIcon,
    label: string,
    value: string,
    href?: string
}>
