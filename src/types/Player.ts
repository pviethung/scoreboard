export interface Player {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  prevRank: number;
  point: number; // point === 0 -> lose
}

interface PlayerItem {
  rule: string;
  icon: string;
}
