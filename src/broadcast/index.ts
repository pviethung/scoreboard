import { BroadCast, BroadCastTypes, BROASCAST_ID, UpdateItemInUse } from '@/types/BroadCast';
import { Item } from '@/types/Item';
import { Player } from '@/types/Player';
import { useEffect, useState } from 'react';

export const useListenPlayers = () => {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const broadcast = new BroadcastChannel(BROASCAST_ID);

  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      console.log('broadcast listened');
      if (e.data.type === BroadCastTypes.GET_PLAYERS) {
        setPlayers(e.data.data);
      }
    };

    return () => broadcast.close();
  }, [broadcast]);

  return players;
};
export const postPlayers = (players: Player[]) => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  const clonedPlayers = players.map((p) => {
    const { itemsLeft, ...rest } = p;
    return rest;
  });
  broadcast.postMessage({
    type: BroadCastTypes.GET_PLAYERS,
    data: clonedPlayers,
  });
};

export const useListenAddPlayer = () => {
  const [addedPlayer, setAddedPlayer] = useState<Player | null>(null);
  const broadcast = new BroadcastChannel(BROASCAST_ID);

  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.ADD_PLAYER) {
        setAddedPlayer(e.data.data);
      }
    };
    return () => broadcast.close();
  }, [broadcast]);

  return addedPlayer;
};
export const postPlayer = (player: Player) => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  broadcast.postMessage({
    type: BroadCastTypes.ADD_PLAYER,
    data: player,
  });
};

export const useListenUpdateItemInUse = () => {
  const [updateData, setUpdateData] = useState<UpdateItemInUse['data'] | null>(null);

  const broadcast = new BroadcastChannel(BROASCAST_ID);
  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.UPDATE_ITEM_IN_USE) {
        setUpdateData(e.data.data);
      }
    };
    return () => broadcast.close();
  }, [broadcast]);

  return updateData;
};
export const postUpdateItemInUse = (data: { playerId: string; item: Item | null }) => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  broadcast.postMessage({
    type: BroadCastTypes.UPDATE_ITEM_IN_USE,
    data,
  });
};
