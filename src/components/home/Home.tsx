import { useListenAppProgress, useListenPlayers } from '@/broadcast';
import Loading from '@/components/elements/Loading';
import LeaderChart from '@/components/home/LeaderChart';
import { useListenType } from '@/store/ListenTypesSlice';

const Home = () => {
  const listenType = useListenType();
  const players = useListenPlayers(listenType);
  const progress = useListenAppProgress(listenType);

  const appRestarted =
    progress && progress.playing === false && progress.setting === true;

  console.log({
    'component': 'Home',
    'players': players,
    'listenType': listenType,
    'progress': progress,
  });

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
