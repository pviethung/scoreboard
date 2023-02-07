import AddItem from '@/components/admin/AddItem';
import AnswerInput from '@/components/admin/AnswerInput';
import TotalPoint from '@/components/admin/TotalPoint';
import Avatar from '@/components/elements/Avatar';
import PlayerRank from '@/components/elements/PlayerRank';
import { useConfigData } from '@/store/configSlice';
import { usePlayer } from '@/store/playersSlice';
import clsx from 'clsx';
import { memo } from 'react';

const PlayersListItem = ({ id }: { id: string }) => {
  const { playing, numOfQuest, currentQuest } = useConfigData();
  const player = usePlayer(id);

  if (!player) {
    return null;
  }

  return (
    <>
      <th className={clsx('pt-6 pb-20')}>
        <div className={clsx('flex items-center space-x-4 whitespace-normal')}>
          <div className="w-20">
            <Avatar src={player.avatar} />
          </div>
          <div className="w-56">
            <div className="text-xl line-clamp-2">{player.name}</div>
            <div className="mt-4"></div>
            {playing && (
              <div className="custom-select-height w-36">
                <AddItem playerId={player.id} />
              </div>
            )}
          </div>
        </div>
      </th>
      {player.answers.map((answer, i) => (
        <td key={`${player.id}_${i}`} className={clsx('px-4')}>
          <AnswerInput
            answer={answer}
            disabled={i !== currentQuest - 1 || player.point === 0}
            playerId={player.id}
          />
        </td>
      ))}
      <td
        className={clsx('px-4', {
          'hidden': currentQuest === numOfQuest,
        })}
      ></td>
      <td className={clsx('text-center', 'sticky right-[85px] z-[11]')}>
        <TotalPoint point={player.point} playerId={player.id} />
      </td>
      <td className={clsx('sticky right-0 z-[11]')}>
        <PlayerRank player={player} />
      </td>
    </>
  );
};
export default memo(PlayersListItem, (prev, next) => prev.id === next.id);
