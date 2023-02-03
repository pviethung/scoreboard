import BettedPointInput from '@/components/admin/BettedPointInput';
import Arrow from '@/components/elements/Arrow';
import Avatar from '@/components/elements/Avatar';
import { useConfigData } from '@/store/configSlice';
import { usePlayer } from '@/store/playersSlice';
import clsx from 'clsx';
import { memo } from 'react';

const PlayersListItem = ({ id }: { id: string }) => {
  const { numOfQuest, currentQuest } = useConfigData();
  const player = usePlayer(id);
  if (!player) {
    return null;
  }

  return (
    <>
      <th
        className={clsx(
          'flex items-center space-x-4 whitespace-normal pt-6 pb-14'
        )}
      >
        <div className="w-14">
          <Avatar src={player.avatar} />
        </div>
        <div className="w-56">
          <div className="text-xl line-clamp-2">{player.name}</div>
          <select>
            <option value="">Plus</option>
            <option value="">Extra</option>
            <option value="">Bonus</option>
            <option value="">Shield</option>
            <option value="">Nope</option>
            <option value="">Attack</option>
          </select>
        </div>
      </th>
      {new Array(currentQuest).fill(true).map((_, i) => (
        <td key={`${player.id}_${i}`} className={clsx('px-4')}>
          <BettedPointInput playerId={player.id} />
        </td>
      ))}
      <td
        className={clsx('px-4', {
          'hidden': currentQuest === numOfQuest,
        })}
      ></td>
      <td className={clsx('text-center', 'sticky right-[85px] z-[11]')}>
        {player.point}
      </td>
      <td className={clsx('sticky right-0 z-[11]')}>
        <div className={clsx('flex items-center justify-center gap-4')}>
          <span>{player.rank !== 0 ? player.rank : '---'}</span>
          {player.prevRank !== 0 && (
            <div className={clsx('flex w-8 items-center justify-between')}>
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
      </td>
    </>
  );
};
export default memo(PlayersListItem, (prev, next) => prev.id === next.id);
