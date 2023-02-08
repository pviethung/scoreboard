import PlayersSelect from '@/components/admin/PlayersSelect';
import { usePlayers, usePlayersActions } from '@/store/playersSlice';
import { Player } from '@/types/Player';
import clsx from 'clsx';
import { useState } from 'react';
import { toast, Toast } from 'react-hot-toast';

const AttackPlayerForm = ({
  type,
  toastObj,
  srcPlayer,
  onClose,
}: {
  type: 'attack' | 'strike';
  toastObj: Toast;
  srcPlayer: Player;
  onClose: () => void;
}) => {
  const players = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { setCurrentTurnStatus } = usePlayersActions();
  const desPlayers = players
    .filter((p) => p.id !== srcPlayer.id)
    .map((p) => {
      return {
        label: p.name,
        value: p,
      };
    });

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose player
        </label>
        <PlayersSelect
          data={desPlayers}
          isClearable={false}
          onChange={(newValue) => {
            if (newValue) {
              setSelectedPlayer(newValue.value);
            } else {
              setSelectedPlayer(null);
            }
          }}
        />
      </div>

      <div className={clsx('flex justify-between')}>
        <button
          onClick={(e) => {
            e.preventDefault();
            onClose();
            toast.dismiss(toastObj.id);
          }}
          className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4  dark:hover:bg-red-500 sm:w-auto"
        >
          Close
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (selectedPlayer) {
              const data =
                type === 'attack'
                  ? {
                      beAttacked: {
                        by: srcPlayer,
                        // point: 20,
                        point: 0,
                      },
                      beStriked: null,
                    }
                  : {
                      beAttacked: null,
                      beStriked: {
                        by: srcPlayer,
                        point: 0,
                      },
                    };
              setCurrentTurnStatus(selectedPlayer.id, data);
            }
            toast.dismiss(toastObj.id);
          }}
          className="focus:ring-blue-300s w-full rounded-lg bg-green-500 px-5 py-2.5 text-center text-sm font-medium capitalize  text-white focus:outline-none focus:ring-4 dark:hover:bg-green-500 sm:w-auto"
        >
          {type}
        </button>
      </div>
    </div>
  );
};

export default AttackPlayerForm;
