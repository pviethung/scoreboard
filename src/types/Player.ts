export interface Player {
    id: string,
    name: string,
    avatar: string,
    rank: Number,
    point: number,
    isLost: boolean,
    items?: {
        "plus": {}
    }
}

interface PlayerItem {
    rule: string
    icon: string
}