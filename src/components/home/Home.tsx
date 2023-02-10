import { useListenAppProgress, useListenPlayers } from '@/broadcast';
import Loading from '@/components/elements/Loading';
import LeaderChart from '@/components/home/LeaderChart';
import { useListenType, useListenTypesActions } from '@/store/ListenTypesSlice';
import { useEffect } from 'react';

const Home = ({ isAdmin }: { isAdmin: boolean }) => {
  const listenType = useListenType();
  const players = useListenPlayers(listenType);
  const progress = useListenAppProgress(listenType);
  const { setType } = useListenTypesActions();

  console.log('progress', progress);
  console.log('listenType', listenType);

  useEffect(() => {
    if (isAdmin) {
      setType('offline');
    }
  }, []);

  const appRestarted =
    progress && progress.playing === false && progress.setting === true;

  return (
    <>
      {!players || appRestarted === true ? (
        <Loading />
      ) : (
        <>
          <LeaderChart progress={progress} players={players} />
        </>
      )}
    </>
  );
};
export default Home;
