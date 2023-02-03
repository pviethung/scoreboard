import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Player } from '../types/Player';

interface PlayersSlice {
  players: Player[];
  actions: {
    increase: (by: number, playerId: string) => void; // increase player point
    decrease: (by: number, playerId: string) => void; // dcrease player point
    add: (player: Player) => void;
    reorder: () => Player[];
    restart: () => void
  };
}

const createPlayersSlice: StateCreator<PlayersSlice, [], [], PlayersSlice> = (
  set, get
) => ({
  players: [],
  actions: {
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
          if (player.point === 0) return state;
          player.point -= by;
        }
        return state;
      }),
    add: (player) =>
      set((state) => {
        state.players.push(player);
        console.log('add player');

        return state;
      }),
    reorder: () => {
      set((state) => {
        state.players
          .sort((p1, p2) => {
            if (p2.point === p1.point) {
              return p1.name > p2.name ? 1 : -1;
            }
            return p2.point - p1.point;
          })
          .forEach((player, idx) => {
            player.prevRank = player.rank;
            player.rank = idx + 1;
          });
        return state;
      });
      return get().players
    },
    restart: () => {
      set(state => {
        state.players = []
        return state
      })
    }
  },
});

const usePlayersSlice = create<PlayersSlice>()(immer(createPlayersSlice));
export const usePlayersActions = () =>
  usePlayersSlice((state) => state.actions);

export const usePlayers = () => usePlayersSlice((state) => state.players);
export const usePlayer = (id: string) =>
  usePlayersSlice((state) => state.players.find((p) => p.id === id));
