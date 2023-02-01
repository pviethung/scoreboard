import crown from '@/assets/crown.png';
import Arrow from '@/components/elements/Arrow';
import Avatar from '@/components/elements/Avatar';
import clsx from 'clsx';

const LeaderChart = () => {
  return (
    <div className={clsx('py-28', 'flex items-end')}>
      {/* 2 */}
      <div className={clsx('w-40')}>
        <div className={clsx('mb-2 text-center')}>
          <Arrow isDown={true} />
        </div>
        <div
          className={clsx(
            'relative mx-auto w-36 rounded-full border-4 border-secondary',
            'text-lg font-bold after:absolute after:-bottom-5 after:left-12 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-secondary after:content-["2"]'
          )}
        >
          <Avatar src="" />
        </div>
        <div className="mt-6"></div>
        <p className="text-center line-clamp-2">
          Jenifer Jenifer Jenifer Jenifer Jenifer Jenifer Jenifer
        </p>

        <div className="mb-20" />
        <div
          className={clsx(
            'relative flex h-60 items-center justify-center bg-secondary-focus',
            'after:absolute after:-top-14 after:left-[10px] after:h-14 after:w-full after:-skew-x-[20deg] after:bg-secondary after:content-[""]'
          )}
        >
          <span className={clsx('rounded-md bg-secondary px-4 py-2 text-xl')}>
            250p
          </span>
        </div>
      </div>

      {/* 1 */}
      <div className={clsx('w-48')}>
        <img className={clsx('mx-auto mb-2 h-8 w-8')} src={crown} alt="" />
        <div
          className={clsx(
            'relative mx-auto w-44 rounded-full border-4 border-primary',
            'text-lg font-bold after:absolute after:-bottom-5 after:left-16 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-primary after:content-["1"]'
          )}
        >
          <Avatar src="" />
        </div>
        <div className="mb-6" />

        <p className="text-center line-clamp-2">
          Jenifer Jenifer Jenifer Jenifer Jenifer Jenifer Jenifer
        </p>

        <div className="mb-20" />
        <div
          className={clsx(
            'relative z-10 flex h-72 items-center justify-center bg-primary-focus',
            'after:absolute after:-top-[60px] after:h-0 after:w-full after:content-[""]',
            'after:border-b-[60px] after:border-l-[20px] after:border-r-[20px] after:border-b-primary after:border-l-transparent after:border-r-transparent'
          )}
        >
          <span className={clsx('rounded-md bg-primary px-4 py-2 text-xl')}>
            250p
          </span>
        </div>
      </div>

      {/* 3 */}
      <div className={clsx('w-40')}>
        <div className={clsx('mb-2 text-center')}>
          <Arrow isDown={false} />
        </div>

        <div
          className={clsx(
            'relative mx-auto w-36 rounded-full border-4 border-accent',
            'text-lg font-bold after:absolute after:-bottom-5 after:left-12 after:flex after:h-10 after:w-10 after:items-center after:justify-center after:rounded-full after:bg-accent after:content-["3"]'
          )}
        >
          <Avatar src="" />
        </div>
        <div className="mt-6"></div>
        <p className="text-center line-clamp-2">
          Jenifer Jenifer Jenifer Jenifer Jenifer Jenifer Jenifer
        </p>

        <div className="mb-20" />
        <div
          className={clsx(
            'relative flex h-52 w-40 items-center justify-center bg-accent-focus',
            'after:absolute after:-top-14 after:right-[10px] after:h-14 after:w-full after:skew-x-[20deg] after:bg-accent after:content-[""]'
          )}
        >
          <span className={clsx('rounded-md bg-accent px-4 py-2 text-xl')}>
            250p
          </span>
        </div>
      </div>
    </div>
  );
};
export default LeaderChart;
