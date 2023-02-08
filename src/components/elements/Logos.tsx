import exLogo from '@/assets/ex.png';
import teqLogo from '@/assets/teq.png';
import clsx from 'clsx';
const Logos = () => {
  return (
    <div
      className={clsx('flex w-full items-center justify-between [&>img]:w-52')}
    >
      <img src={teqLogo} alt="" />
      <img src={exLogo} alt="" />
    </div>
  );
};
export default Logos;
