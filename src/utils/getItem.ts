import { Item, ItemValue } from '@/types/Item';

export const items: Item[] = [
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/1721/1721540.png',
    desc: 'Ngoài số điểm đặt cược, Đội của bạn được cộng thêm 10đ khi trả lời đúng (10đ này không bị trừ nếu trả lời sai',
    label: 'Plus',
    value: 'plus',
    // calculateFn: (beforeCal: number) => {
    //   if (beforeCal < 0) return beforeCal;
    //   return beforeCal + 10;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/5622/5622845.png',
    desc: 'Ngoài số điểm đặt cược, Đội của bạn được cộng thêm 20đ khi trả lời đúng (20đ này không bị trừ nếu trả lời sai',
    label: 'Extra',
    value: 'extra',
    // calculateFn: (beforeCal: number) => {
    //   if (beforeCal < 0) return beforeCal;
    //   return beforeCal + 20;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/9092/9092455.png',
    desc: 'Ngoài số điểm đặt cược, Đội của bạn được cộng thêm 30đ khi trả lời đúng (30đ này không bị trừ nếu trả lời sai',
    label: 'Bonus',
    value: 'bonus',
    // calculateFn: (beforeCal: number) => {
    //   if (beforeCal < 0) return beforeCal;
    //   return beforeCal + 30;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/1959/1959460.png',
    desc: 'Đội của bạn không bị mất điểm khi trả lời sai ở lượt câu hỏi này',
    label: 'Shield',
    value: 'shield',
    // calculateFn: (beforeCal: number) => {
    //   if (beforeCal < 0) return 0;
    //   return beforeCal;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/8632/8632541.png',
    desc: 'Đội của bạn không bị tác động bởi các vật phẩm của đội khác trong lượt câu hỏi này',
    label: 'Nope',
    value: 'nope',
    // calculateFn: (beforeCal: number) => {
    //   return beforeCal;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/2746/2746930.png',
    desc: 'Yêu cầu dành cho 1 đội đối thủ: (Câu hỏi BTC chuẩn bị) Nếu không thực hiện được thì bị trừ 20đ',
    label: 'Attack',
    value: 'attack',
    // calculateFn: (beforeCal: number) => {
    //   return beforeCal;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/3392/3392750.png',
    desc: 'Yêu cầu dành cho 1 đội đối thủ: (Câu hỏi BTC chuẩn bị) Nếu đội đó không thực hiện được, bạn được chỉ định 1 thành viên bước ra ngoài và không tham gia trong lượt câu hỏi này',
    label: 'Strike',
    value: 'strike',
    // calculateFn: (beforeCal: number) => {
    //   return beforeCal;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/6482/6482271.png',
    desc: 'Có thể cược Tối Đa 200% - Nếu trả lời sai thì bị trừ 50% số điểm hiện có',
    label: 'Double Bet',
    value: 'double_bet',
    // calculateFn: (beforeCal: number) => {
    //   if (beforeCal < 0) {
    //     // TODO
    //   }
    //   return beforeCal;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/9194/9194865.png',
    desc: 'Bạn có thể mời một bạn khán giả bất kỳ tham gia đội mình để trả lời câu hỏi này',
    label: 'Rescue',
    value: 'rescue',
    // calculateFn: (beforeCal: number) => {
    //   return beforeCal;
    // },
  },
  {
    avatar: 'https://cdn-icons-png.flaticon.com/512/3466/3466282.png',
    desc: 'Trao đổi 1 vật phẩm trên tay bạn với 1 vật phẩm bất kỳ của một đội khác',
    label: 'Swap',
    value: 'swap',
  },
];

const calcFns = {
  'plus': (beforeCal: number) => {
    if (beforeCal < 0) return beforeCal;
    return beforeCal + 10;
  },
  'extra': (beforeCal: number) => {
    if (beforeCal < 0) return beforeCal;
    return beforeCal + 20;
  },
  'bonus': (beforeCal: number) => {
    if (beforeCal < 0) return beforeCal;
    return beforeCal + 30;
  },
  'shield': (beforeCal: number) => {
    if (beforeCal < 0) return 0;
    return beforeCal;
  },
  'nope': (beforeCal: number) => {
    return beforeCal
  },
  'attack': (beforeCal: number) => {
    return beforeCal
  },
  'strike': (beforeCal: number) => {
    return beforeCal
  },
  'double_bet': (beforeCal: number) => {
    return beforeCal;
  },
  'rescue': (beforeCal: number) => {
    return beforeCal
  },
  'swap': (beforeCal: number) => {
    return beforeCal
  },
};

export const getItem = (value: string) => {
  return items.find((i) => i.value === value);
};

export const getItemCalcFn = (key: ItemValue) => {
  return calcFns[key]
};
