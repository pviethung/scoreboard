import { useConfigData } from '@/store/configSlice';
import { usePlayersActions } from '@/store/playersSlice';
import { Player } from '@/types/Player';
import randomAvatar from '@/utils/randomAvatar';
import randomId from '@/utils/randomId';
import clsx from 'clsx';
import { useState } from 'react';

const AddPlayer = ({ players }: { players: Player[] }) => {
  const { initialPoint, numOfTeam } = useConfigData();
  const [names, setNames] = useState<string[]>(new Array(numOfTeam).fill(''));
  const { addPlayer } = usePlayersActions();

  if (players.length > 0) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const players: Player[] = [];
        for (const name of names) {
          const player: Player = {
            id: randomId(),
            name,
            point: initialPoint,
            avatar: randomAvatar(),
            rank: 0,
            answers: [],
            prevRank: 0,
            itemsLeft: [],
          };
          addPlayer(player);
        }
        setNames((prev) => new Array(numOfTeam).fill(''));
      }}
      className={clsx('flex')}
    >
      <div className="flex flex-col items-center space-y-4">
        {new Array(numOfTeam).fill(true).map((p, idx) => {
          return (
            <div key={idx}>
              <input
                type="text"
                placeholder={`PLAYER ${idx + 1} NAME`}
                className="input-bordered input"
                value={names[idx]}
                onChange={(e) =>
                  setNames((prev) => {
                    prev.splice(idx, 1, e.target.value);
                    return [...prev];
                  })
                }
              />
            </div>
          );
        })}

        <button className="btn-primary btn uppercase">add player</button>
      </div>
    </form>
  );
};
export default AddPlayer;
