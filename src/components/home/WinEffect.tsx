import winnerImg from '@/assets/winner.png';
import Avatar from '@/components/elements/Avatar';
import { Player } from '@/types/Player';
import clsx from 'clsx';

const WinEffect = ({ player }: { player: Player }) => {
  const content = (
    <div className={clsx('flex flex-col items-center justify-center gap-4')}>
      <img className={clsx('w-24')} src={winnerImg} alt="" />
      <div className={clsx('w-56')}>
        <Avatar src={player.avatar} />
      </div>
      <p className={clsx('mt-4 text-lg')}>
        <span className={clsx('text-primary')}>{player.name}</span>
      </p>
      <div></div>
    </div>
  );

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-black/50'
      )}
    >
      {content}
    </div>
  );
};
export default WinEffect;
