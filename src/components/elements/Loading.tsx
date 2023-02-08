import clsx from 'clsx';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

const Loading = () => {
  return (
    <div
      className={clsx(
        'fixed top-0 left-0 flex h-screen w-screen items-center justify-center'
      )}
    >
      <ClimbingBoxLoader color="#f28c18" size={50} />
    </div>
  );
};
export default Loading;
