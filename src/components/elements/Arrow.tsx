import clsx from 'clsx';

const Arrow = ({ isDown }: { isDown: boolean }) => {
  return (
    <span
      className={clsx('text-xl', {
        'text-red-500': isDown,
        'text-green-500': !isDown,
      })}
    >
      {isDown ? '▼' : '▲'}
    </span>
  );
};
export default Arrow;
