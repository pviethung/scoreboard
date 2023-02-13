import {
  BroadCast,
  BroadCastTypes,
  BROASCAST_ID,
  ClientToServerEvents,
  ServerToClientEvents,
  SOCKET_URL,
  UpdateAppProgess,
  UpdateItemInUse
} from '@/types/BroadCast';
import { Item } from '@/types/Item';
import { ListenTypes } from '@/types/ListenTypes';
import { Player } from '@/types/Player';
import { useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useListenPlayers = (listenType?: ListenTypes) => {
  const [players, setPlayers] = useState<Player[] | null>(null);
  const broadcast = useMemo(() => new BroadcastChannel(BROASCAST_ID), []);
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(
    () => io(SOCKET_URL),
    [listenType]
  );

  useEffect(() => {
    if (listenType && listenType === 'online') {
      socket.on(BroadCastTypes.GET_PLAYERS, (players) => {
        setPlayers(players);
      });
      return () => {
        socket.close();
      };
    }

    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.GET_PLAYERS) {
        setPlayers(e.data.data);
      }
    };
    return () => broadcast.close();
  }, [listenType]);

  return players;
};
export const postPlayers = (players: Player[]) => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io(SOCKET_URL);

  socket.emit(BroadCastTypes.GET_PLAYERS, players);
  broadcast.postMessage({
    type: BroadCastTypes.GET_PLAYERS,
    data: players,
  });
};


export const useListenUpdateItemInUse = (listenType?: ListenTypes) => {
  const [updateData, setUpdateData] = useState<UpdateItemInUse['data'] | null>(
    null
  );
  const broadcast = useMemo(() => new BroadcastChannel(BROASCAST_ID), []);
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(
    () => io(SOCKET_URL),
    [listenType]
  );

  useEffect(() => {
    if (listenType && listenType === 'online') {
      socket.on(BroadCastTypes.UPDATE_ITEM_IN_USE, (data) => {
        setUpdateData(data);
      });
      return () => {
        socket.close();
      };
    }

    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.UPDATE_ITEM_IN_USE) {
        setUpdateData(e.data.data);
      }
    };
    return () => broadcast.close();
  }, [listenType]);

  return updateData;
};
export const postUpdateItemInUse = (data: {
  playerId: string;
  item: Item | null;
}) => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io(SOCKET_URL);

  socket.emit(BroadCastTypes.UPDATE_ITEM_IN_USE, data);
  broadcast.postMessage({
    type: BroadCastTypes.UPDATE_ITEM_IN_USE,
    data,
  });
};

export const useListenAppProgress = (listenType?: ListenTypes) => {
  const [data, setData] = useState<UpdateAppProgess['data'] | null>(null);
  const broadcast = useMemo(() => new BroadcastChannel(BROASCAST_ID), []);
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(
    () => io(SOCKET_URL),
    [listenType]
  );

  useEffect(() => {
    if (listenType && listenType === 'online') {
      socket.on(BroadCastTypes.APP_PROGRESS, (data) => {
        setData(data);
      });
      return () => {
        socket.close();
      };
    }

    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.APP_PROGRESS) {
        setData(e.data.data);
      }
    };
    return () => broadcast.close();
  }, [listenType]);

  return data;
};
export const postProgress = (data: UpdateAppProgess['data']) => {
  const broadcast = new BroadcastChannel(BROASCAST_ID);
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io(SOCKET_URL);

  socket.emit(BroadCastTypes.APP_PROGRESS, data);
  broadcast.postMessage({
    type: BroadCastTypes.APP_PROGRESS,
    data,
  });
};

export const useListenNewConnection = (
  players: Player[],
  progress: UpdateAppProgess['data'] | null,
  itemInUse: UpdateItemInUse['data'] | null
) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(
    () => io(SOCKET_URL),
    [players, progress]
  );

  useEffect(() => {
    socket.on(BroadCastTypes.NEW_CONNECTION, () => {
      socket.emit(BroadCastTypes.GET_DATA_FOR_NEW_CONNECTION, {
        players,
        progress,
        itemInUse
      });
    });
    return () => {
      socket.close();
    };
  }, [players, progress]);
};
export const postNewConnection = () => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io(SOCKET_URL);
  socket.emit(BroadCastTypes.NEW_CONNECTION);
};
