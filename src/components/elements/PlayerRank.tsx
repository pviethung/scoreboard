import Arrow from '@/components/elements/Arrow';
import { Player } from '@/types/Player';
import clsx from 'clsx';

const PlayerRank = ({
  player,
  hideRank,
}: {
  player: Player;
  hideRank?: boolean;
}) => {
  return (
    <div className={clsx('flex items-center justify-center gap-4')}>
      {!hideRank && <span>{player.rank !== 0 ? player.rank : '---'}</span>}
      {player.prevRank !== 0 && (
        <div
          className={clsx('flex w-8 items-center', {
            'justify-between': player.rank !== player.prevRank,
            'justify-center': player.rank === player.prevRank,
          })}
        >
          {player.rank > player.prevRank ? (
            <>
              <Arrow isDown={true} />
              <span className={clsx('text-red-500')}>
                {Math.abs(player.rank - player.prevRank)}
              </span>
            </>
          ) : player.rank < player.prevRank ? (
            <>
              <Arrow isDown={false} />
              <span className={clsx('text-green-500')}>
                {Math.abs(player.rank - player.prevRank)}
              </span>
            </>
          ) : (
            <span className={clsx('text-xl')}>--</span>
          )}
        </div>
      )}
    </div>
  );
};
export default PlayerRank;
