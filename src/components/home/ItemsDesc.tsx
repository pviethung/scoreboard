import cancelImg from '@/assets/cancel.png';
import treasureImg from '@/assets/treasure.png';
import { items } from '@/utils/getItem';
import clsx from 'clsx';
import { useState } from 'react';

const ItemsDesc = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className={clsx('fixed left-0 top-1/4')}>
      <div
        className={clsx('transition-all', {
          'translate-x-0': !toggle,
          '-translate-x-full': toggle,
        })}
      >
        <button
          className={clsx('animate-[tilt-n-move-shaking_500ms_infinite] p-4')}
          onClick={() => setToggle((prev) => !prev)}
        >
          <img src={treasureImg} className={clsx('w-14')} alt="" />
        </button>
      </div>

      <div
        className={clsx('absolute top-0 transition-all', {
          'translate-x-0': toggle,
          '-translate-x-[calc(100%_+_32px)]': !toggle,
        })}
      >
        <button
          onClick={() => setToggle((prev) => !prev)}
          className={clsx('absolute -right-5 -top-5')}
        >
          <img className="w-8" src={cancelImg} alt="" />
        </button>
        <ul
          className={clsx(
            'h-96 w-80 space-y-4 overflow-y-auto bg-base-300 py-4'
          )}
        >
          {items.map((i) => {
            return (
              <li className={clsx('flex items-center gap-4 px-4')}>
                <img className={clsx('w-10')} src={i.avatar} alt="" />
                <p>
                  <span className="text-primary">({i.label}):</span> {i.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default ItemsDesc;
