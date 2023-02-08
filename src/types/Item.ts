export type ItemValue = 'plus' | 'extra' | 'bonus' | 'shield' | 'nope' | 'attack' | 'strike' | 'double_bet' | 'rescue' | 'swap'

export interface Item {
  avatar: string;
  desc: string;
  value: ItemValue;
  label: string;
  gif: string;
}
