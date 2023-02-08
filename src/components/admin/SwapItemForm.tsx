import ItemSelect from '@/components/admin/ItemsSelect';
import PlayersSelect from '@/components/admin/PlayersSelect';
import { usePlayers, usePlayersActions } from '@/store/playersSlice';
import { Item } from '@/types/Item';
import { Player } from '@/types/Player';
import clsx from 'clsx';
import { useState } from 'react';
import { toast, Toast } from 'react-hot-toast';

const SwapItemForm = ({
  toastObj,
  srcPlayer,
  onClose,
}: {
  toastObj: Toast;
  srcPlayer: Player;
  onClose: () => void;
}) => {
  const players = usePlayers();
  const desPlayers = players
    .filter((p) => p.id !== srcPlayer.id)
    .map((p) => {
      return {
        label: p.name,
        value: p,
      };
    });
  const [srcItem, setSrcItem] = useState<Item | null>(null);
  const [desPlayer, setDesPlayer] = useState<Player | null>(null);
  const [desItem, setDesItem] = useState<Item | null>(null);
  const { swap } = usePlayersActions();
  const data = srcPlayer.itemsLeft.filter((i) => i.value !== 'swap');

  if (data.length === 0) {
    return (
      <div className={clsx('flex flex-col items-center space-y-4')}>
        <div>This player has no items to swap</div>
        <div className={clsx('flex justify-between')}>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
              toast.dismiss(toastObj.id);
            }}
            className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4  dark:hover:bg-red-500 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Item from {srcPlayer.name}
        </label>
        <ItemSelect
          isClearable={false}
          data={data}
          onChange={(newValue, action) => {
            if (newValue) {
              setSrcItem(newValue);
            } else {
              setSrcItem(null);
            }
          }}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Swap with
        </label>
        <PlayersSelect
          data={desPlayers}
          isClearable={false}
          onChange={(newValue, action) => {
            if (newValue) {
              setDesPlayer(newValue.value);
            } else {
              setDesPlayer(null);
            }
            setDesItem(null);
          }}
        />
      </div>
      <div className="mb-6">
        {desPlayer && (
          <>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Item from {desPlayer.name}
            </label>
            <ItemSelect
              isClearable={false}
              data={desPlayer.itemsLeft}
              value={desItem}
              onChange={(newValue, action) => {
                if (newValue) {
                  setDesItem(newValue);
                } else {
                  setDesItem(null);
                }
              }}
            />
          </>
        )}
      </div>
      <div className={clsx('flex justify-between')}>
        <button
          onClick={(e) => {
            e.preventDefault();
            onClose();
            toast.dismiss(toastObj.id);
          }}
          className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4  dark:hover:bg-red-500 sm:w-auto"
        >
          Close
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (srcItem?.label && desPlayer?.id && desItem?.label) {
              swap(srcPlayer.id, srcItem.label, desPlayer.id, desItem.label);
            }

            toast.dismiss(toastObj.id);
          }}
          className={clsx(
            'focus:ring-blue-300s w-full rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium  text-white focus:outline-none focus:ring-4 dark:hover:bg-green-500 sm:w-auto',
            {
              'invisible': !srcPlayer || !srcItem || !desPlayer || !desItem,
            }
          )}
        >
          Swap
        </button>
      </div>
    </div>
  );
};

export default SwapItemForm;
