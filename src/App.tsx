import {
  useListenAppProgress,
  useListenPlayers,
  useListenUpdateItemInUse,
} from '@/broadcast';
import Guard from '@/components/elements/Guard';
import Home from '@/components/home/Home';
import { useListenType } from '@/store/ListenTypesSlice';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Admin from './components/admin/Admin';

const App = () => {
  const listenType = useListenType();
  const players = useListenPlayers(listenType);
  const progress = useListenAppProgress(listenType);
  const itemInUse = useListenUpdateItemInUse(listenType);

  const [path, setPath] = useState('');
  const hideRedirectBtn =
    (progress?.playing && progress.playing === true) ||
    (progress?.currentQuest && progress.currentQuest > 0);

  useEffect(() => {
    setPath(window.location.pathname);
    const handlelocationChange = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlelocationChange);
    return () => {
      window.removeEventListener('popstate', handlelocationChange);
    };
  }, []);

  return (
    <>
      {path !== '/admin' && !hideRedirectBtn && (
        <div className={clsx('relative z-10 p-4')}>
          <button
            className={clsx('btn btn-primary')}
            onClick={() => {
              window.history.pushState({}, '', '/admin');
              setPath('/admin');
            }}
          >
            Admin
          </button>
        </div>
      )}
      <div
        className={clsx(
          'mx-auto max-w-7xl',
          'flex flex-col items-center justify-center py-10'
        )}
      >
        {path === '/' && (
          <Home
            players={players}
            progress={progress}
            isAdmin={false}
            itemInUse={itemInUse}
          />
        )}
        {path === '/leaderboard' && (
          <Home
            players={players}
            progress={progress}
            isAdmin={true}
            itemInUse={itemInUse}
          />
        )}

        {path === '/admin' && (
          <Guard>
            <Admin />
          </Guard>
        )}
      </div>
      <Toaster />
    </>
  );
};
export default App;
