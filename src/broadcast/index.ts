import { BroadCast, BroadCastTypes, BROASCAST_ID, UpdateAppProgess, UpdateItemInUse } from '@/types/BroadCast';
import { Item } from '@/types/Item';
import { Player } from '@/types/Player';
import { useEffect, useMemo, useState } from 'react';

export const useListenPlayers = () => {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const broadcast = new BroadcastChannel(BROASCAST_ID);

  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
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

export const useListenAppStop = () => {
  const [appStopped, setAppStopped] = useState<boolean>(false);

  const broadcast = new BroadcastChannel(BROASCAST_ID);
  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.STOP_APP) {
        setAppStopped(true);
      }
    };
    return () => broadcast.close();
  }, [broadcast]);

  return appStopped;
};

export const postAppStop = () => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  broadcast.postMessage({
    type: BroadCastTypes.STOP_APP,
  });
};

export const useListenAppRestart = () => {
  const [appRestarted, setAppRestarted] = useState<boolean>(false);
  const broadcast = new BroadcastChannel(BROASCAST_ID);

  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.RESTAR_APP) {
        setAppRestarted(true);
      }
    };
    return () => broadcast.close();
  }, [broadcast]);

  return appRestarted;
};

export const postAppRestart = () => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  broadcast.postMessage({
    type: BroadCastTypes.RESTAR_APP,
  });
};

export const useListenAppProgress = () => {
  const [data, setData] = useState<UpdateAppProgess['data'] | null>(null);
  const broadcast = useMemo(() => new BroadcastChannel(BROASCAST_ID), []);

  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.APP_PROGRESS) {
        setData(e.data.data);
      }
    };
    return () => broadcast.close();
  }, []);

  return data;
};

export const postProgress = (data: UpdateAppProgess['data']) => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  broadcast.postMessage({
    type: BroadCastTypes.APP_PROGRESS,
    data
  });
}