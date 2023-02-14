import { Item } from '@/types/Item';
import { Player } from '@/types/Player';

export const BROASCAST_ID = 'SCORE_CHANNEL';
export const SOCKET_URL = 'https://scoreboard-socket-ts-production.up.railway.app/';
// export const SOCKET_URL = 'http://localhost:4000/';


// BROADCAST CHANNEL
export enum BroadCastTypes {
  'GET_PLAYERS' = 'GET_PLAYERS',
  'ADD_PLAYER' = 'ADD_PLAYER',
  'UPDATE_ITEM_IN_USE' = 'UPDATE_ITEM_IN_USE',
  'APP_PROGRESS' = 'APP_PROGRESS',
  'NEW_CONNECTION' = 'NEW_CONNECTION',
  'GET_DATA_FOR_NEW_CONNECTION' = 'GET_DATA_FOR_NEW_CONNECTION',
}

interface GetPlayersEvent {
  type: BroadCastTypes.GET_PLAYERS;
  data: Player[];
}
interface AddPlayerEvent {
  type: BroadCastTypes.ADD_PLAYER;
  data: Player;
}
export interface UpdateItemInUse {
  type: BroadCastTypes.UPDATE_ITEM_IN_USE;
  data: {
    playerId: string;
    item: Item | null;
  };
}
export interface UpdateAppProgess {
  type: BroadCastTypes.APP_PROGRESS;
  data: {
    playing: boolean;
    setting: boolean;
    currentQuest: number;
  };
}

export type BroadCast =
  | GetPlayersEvent
  | AddPlayerEvent
  | UpdateItemInUse
  | UpdateAppProgess;

// SOCKET CHANNEL
export interface ServerToClientEvents {
  [BroadCastTypes.GET_PLAYERS]: (data: GetPlayersEvent['data']) => void;
  [BroadCastTypes.APP_PROGRESS]: (data: UpdateAppProgess['data']) => void;
  [BroadCastTypes.UPDATE_ITEM_IN_USE]: (data: UpdateItemInUse['data']) => void;
  [BroadCastTypes.NEW_CONNECTION]: () => void;
}
export interface ClientToServerEvents {
  [BroadCastTypes.GET_PLAYERS]: (data: GetPlayersEvent['data']) => void;
  [BroadCastTypes.APP_PROGRESS]: (data: UpdateAppProgess['data']) => void;
  [BroadCastTypes.UPDATE_ITEM_IN_USE]: (data: UpdateItemInUse['data']) => void;
  [BroadCastTypes.NEW_CONNECTION]: () => void;
  [BroadCastTypes.GET_DATA_FOR_NEW_CONNECTION]: (data: {
    players: GetPlayersEvent['data'];
    progress: UpdateAppProgess['data'] | null;
    itemInUse: UpdateItemInUse['data'] | null;
  }) => void;
}
