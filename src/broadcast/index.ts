import { BroadCast, BroadCastTypes, BROASCAST_ID } from '@/types/BroadCast';
import { Player } from '@/types/Player';
import { useEffect, useState } from 'react';


export const broadcast = new BroadcastChannel(BROASCAST_ID);


export const useListenPlayers = () => {
  const [players, setPlayers] = useState<Player[] | null>(null);
  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
     console.log('broadcast listened');
      if (e.data.type === BroadCastTypes.GET_PLAYERS) {
        setPlayers(e.data.data);
      }
    };

    return () => broadcast.close()
  }, [broadcast]);

  return players
};
export const postPlayers = (players: Player[]) => {
  broadcast.postMessage({
    type: BroadCastTypes.GET_PLAYERS,
    data: players,
  });
}

export const useListenAddPlayer = () => {
  const [addedPlayer, setAddedPlayer] = useState<Player | null>(null);
  useEffect(() => {
    broadcast.onmessage = (e: MessageEvent<BroadCast>) => {
      if (e.data.type === BroadCastTypes.ADD_PLAYER) {
        setAddedPlayer(e.data.data);
      }
    };
    return () => broadcast.close()
  }, [broadcast]);

  return addedPlayer;
};
export const postPlayer = (player: Player) => {
  broadcast.postMessage({
    type: BroadCastTypes.ADD_PLAYER,
    data: player,
  });
}

