import ItemSelect from '@/components/admin/ItemsSelect';
import { useConfigData } from '@/store/configSlice';
import { usePlayersActions } from '@/store/playersSlice';
import { Item } from '@/types/Item';
import { items } from '@/utils/getItem';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const AddItem = ({ playerId }: { playerId: string }) => {
  const [item, setItem] = useState<Item | null>(null);
  const { addItem } = usePlayersActions();
  const { currentQuest } = useConfigData();

  useEffect(() => {
    setItem(null);
  }, [currentQuest]);

  return (
    <>
      <ItemSelect
        value={item}
        placeholder={'Add an item'}
        data={items}
        onChange={(newValue) => {
          if (newValue) {
            setItem(newValue);
          } else {
            setItem(null);
          }
        }}
        isClearable={false}
      />
      <button
        className={clsx('btn-primary btn-sm btn mt-2 w-full', {
          'invisible': !item,
        })}
        onClick={() => {
          if (item) addItem(playerId, item);
        }}
      >
        Add
      </button>
    </>
  );
};
export default AddItem;
