import { Answer } from '@/types/Answer';
import { Item } from '@/types/Item';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  prevRank: number;
  point: number; // point === 0 -> lose
  answers: Answer[];
  itemsLeft: Item[];
}
