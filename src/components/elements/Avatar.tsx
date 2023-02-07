import clsx from 'clsx';

const Avatar = ({ src }: { src: string }) => {
  return (
    <div className={clsx('overflow-hidden rounded-full')}>
      <img className="w-full" src={src || 'https://i.pravatar.cc/300'} alt="" />
    </div>
  );
};
export default Avatar;
