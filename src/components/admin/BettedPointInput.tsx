import { usePlayersActions } from '@/store/playersSlice';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

const BettedPointInput = ({ playerId }: { playerId: string }) => {
  const { increase, decrease } = usePlayersActions();
  const [bettedPoint, setBettedPoint] = useState(10);

  console.log(increase, decrease);

  useEffect(() => {
    console.log('heelo 1');
    return () => {};
  }, [increase]);

  useEffect(() => {
    console.log('heelo 2');
    console.log(decrease);
    return () => {};
  }, [decrease]);

  useEffect(() => {
    console.log('heelo 3');

    console.log(bettedPoint);
    return () => {};
  }, [bettedPoint]);

  console.log('render');

  return (
    <div className={clsx('flex')}>
      <>
        <button
          className={clsx(
            'btn-primary btn rounded-tr-none rounded-br-none px-4 text-3xl '
          )}
          onClick={(e) => {
            decrease(bettedPoint, playerId);
          }}
        >
          -
        </button>
        <input
          className={clsx('text-center')}
          type="text"
          value={bettedPoint}
          onChange={(e) => setBettedPoint(+e.target.value)}
        />
        <button
          className={clsx(
            'btn-primary btn rounded-tl-none rounded-bl-none px-4 text-3xl '
          )}
          onClick={(e) => {
            increase(bettedPoint, playerId);
          }}
        >
          +
        </button>
      </>
    </div>
  );
};
export default memo(BettedPointInput, (prev, next) => {
  console.log('prev', prev);
  console.log('next', next);
  const render = prev.playerId === next.playerId;
  return true;
});
