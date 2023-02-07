import { useListenPlayers } from '@/broadcast';
import Loading from '@/components/elements/Loading';
import LeaderChart from '@/components/home/LeaderChart';

const Home = () => {
  const players = useListenPlayers();

  return (
    <>
      {!players ? (
        <Loading />
      ) : (
        <>
          <LeaderChart players={players} />
          {/* <Scoreboard players={players} /> */}
        </>
      )}
    </>
  );
};
export default Home;
