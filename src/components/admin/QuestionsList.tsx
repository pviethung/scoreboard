import { postPlayers, postProgress, postUpdateItemInUse } from '@/broadcast';
import { useConfigActions, useConfigData } from '@/store/configSlice';
import { usePlayersActions } from '@/store/playersSlice';
import clsx from 'clsx';
import { memo, useEffect } from 'react';

const QuestionsList = () => {
  const { numOfQuest, currentQuest, playing } = useConfigData();
  const { addQuest } = useConfigActions();
  const { reorderPlayers, newTurn, calculatePoints, checkRemainingItems } =
    usePlayersActions();

  useEffect(() => {
    postProgress({
      currentQuest,
      playing: true,
      setting: false,
    });
  }, [currentQuest]);

  return (
    <tr>
      <th className={clsx('text-center')}>Team</th>
      {new Array(currentQuest).fill(true).map((_, i) => (
        <th
          key={i}
          className={clsx('text-center', {
            'text-red-500': currentQuest > i + 1 || !playing,
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
              calculatePoints();
              checkRemainingItems();
              newTurn();

              const players = reorderPlayers(); // reorder board before start new turn
              postPlayers(players);

              // start new quest
              addQuest();

              postUpdateItemInUse({
                item: null,
                playerId: 'all',
              });
            }}
            className={clsx('btn-primary btn rounded-md uppercase')}
          >
            new question
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
