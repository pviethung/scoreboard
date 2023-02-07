import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface RoundsSlice {

}

/*
    [
       [
        {id: string, earnedPoint: number, calculateFn: () => {}}
       ],
    ]
*/
const createRoundsSlice: StateCreator<RoundsSlice, [], [], RoundsSlice> = (
  set
) => ({
  
});

const usePlayersSlice = create<RoundsSlice>()(immer(createRoundsSlice));
