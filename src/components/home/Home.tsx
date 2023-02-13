import { postNewConnection } from '@/broadcast';
import Loading from '@/components/elements/Loading';
import LeaderChart from '@/components/home/LeaderChart';
import { useListenTypesActions } from '@/store/ListenTypesSlice';
import { UpdateAppProgess, UpdateItemInUse } from '@/types/BroadCast';
import { ListenTypes } from '@/types/ListenTypes';
import { Player } from '@/types/Player';
import { useEffect } from 'react';

const Home = ({
  isAdmin,
  listenType,
  players,
  progress,
  itemInUse,
}: {
  isAdmin: boolean;
  players: Player[] | null;
  listenType: ListenTypes;
  progress: UpdateAppProgess['data'] | null;
  itemInUse: UpdateItemInUse['data'] | null;
}) => {
  const { setType } = useListenTypesActions();
  useEffect(() => {
    if (isAdmin) {
      setType('offline');
    } else {
      postNewConnection();
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
          <LeaderChart
            itemInUse={itemInUse}
            progress={progress}
            players={players}
          />
        </>
      )}
    </>
  );
};
export default Home;
