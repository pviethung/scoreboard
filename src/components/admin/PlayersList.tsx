import {
  useListenAppProgress,
  useListenNewConnection,
  useListenUpdateItemInUse,
} from '@/broadcast';
import GameActions from '@/components/admin/GameActions';
import PlayersListItem from '@/components/admin/PlayersListItem';
import QuestionsList from '@/components/admin/QuestionsList';
import { useConfigData } from '@/store/configSlice';
import { usePlayers } from '@/store/playersSlice';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const PlayersList = () => {
  const players = usePlayers();
  const playersLeft = players.filter((p) => p.point !== 0).length;
  const { currentQuest } = useConfigData();
  const scrollParent = useRef<HTMLDivElement | null>(null);
  const progress = useListenAppProgress();
  const itemInUse = useListenUpdateItemInUse();
  useListenNewConnection(players, progress, itemInUse);

  // const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo(
  //   () => io(SOCKET_URL),
  //   [players, progress]
  // );

  // useEffect(() => {
  //   socket.on(BroadCastTypes.NEW_CONNECTION, () => {
  //     socket.emit(BroadCastTypes.GET_DATA_FOR_NEW_CONNECTION, {
  //       players,
  //       progress,
  //     });
  //   });
  //   return () => {
  //     socket.close();
  //   };
  // }, [players, progress]);

  console.log('players', players);
  console.log('progress', progress);

  useEffect(() => {
    if (scrollParent.current) {
      scrollParent.current.scrollTo({
        left: 10000,
        behavior: 'smooth',
      });
    }
  }, [currentQuest]);

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

      <div className="mt-14" />

      {players.length > 0 && (
        <>
          <GameActions />
          <div className="mt-14" />
          <div className="overflow-x-auto" ref={scrollParent}>
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
        </>
      )}
    </>
  );
};
export default PlayersList;
