import { UpdateItemInUse } from '@/types/BroadCast';
import { Item } from '@/types/Item';
import { Player } from '@/types/Player';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const ItemEffect = ({
  itemInUse,
  players,
}: {
  itemInUse: UpdateItemInUse['data'] | null;
  players: Player[];
}) => {
  // const itemInUse = useListenUpdateItemInUse();
  // const players = useListenPlayers();
  const [content, setContent] = useState<React.ReactNode>('');
  const [show, setShow] = useState(false);

  console.log('effect item', itemInUse);
  console.log('effect players', players);

  useEffect(() => {
    if (!itemInUse || !itemInUse.item) return;
    if (!players) return;

    const srcPlayer = players.find((p) => p.id === itemInUse.playerId);

    if (
      itemInUse.item.value !== 'attack' &&
      itemInUse.item.value !== 'strike' &&
      itemInUse.item.value !== 'swap'
    ) {
      if (srcPlayer) {
        setShow(true);
        setContent(
          <div className={clsx('text-center')}>
            <img className={clsx('w-56')} src={itemInUse.item.gif} alt="" />
            <p className={clsx('mt-4 text-lg')}>
              <span className={clsx('text-primary')}>{srcPlayer.name}</span>{' '}
              used{' '}
              <span className={clsx('text-primary')}>
                {itemInUse.item.label}
              </span>
            </p>
          </div>
        );
      }
    } else if (
      itemInUse.item.value === 'attack' ||
      itemInUse.item.value === 'strike'
    ) {
      const key =
        itemInUse.item.value === 'attack' ? 'beAttacked' : 'beStriked';
      const playerAttack = srcPlayer;
      const playerBeAttacked = players.find((p) => {
        const status = p.answers[p.answers.length - 1].status;
        if (status && status[key]?.by.id === itemInUse.playerId) {
          return true;
        }
      });

      if (playerAttack && playerBeAttacked) {
        setShow(true);
        setContent(
          <div className={clsx('text-center')}>
            <img className={clsx('w-56')} src={itemInUse.item.gif} alt="" />
            <p className={clsx('mt-4 text-lg')}>
              <span className={clsx('text-primary')}>{playerAttack.name}</span>{' '}
              is {key == 'beAttacked' ? 'attacking' : 'striking'}{' '}
              <span className={clsx('text-primary')}>
                {playerBeAttacked.name}
              </span>
            </p>
          </div>
        );
      }
    } else {
      const playerSwap = srcPlayer;
      let srcItem: Item | null = null;
      let desItem: Item | null = null;

      const playerBeSwap = players.find((p) => {
        const status = p.answers[p.answers.length - 1].status;
        if (status && status.beSwapped?.with.id === itemInUse.playerId) {
          desItem = status.beSwapped.desItem;
          srcItem = status.beSwapped.srcItem;
          return true;
        }
      });

      if (playerSwap && playerBeSwap) {
        setShow(true);
        setContent(
          <div className={clsx('text-center')}>
            <img className={clsx('w-56')} src={itemInUse.item.gif} alt="" />
            <p className={clsx('mt-4 text-lg')}>
              <span className={clsx('text-primary')}>{playerSwap.name}</span> is
              swapped with{' '}
              <span className={clsx('text-primary')}>{playerBeSwap.name}</span>
            </p>
            <div>
              {srcItem !== null && desItem !== null && (
                <div className={clsx('mt-4 flex items-center justify-around')}>
                  <img className="w-10" src={(srcItem as Item).avatar} alt="" />
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={clsx('w-8 stroke-primary')}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <desc />
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={21} y1={7} x2={3} y2={7} />
                    <path d="M18 10l3 -3l-3 -3" />
                    <path d="M6 20l-3 -3l3 -3" />
                    <line x1={3} y1={17} x2={21} y2={17} />
                  </svg>

                  <img className="w-10" src={(desItem as Item).avatar} alt="" />
                </div>
              )}
            </div>
          </div>
        );
      }
    }

    let timeOutId = setTimeout(() => {
      setContent('');
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [itemInUse, players]);

  if (!itemInUse || !itemInUse.item || !players) {
    return null;
  }

  return (
    <>
      {show && (
        <div
          className={clsx(
            'fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50'
          )}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default ItemEffect;
