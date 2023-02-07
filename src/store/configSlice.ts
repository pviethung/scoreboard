import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

interface ConfigSlice {
  initialPoint: number;
  numOfQuest: number;
  numOfTeam: number;
  currentQuest: number;
  timePerQuest: number; // seconds
  appInitialized: boolean;
  playing: boolean;
  actions: {
    setConfig: (data: Omit<ConfigSlice, 'actions' | 'currentQuest'>) => void;
    addQuest: () => void;
    start: () => void;
    stop: () => void;
    restart: () => void;
  };
}

const initialState = {
  initialPoint: 50,
  numOfQuest: Infinity,
  numOfTeam: 5,
  timePerQuest: 60,
  currentQuest: 0,
  appInitialized: false,
  playing: false,
};

const createConfigSlice: StateCreator<ConfigSlice, [], [], ConfigSlice> = (
  set
) => ({
  ...initialState,
  actions: {
    setConfig: (data) =>
      set((state) => {
        return { ...state, ...data };
      }),
    addQuest: () => {
      set((state) => {
        state.currentQuest++;
        return state;
      });
    },
    start: () =>
      set((state) => {
        state.playing = true;
        return state;
      }),
    stop: () =>
      set((state) => {
        state.playing = false;
        return state;
      }),
    restart: () => {
      set((state) => {
        state = { ...initialState, actions: state.actions };
        return state;
      });
    },
  },
});

const useConfigSlice = create<ConfigSlice>()(immer(createConfigSlice));
export const useConfigActions = () => useConfigSlice((state) => state.actions);
export const useConfigData = () =>
  useConfigSlice((state) => {
    const { actions, ...data } = state;
    return data;
  }, shallow);
