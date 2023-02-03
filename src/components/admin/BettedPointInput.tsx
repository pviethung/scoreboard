import { usePlayersActions } from '@/store/playersSlice';
import clsx from 'clsx';
import { memo, useState } from 'react';

const BettedPointInput = ({ playerId }: { playerId: string }) => {
  const { decrease, increase } = usePlayersActions();
  const [bettedPoint, setBettedPoint] = useState(10);
  const [earnedPoint, setEarnedPoint] = useState(0);

  console.log('render');

  return (
    <>
      <div className={clsx('flex')}>
        <button
          className={clsx(
            'btn-primary btn rounded-tr-none rounded-br-none px-4 text-3xl ',
            {
              'btn-disabled': earnedPoint < 0,
            }
          )}
          onClick={(e) => {
            decrease(bettedPoint, playerId);
            setEarnedPoint((prev) => prev - bettedPoint);
          }}
        >
          -
        </button>
        <input
          className={clsx('w-20 flex-1 text-center')}
          type="text"
          value={bettedPoint}
          onChange={(e) => setBettedPoint(+e.target.value)}
        />
        <button
          className={clsx(
            'btn-primary btn rounded-tl-none rounded-bl-none px-4 text-3xl',
            {
              'btn-disabled': earnedPoint > 0,
            }
          )}
          onClick={(e) => {
            increase(bettedPoint, playerId);
            setEarnedPoint((prev) => prev + bettedPoint);
          }}
        >
          +
        </button>
      </div>
      <p
        className={clsx('mt-4 w-full text-center', {
          'text-green-500': earnedPoint > 0,
          'text-red-500': earnedPoint < 0,
        })}
      >
        {earnedPoint === 0
          ? '---'
          : earnedPoint > 0
          ? `+${earnedPoint} point`
          : `${earnedPoint} point`}
      </p>
    </>
  );
};
export default memo(
  BettedPointInput,
  (prev, next) => prev.playerId === next.playerId
);
