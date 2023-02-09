import { useListenAppProgress, useListenPlayers } from '@/broadcast';
import Loading from '@/components/elements/Loading';
import LeaderChart from '@/components/home/LeaderChart';

const Home = () => {
  const players = useListenPlayers();
  const progress = useListenAppProgress();
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
