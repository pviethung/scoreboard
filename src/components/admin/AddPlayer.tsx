import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { usePlayersSlice } from '../../store/playersSlice';
import { Player } from '../../types/Player';
import randomAvatar from '../../utils/randomAvatar';
import randomId from '../../utils/randomId';

const AddPlayer = () => {
  const [name, setName] = useState('');
  const { players, add } = usePlayersSlice();
  useEffect(() => {
    console.log(players);
  }, [players]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const player: Player = {
          id: randomId(),
          isLost: false,
          name,
          point: 50,
          avatar: randomAvatar(),
          rank: 0,
        };
        add(player);
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
