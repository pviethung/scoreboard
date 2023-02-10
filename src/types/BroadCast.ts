import { Item } from '@/types/Item';
import { Player } from '@/types/Player';

export const BROASCAST_ID = 'SCORE_CHANNEL';
export const SOCKET_URL = 'http://localhost:3000/';

// BROADCAST CHANNEL
export enum BroadCastTypes {
  'GET_PLAYERS' = 'GET_PLAYERS',
  'ADD_PLAYER' = 'ADD_PLAYER',
  'UPDATE_ITEM_IN_USE' = 'UPDATE_ITEM_IN_USE',
  'REORDER_BOARD' = 'REORDER_BOARD',
  'REMOVE_PLAYER' = 'REMOVE_PLAYER',
  'STOP_APP' = 'STOP_APP',
  'START_APP' = 'START_APP',
  'RESTAR_APP' = 'RESTAR_APP',
  'APP_PROGRESS' = 'APP_PROGRESS',
}

interface GetPlayersEvent {
  type: BroadCastTypes.GET_PLAYERS;
  data: Player[];
}
interface AddPlayerEvent {
  type: BroadCastTypes.ADD_PLAYER;
  data: Player;
}
interface ReorderBoardEvent {
  type: BroadCastTypes.REORDER_BOARD;
}
interface RemovePlayerEvent {
  type: BroadCastTypes.REMOVE_PLAYER;
  data: {
    id: string;
  };
}
interface StopAppEvent {
  type: BroadCastTypes.STOP_APP;
}
interface StartAppEvent {
  type: BroadCastTypes.START_APP;
}
interface RestartAppEvent {
  type: BroadCastTypes.RESTAR_APP;
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
  | ReorderBoardEvent
  | RemovePlayerEvent
  | StopAppEvent
  | StartAppEvent
  | UpdateItemInUse
  | RestartAppEvent
  | UpdateAppProgess;

// SOCKET CHANNEL
export interface ServerToClientEvents {
  [BroadCastTypes.GET_PLAYERS]: (data: GetPlayersEvent['data']) => void;
  [BroadCastTypes.APP_PROGRESS]: (data: UpdateAppProgess['data']) => void;
  [BroadCastTypes.UPDATE_ITEM_IN_USE]: (data: UpdateItemInUse['data']) => void;
}
export interface ClientToServerEvents {
  [BroadCastTypes.GET_PLAYERS]: (data: GetPlayersEvent['data']) => void;
  [BroadCastTypes.APP_PROGRESS]: (data: UpdateAppProgess['data']) => void;
  [BroadCastTypes.UPDATE_ITEM_IN_USE]: (data: UpdateItemInUse['data']) => void;
}
export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
