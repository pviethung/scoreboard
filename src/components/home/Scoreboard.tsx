import Avatar from '@/components/elements/Avatar';
import PlayerRank from '@/components/elements/PlayerRank';
import { Player } from '@/types/Player';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

const ScoreboardLine = ({ player }: { player: Player }) => {
  const { avatar, id, name, point, prevRank, rank } = player;
  return (
    <div
      className={clsx(
        'relative flex w-full rounded-md p-6 text-xl text-base-content',
        'after:absolute after:left-[20%] after:bottom-0 after:h-[2px] after:w-3/5 after:bg-primary after:content-[""]'
      )}
    >
      <div className={clsx('flex w-4/5 items-center')}>
        <div className="mr-6 w-20">
          <Avatar src={avatar} />
        </div>
        <div className="max-w-2xl">
          <p className={clsx('flex-2 mb-2 font-bold line-clamp-1')}>{name}</p>
          <div className={clsx('flex items-center space-x-4')}>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
            <span className={clsx('text-2xl text-green-500')}>+</span>
            <span className={'text-2xl text-red-500'}>-</span>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'ml-auto flex w-24 items-center justify-center text-center'
        )}
      >
        <span className={clsx('rounded-md bg-primary-focus px-4 py-2')}>
          {point}
        </span>
      </div>
      <div
        className={clsx(
          'flex w-24 items-center justify-center space-x-2 text-center'
        )}
      >
        <PlayerRank player={player} />
        {/* <span>{rank}</span>
        <Arrow isDown={true} /> */}
      </div>
    </div>
  );
};

const Scoreboard = ({ players }: { players: Player[] | null }) => {
  const restPlayers = players?.slice(3);

  return (
    <div className={clsx('mx-auto w-4/5')}>
      {restPlayers && restPlayers.length > 0 && (
        <>
          <div className={clsx('mb-4 flex px-6 text-center text-2xl')}>
            <p className={clsx('flex-1')}>Team</p>
            <p className={clsx('ml-auto w-24')}>Point</p>
            <p className={clsx('w-24')}>Rank</p>
          </div>
          <ul>
            <AnimatePresence>
              {restPlayers.map((p) => {
                return (
                  <motion.li layout key={p.id}>
                    <ScoreboardLine player={p} />
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </>
      )}
    </div>
  );
};
export default Scoreboard;
