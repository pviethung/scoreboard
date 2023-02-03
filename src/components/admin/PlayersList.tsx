import GameActions from '@/components/admin/GameActions';
import PlayersListItem from '@/components/admin/PlayersListItem';
import QuestionsList from '@/components/admin/QuestionsList';
import { usePlayers } from '@/store/playersSlice';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
/*
- question done
- lose player
- sort
- visiter
- persist
- burn
- loading screen
*/

const PlayersList = () => {
  const players = usePlayers();
  const playersLeft = players.filter((p) => p.point !== 0).length;

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
        <>
          <div className="overflow-x-auto">
            <table className="table-compact table w-full">
              <thead>
                <QuestionsList />
              </thead>
              <tbody>
                <AnimatePresence>
                  {players.map((p, idx) => (
                    <motion.tr key={p.id} layout>
                      <PlayersListItem id={p.id} />
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="mt-24" />
          <GameActions />
        </>
      )}
    </>
  );
};
export default PlayersList;
