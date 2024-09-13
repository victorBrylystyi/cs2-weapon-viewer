import { Vector3Tuple } from "three"


export type Presets = "sunset" | "dawn" | "night" | "warehouse" | "forest" | "apartment" | "studio" | "city" | "park" | "lobby" | undefined

export type Annotation = {
    position: Vector3Tuple
    title: string
    dofTarget: Vector3Tuple
}

export type ConfigType = {
    [key: string]: Annotation[]
}

export type StoreType = {
    selectedAnnotation: string | null
    damping: boolean
    config: ConfigType
}