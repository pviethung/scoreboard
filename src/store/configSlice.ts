import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ConfigSlice {
    initialPoint: number,
    numOfQuest: number,
    timePerQuest: number, // seconds
    appInitialized: boolean,
    setConfig: (data: Omit<ConfigSlice, "setConfig">) => void
}

const createConfigSlice: StateCreator<ConfigSlice, [], [], ConfigSlice> = (
  set
) => ({
  initialPoint: 50,
  numOfQuest: 20,
  timePerQuest: 60,
  appInitialized: false,
  setConfig: (data) => (set((state) => {
    return {...state, ...data}
  }))
});

export const useConfigSlice = create<ConfigSlice>()(immer(createConfigSlice));
