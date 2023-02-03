import { Player } from "@/types/Player"

export const BROASCAST_ID = "SCORE_CHANNEL"

export enum BroadCastTypes {
    "GET_PLAYERS",
    "ADD_PLAYER",
    "REORDER_BOARD",
    "REMOVE_PLAYER",
    "STOP_APP",
    "START_APP"
}


interface GetPlayersEvent {
    type: BroadCastTypes.GET_PLAYERS,
    data: Player[]
}
interface AddPlayerEvent {
    type: BroadCastTypes.ADD_PLAYER,
    data: Player
}
interface ReorderBoardEvent {
    type: BroadCastTypes.REORDER_BOARD,
}
interface RemovePlayerEvent {
    type: BroadCastTypes.REMOVE_PLAYER,
    data: {
        id: string
    }
}
interface StopAppEvent {
    type: BroadCastTypes.STOP_APP,
}
interface StartAppEvent {
    type: BroadCastTypes.START_APP
}


export type BroadCast = GetPlayersEvent | AddPlayerEvent | ReorderBoardEvent | RemovePlayerEvent | StopAppEvent | StartAppEvent

