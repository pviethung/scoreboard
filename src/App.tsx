import Guard from '@/components/elements/Guard';
import Home from '@/components/home/Home';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Admin from './components/admin/Admin';

const App = () => {
  const [path, setPath] = useState('');

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
      {path !== '/admin' && (
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
