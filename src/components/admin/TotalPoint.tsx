import { usePlayersActions } from '@/store/playersSlice';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const TotalPoint = ({
  playerId,
  point,
}: {
  playerId: string;
  point: number;
}) => {
  const [value, setValue] = useState(point);
  const [disabled, setDisabled] = useState(true);
  const { editPlayerPoint } = usePlayersActions();

  useEffect(() => {
    setValue(point);
  }, [point]);

  return (
    <div className={clsx('group flex flex-col')}>
      <input
        type="number"
        step={10}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          setValue(+e.target.value);
        }}
        className={clsx('h-8 text-center')}
      />

      <button
        className={clsx('btn-primary btn-sm btn mt-2 hidden group-hover:block')}
        onClick={() => {
          if (disabled) {
            setDisabled(false);
          } else {
            editPlayerPoint(playerId, value);
            setDisabled(true);
          }
        }}
      >
        {disabled ? 'Edit' : 'Confirm'}
      </button>
    </div>
  );
};
export default TotalPoint;
