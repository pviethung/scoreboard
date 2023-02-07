export type ItemValue = 'plus' | 'extra' | 'bonus' | 'shield' | 'nope' | 'attack' | 'strike' | 'double_bet' | 'avatar' | 'swap'

export interface Item {
  // calculateFn: (beforeCal: number) => number;
  avatar: string;
  desc: string;
  value: ItemValue;
  label: string;
}
