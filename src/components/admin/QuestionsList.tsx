import { postPlayers } from '@/broadcast';
import { useConfigActions, useConfigData } from '@/store/configSlice';
import { usePlayersActions } from '@/store/playersSlice';
import clsx from 'clsx';
import { memo } from 'react';

const QuestionsList = () => {
  const { numOfQuest, currentQuest, playing } = useConfigData();
  const { addQuest } = useConfigActions();
  const { reorder } = usePlayersActions();

  return (
    <tr>
      <th className={clsx('text-center')}>Team</th>
      {new Array(currentQuest).fill(true).map((_, i) => (
        <th
          key={i}
          className={clsx('text-center', {
            'text-red-500': currentQuest > i + 1,
            'text-green-500': currentQuest <= i + 1,
          })}
        >
          Question {i + 1}
        </th>
      ))}

      <th
        className={clsx('text-center', {
          'hidden': currentQuest === numOfQuest,
        })}
      >
        {playing && (
          <button
            onClick={() => {
              addQuest();
              const players = reorder();
              postPlayers(players);
            }}
            className={clsx('btn-primary btn rounded-md uppercase')}
          >
            new turn
          </button>
        )}
      </th>
      <th className={clsx('px-10', 'sticky right-[85px] z-[11]')}>
        Total point
      </th>
      <th className={clsx('px-6 text-center', 'sticky right-0 z-[11]')}>
        Rank
      </th>
    </tr>
  );
};
export default memo(QuestionsList, () => true);
