import { Answer } from '@/types/Answer';
import { Item } from '@/types/Item';
import { Player } from '@/types/Player';
import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface PlayersSlice {
  players: Player[];
  actions: {
    increasePlayerPoint: (by: number, playerId: string) => void; // increase player point
    decreasePlayerPoint: (by: number, playerId: string) => void; // dcrease player point
    addPlayer: (player: Player) => void;
    reorderPlayers: () => Player[];
    resetData: () => void;
    newTurn: () => void;
    calculatePoints: () => void;
    checkRemainingItems: () => void;
    setCurrentTurnPlayerPoint: (playerId: string, earnedPoint: number) => void;
    setCurrentTurnPlayerUsedItem: (playerId: string, item: Item | null) => void;
    setCurrentTurnStatus: (playerId: string, status: Answer['status']) => void;
    swap: (
      srcPlayerId: string,
      srcItemLabel: string,
      desPlayerId: string,
      desItemLabel: string
    ) => void;
    addItem: (playerId: string, item: Item) => void;
    editPlayerPoint: (playerId: string, newPoint: number) => void;
    // addHistory: (playerId: string, history: PlayerHistory) => void;
    // pushHistory: () => void;
    // editHistory: (playerId: string, history: Partial<PlayerHistory>, historyIndex: number) => void;
  };
}

const createPlayersSlice: StateCreator<PlayersSlice, [], [], PlayersSlice> = (
  set,
  get
) => ({
  players: [],
  actions: {
    increasePlayerPoint: (by, playerId) =>
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          player.point += by;
        }
        return state;
      }),
    decreasePlayerPoint: (by, playerId) =>
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          if (player.point === 0) return state;
          player.point -= by;
        }
        return state;
      }),
    addPlayer: (player) =>
      set((state) => {
        state.players.push(player);
        console.log('add player');

        return state;
      }),
    reorderPlayers: () => {
      set((state) => {
        let idxCount = 0;

        state.players
          .sort((p1, p2) => {
            if (p2.point === p1.point) {
              return p1.name > p2.name ? 1 : -1;
            }
            return p2.point - p1.point;
          })
          .forEach((player, idx, players) => {
            player.prevRank = player.rank;
            if (idx === 0) {
            player.rank = 1;
              idxCount++;
              return;
            }
            if (player.point === players[idx - 1].point) {
              player.rank = idxCount
            } else {
              player.rank = idxCount + 1
              idxCount++;
            }
          });
        return state;
      });
      return get().players;
    },
    resetData: () => {
      set((state) => {
        state.players = [];
        return state;
      });
    },
    calculatePoints: () => {
      set((state) => {
        state.players.forEach((p) => {
          p.point += p.answers[p.answers.length - 1]
            ? p.answers[p.answers.length - 1].earnedPoint
            : 0;
        });
        return state;
      });
    },
    newTurn: () => {
      set((state) => {
        state.players.forEach((p) => {
          p.answers.push({
            earnedPoint: 0,
            usedItem: null,
          });
        });

        return state;
      });
    },
    checkRemainingItems: () => {
      set((state) => {
        state.players.forEach((p) => {
          const usedItem = p.answers[p.answers.length - 1]
            ? p.answers[p.answers.length - 1].usedItem
            : null;
          if (usedItem) {
            const itemIdx = p.itemsLeft.findIndex(
              (i) => i.value === usedItem.value
            );
            if (itemIdx !== -1) {
              p.itemsLeft.splice(itemIdx, 1);
            }
          }
        });

        return state;
      });
    },
    setCurrentTurnPlayerUsedItem: (playerId, item) => {
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          player.answers[player.answers.length - 1].usedItem = item;
        }

        return state;
      });
    },
    setCurrentTurnPlayerPoint: (playerId, earnedPoint) => {
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          player.answers[player.answers.length - 1].earnedPoint = earnedPoint;
        }

        return state;
      });
    },
    setCurrentTurnStatus: (playerId, status) => {
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        state.players.forEach(p => {
          const latestAnswer = p.answers[p.answers.length - 1];
          if(latestAnswer.status) {
            if(latestAnswer.status.beAttacked && latestAnswer.status.beAttacked.by.id === status?.beAttacked?.by.id) {
              latestAnswer.status.beAttacked = null;
            }

            if(latestAnswer.status.beStriked && latestAnswer.status.beStriked.by.id === status?.beStriked?.by.id) {
              latestAnswer.status.beStriked = null;
            }

            if(latestAnswer.status.beSwapped && latestAnswer.status.beSwapped.with.id === status?.beSwapped?.with.id) {
              latestAnswer.status.beSwapped = null;
            }

          }


          // if(p.answers[p.answers.length - 1]?.status?.beAttacked?.by.id === status?.beAttacked?.by.id) {
          //   p.answers[p.answers.length - 1].status!.beAttacked = null;
          // }
          // if(p.answers[p.answers.length - 1]?.status?.beStriked?.by.id === status?.beStriked?.by.id) {
          //   p.answers[p.answers.length - 1].status!.beStriked = null;
          // }
        })

        if (player) {
          player.answers[player.answers.length - 1].status = status;
          const lostPoint = status?.beAttacked?.point || 0;
          player.point -= lostPoint;
        }
        return state;
      });
    },
    swap: (srcPlayerId, srcItemLabel, desPlayerId, desItemLabel) => {
      set((state) => {
        const srcPlayer = state.players.find((p) => p.id === srcPlayerId);
        const desPlayer = state.players.find((p) => p.id === desPlayerId);

        if (!srcPlayer || !desPlayer) {
          return state;
        }

        const srcItemIdx = srcPlayer.itemsLeft.findIndex(
          (i) => i.label == srcItemLabel
        );
        const srcItem = srcPlayer.itemsLeft.splice(srcItemIdx, 1)[0];

        const desItemIdx = desPlayer.itemsLeft.findIndex(
          (i) => i.label === desItemLabel
        );
        const desItem = desPlayer.itemsLeft.splice(desItemIdx, 1, srcItem)[0];

        srcPlayer.itemsLeft.splice(srcItemIdx, 0, desItem);

        // delete swap item
        const swapItemIdx = srcPlayer.itemsLeft.findIndex(
          (i) => i.value === 'swap'
        );
        srcPlayer.itemsLeft.splice(swapItemIdx, 1);

        return state;
      });
    },
    addItem: (playerId, item) => {
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          const hasItem = player.itemsLeft.find((i) => i.value === item.value);
          if (!hasItem) player?.itemsLeft.push(item);
        }

        return state;
      });
    },
    editPlayerPoint: (playerId, newPoint) => {
      set((state) => {
        const player = state.players.find((p) => p.id === playerId);
        if (player) {
          player.point = newPoint;
        }
        return state;
      });
    },
  },
});

const usePlayersSlice = create<PlayersSlice>()(immer(createPlayersSlice));
export const usePlayersActions = () =>
  usePlayersSlice((state) => state.actions);
export const usePlayers = () => usePlayersSlice((state) => state.players);
export const usePlayer = (id: string) =>
  usePlayersSlice((state) => state.players.find((p) => p.id === id));
