import { ListenTypes } from '@/types/ListenTypes';
import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ListenTypesSlice {
  type: ListenTypes;
  actions: {
    setType: (type: ListenTypes) => void;
  };
}

const initialState: Omit<ListenTypesSlice, 'actions'> = {
  type: 'offline',
};

const createListenSlice: StateCreator<
  ListenTypesSlice,
  [],
  [],
  ListenTypesSlice
> = (set) => ({
  ...initialState,
  actions: {
    setType: (type) =>
      set((state) => {
        state.type = type
        return state;
      }),
  },
});

const useListenTypesSlice = create<ListenTypesSlice>()(
  immer(createListenSlice)
);
export const useListenTypesActions = () =>
  useListenTypesSlice((state) => state.actions);
export const useListenType = () =>
  useListenTypesSlice((state) => state.type);
