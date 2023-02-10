import { useListenAppProgress } from '@/broadcast';
import Guard from '@/components/elements/Guard';
import SelectListenType from '@/components/elements/SelectListenType';
import Home from '@/components/home/Home';
import TestSocket from '@/components/TestSocket';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Admin from './components/admin/Admin';

const App = () => {
  const [path, setPath] = useState('');
  const progress = useListenAppProgress();
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
      <TestSocket />
      <SelectListenType />
      {path !== '/admin' && !hideRedirectBtn && (
        <div className={clsx('relative z-10 p-4')}>
          <button
            className={clsx('btn-primary btn')}
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
        {path === '/' && <Home />}

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
