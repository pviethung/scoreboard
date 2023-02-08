import { Item } from "@/types/Item";
import { Player } from "@/types/Player";

export interface Answer {
    usedItem: Item | null;
    earnedPoint: number;
    status?: {
        "beAttacked": {
            by: Player,
            point: number
        } | null,
        "beStriked": {
            by: Player,
            point: number
        } | null,
        "beSwapped": {
            with: Player,
            srcItem: Item,
            desItem: Item
        } | null
    }
}

