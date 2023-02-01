import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Player } from '../types/Player';

interface PlayersSlice {
  players: Player[];
  increase: (by: number, playerId: string) => void; // increase player point
  decrease: (by: number, playerId: string) => void; // dcrease player point
  add: (player: Player) => void;
}

const createPlayersSlice: StateCreator<PlayersSlice, [], [], PlayersSlice> = (
  set
) => ({
  players: [],
  increase: (by, playerId) =>
    set((state) => {
      const player = state.players.find((p) => p.id === playerId);
      if (player) {
        player.point += by;
      }
      return state;
    }),
  decrease: (by, playerId) =>
    set((state) => {
      const player = state.players.find((p) => p.id === playerId);
      if (player) {
        player.point -= by;
      }
      return state;
    }),
  add: (player) =>
    set((state) => {
      state.players.push(player);
      return state;
    }),
});

export const usePlayersSlice = create<PlayersSlice>()(
  immer(createPlayersSlice)
);
export const usePlayersActions = () => usePlayersSlice((state) => ({
  decrease: state.decrease,
  increase: state.increase,
}));

export const usePlayersData = () => usePlayersSlice((state) => ({
  players: state.players,
}));
