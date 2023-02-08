import crown from '@/assets/crown.png';
import { useListenAppProgress, useListenUpdateItemInUse } from '@/broadcast';
import Avatar from '@/components/elements/Avatar';
import Confetti from '@/components/elements/Confetti';
import Logos from '@/components/elements/Logos';
import PlayerRank from '@/components/elements/PlayerRank';
import { Player } from '@/types/Player';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ExtraInfo = ({ player }: { player: Player }) => {
  return (
    <>
      {player.answers.length > 1 && (
        <div>
          <p className="text-center">
            Last {player.answers.length <= 5 ? player.answers.length - 1 : 5}{' '}
            answers:{' '}
          </p>
          <div className={clsx('mt-2 flex gap-3 text-3xl')}>
            {player.answers.slice(0, -1).map((a, idx) => {
              return a.earnedPoint > 0 ? (
                <span key={idx} className={clsx('text-green-500')}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 16 16"
                    className="w-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
                  </svg>
                </span>
              ) : (
                <span key={idx} className={clsx('text-red-700')}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 16 16"
                    className="w-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                  </svg>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
const ItemInUse = ({ player }: { player: Player }) => {
  const eventData = useListenUpdateItemInUse();
  const [itemInUse, setItemInUse] = useState<typeof eventData>(null);

  useEffect(() => {
    if (eventData?.playerId === player.id) {
      setItemInUse({ ...eventData });
      return;
    }
    if (eventData?.playerId === 'all') {
      setItemInUse(null);
    }
  }, [eventData]);

  return (
    <>
      {itemInUse?.item && itemInUse?.playerId === player.id && (
        <div
          className={clsx(
            'absolute top-0 left-0 flex animate-bounce flex-col items-center justify-center space-y-2'
          )}
        >
          <img src={itemInUse.item?.avatar} className={clsx('w-12')} />
        </div>
      )}
    </>
  );
};

const LeaderChart = ({ players }: { players: Player[] | null }) => {
  const progress = useListenAppProgress();
  console.log('progress', progress);

  console.log(
    'test',
    progress &&
      progress?.playing === false &&
      progress?.setting === false &&
      '4'
  );

  if (!players) return null;

  let player1 = players[0];
  let player2 = players[1];
  let player3 = players[2];
  let player4 = players[3];
  let player5 = players[4];

  return (
    <>
      <Logos />
      <div className={clsx('flex items-end')}>
        <AnimatePresence>
          {/* 4 */}
          <motion.div layout key={player4.id} className={clsx('w-40')}>
            <div className={clsx('mb-2 text-center')}>
              <PlayerRank hideRank={true} player={player4} />
            </div>
            <div
              className={clsx(
                'relative mx-auto w-36 rounded-full border-4 border-yellow-500',
                'text-lg font-bold',
                'after:absolute after:-bottom-5 after:left-12 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-yellow-500 after:content-["4th"]'
              )}
            >
              <Avatar src={player4.avatar} />
              <ItemInUse player={player4} />
            </div>
            <div className="mt-6"></div>
            <p className="text-center line-clamp-2">{player4.name}</p>

            <div className="mb-20" />
            <div
              className={clsx(
                'relative flex h-44 flex-col items-center bg-yellow-500/80',
                'after:absolute after:-top-14 after:left-[10px] after:h-14 after:w-full after:-skew-x-[20deg] after:bg-yellow-500 after:content-[""]',
                'before:absolute before:-right-5 before:-top-[30px] before:h-full before:w-5 before:-skew-y-[70deg] before:bg-yellow-500/80 before:content-[""]'
              )}
            >
              <span
                className={clsx(
                  'mt-4 mb-auto rounded-md bg-yellow-500/80 px-4 py-2 text-xl'
                )}
              >
                {player4.point}
              </span>
              <div className="mb-4">
                <ExtraInfo player={player4} />
              </div>
            </div>
          </motion.div>
          {/* 2 */}
          <motion.div layout key={player2.id} className={clsx('w-40')}>
            <div className={clsx('mb-2 text-center')}>
              <PlayerRank hideRank={true} player={player2} />
            </div>
            <div
              className={clsx(
                'relative mx-auto w-36 rounded-full border-4 border-secondary',
                'text-lg font-bold after:absolute after:-bottom-5 after:left-12 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-secondary after:content-["2nd"]'
              )}
            >
              <Avatar src={player2.avatar} />
              <ItemInUse player={player2} />
            </div>
            <div className="mt-6"></div>
            <p className="text-center line-clamp-2">{player2.name}</p>

            <div className="mb-20" />
            <div
              className={clsx(
                'relative flex h-60 flex-col items-center bg-secondary-focus',
                'after:absolute after:-top-14 after:left-[10px] after:h-14 after:w-full after:-skew-x-[20deg] after:bg-secondary after:content-[""]',
                'before:absolute before:-right-5 before:-top-[30px] before:h-full before:w-5 before:-skew-y-[70deg] before:bg-secondary before:content-[""]'
              )}
            >
              <span
                className={clsx(
                  'mt-4 mb-auto rounded-md bg-secondary px-4 py-2 text-xl'
                )}
              >
                {player2.point}
              </span>
              <div className="mb-4">
                <ExtraInfo player={player2} />
              </div>
            </div>
          </motion.div>
          {/* 1 */}
          <motion.div layout key={player1.id} className={clsx('w-48')}>
            <img className={clsx('mx-auto mb-2 h-8 w-8')} src={crown} alt="" />
            <div
              className={clsx(
                'relative mx-auto w-44 rounded-full border-4 border-primary',
                'text-lg font-bold after:absolute after:-bottom-5 after:left-16 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-primary after:content-["1st"]'
              )}
            >
              <Avatar src={player1.avatar} />
              <ItemInUse player={player1} />
            </div>
            <div className="mb-6" />
            <p className="text-center line-clamp-2">{player1.name}</p>
            <div className="mb-20" />
            <div
              className={clsx(
                'relative z-10 flex h-72 flex-col items-center bg-primary-focus',
                'after:absolute after:-top-[60px] after:h-0 after:w-full after:content-[""]',
                'after:border-b-[60px] after:border-l-[20px] after:border-r-[20px] after:border-b-primary after:border-l-transparent after:border-r-transparent'
              )}
            >
              <span
                className={clsx(
                  'mt-4 mb-auto rounded-md bg-primary px-4 py-2 text-xl'
                )}
              >
                {player1.point}
              </span>
              <div className="mb-4">
                <ExtraInfo player={player1} />
              </div>
            </div>
          </motion.div>
          {/* 3 */}
          <motion.div layout key={player3.id} className={clsx('w-40')}>
            <div className={clsx('mb-2 text-center')}>
              <PlayerRank hideRank={true} player={player3} />
            </div>

            <div
              className={clsx(
                'relative mx-auto w-36 rounded-full border-4 border-accent',
                'text-lg font-bold after:absolute after:-bottom-5 after:left-12 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-accent after:content-["3rd"]'
              )}
            >
              <Avatar src={player3.avatar} />
              <ItemInUse player={player3} />
            </div>
            <div className="mt-6"></div>
            <p className="text-center line-clamp-2">{player3.name}</p>

            <div className="mb-20" />
            <div
              className={clsx(
                'relative z-[9] flex h-52 w-40 flex-col items-center justify-around bg-accent-focus',
                'after:absolute after:-top-14 after:right-[10px] after:h-14 after:w-full after:skew-x-[20deg] after:bg-accent after:content-[""]',
                'before:absolute before:-left-5 before:-top-[30px] before:h-full before:w-5 before:skew-y-[70deg] before:bg-accent before:content-[""]'
              )}
            >
              <span
                className={clsx(
                  'mt-4 mb-auto rounded-md bg-accent px-4 py-2 text-xl'
                )}
              >
                {player3.point}
              </span>
              <div className="mb-4">
                <ExtraInfo player={player3} />
              </div>
            </div>
          </motion.div>
          {/* 5 */}
          <motion.div layout key={player5.id} className={clsx('w-40')}>
            <div className={clsx('mb-2 text-center')}>
              <PlayerRank hideRank={true} player={player5} />
            </div>

            <div
              className={clsx(
                'relative mx-auto w-36 rounded-full border-4 border-pink-500',
                'text-lg font-bold after:absolute after:-bottom-5 after:left-12 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-pink-500 after:content-["5th"]'
              )}
            >
              <Avatar src={player5.avatar} />
              <ItemInUse player={player5} />
            </div>
            <div className="mt-6"></div>
            <p className="text-center line-clamp-2">{player5.name}</p>

            <div className="mb-20" />
            <div
              className={clsx(
                'relative flex h-36 w-40 flex-col items-center justify-around bg-pink-500/80',
                'after:absolute after:-top-14 after:right-[10px] after:h-14 after:w-full after:skew-x-[20deg] after:bg-pink-500 after:content-[""]',
                'before:absolute before:-left-5 before:-top-[30px] before:h-full before:w-5 before:skew-y-[70deg] before:bg-pink-500/80 before:content-[""]'
              )}
            >
              <span
                className={clsx(
                  'mt-4 mb-auto rounded-md bg-pink-500 px-4 py-2 text-xl'
                )}
              >
                {player5.point}
              </span>
              <div className="mb-4">
                <ExtraInfo player={player5} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {progress &&
        progress?.playing === false &&
        progress?.setting === false && <Confetti />}
    </>
  );
};
export default LeaderChart;
