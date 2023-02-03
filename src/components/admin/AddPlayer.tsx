import { useConfigData } from '@/store/configSlice';
import { usePlayersActions } from '@/store/playersSlice';
import { Player } from '@/types/Player';
import randomAvatar from '@/utils/randomAvatar';
import randomId from '@/utils/randomId';
import clsx from 'clsx';
import { useState } from 'react';

const AddPlayer = () => {
  const [name, setName] = useState('');
  const { add } = usePlayersActions();
  const { initialPoint } = useConfigData();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const player: Player = {
          id: randomId(),
          name,
          point: initialPoint,
          avatar: randomAvatar(),
          rank: 0,
          prevRank: 0,
        };
        add(player);
        // set rank
        setName('');
      }}
      className={clsx('flex')}
    >
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="PLAYER NAME"
            className="input-bordered input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn-primary btn uppercase">add player</button>
        </div>
      </div>
    </form>
  );
};
export default AddPlayer;
