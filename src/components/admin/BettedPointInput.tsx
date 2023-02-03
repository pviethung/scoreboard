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
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 16 16"
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
          </svg>
        </button>
        <input
          className={clsx('w-20 flex-1 pl-4 text-center')}
          type="number"
          step={10}
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
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 16 16"
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
          </svg>
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
