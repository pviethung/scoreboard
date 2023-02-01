import BettedPointInput from '@/components/admin/BettedPointInput';
import Avatar from '@/components/elements/Avatar';
import { useConfigSlice } from '@/store/configSlice';
import { usePlayersData } from '@/store/playersSlice';
import { Player } from '@/types/Player';
import clsx from 'clsx';
import { memo, useEffect } from 'react';

const InputList = memo(
  ({ numOfQuest, p }: { numOfQuest: number; p: Player }) => {
    console.log('input list run');

    return (
      <>
        {new Array(numOfQuest).fill(true).map((_, i) => (
          <td key={`${p.id}_${i}`} className={clsx('px-4')}>
            <BettedPointInput playerId={p.id} />
          </td>
        ))}
      </>
    );
  },
  (prev, next) => {
    return true;
  }
);

const PlayersList = () => {
  const { players } = usePlayersData();
  const { numOfQuest } = useConfigSlice();
  const totalPlayers = players.length;
  const playersLeft = players.length;

  useEffect(() => {
    console.log(numOfQuest);
  }, [numOfQuest]);

  useEffect(() => {
    console.log(players);
  }, [players]);

  return (
    <>
      {playersLeft > 0 && (
        <div className={clsx('mt-4 flex gap-4 uppercase')}>
          <p>
            Total players:{' '}
            <span className={clsx('text-primary')}>{players.length}</span>
          </p>
          <p>
            Players Left:{' '}
            <span className={clsx('text-primary')}> {playersLeft}</span>
          </p>
        </div>
      )}

      <div className="mt-20" />
      {players.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-compact table w-full">
            <thead>
              <tr>
                <th>Team</th>
                {new Array(numOfQuest).fill(true).map((_, i) => (
                  <th key={i} className={clsx('text-center')}>
                    Question {i + 1}
                  </th>
                ))}
                <th>Total point</th>
              </tr>
            </thead>
            <tbody>
              {players.length > 0 &&
                players.map((p) => (
                  <tr key={p.id}>
                    <th
                      className={clsx(
                        'flex items-center space-x-4 whitespace-normal py-6'
                      )}
                    >
                      <div className="w-14">
                        <Avatar src={p.avatar} />
                      </div>
                      <div className="w-56">
                        <div className="text-xl line-clamp-2">{p.name}</div>
                      </div>
                    </th>
                    <InputList numOfQuest={20} p={p} />
                    {/* {new Array(numOfQuest).fill(true).map((_, i) => (
                      <td key={`${p.id}_${i}`} className={clsx('px-4')}>
                        <BettedPointInput playerId={p.id} />
                      </td>
                    ))} */}

                    <td className={clsx('text-center')}>50</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default PlayersList;
