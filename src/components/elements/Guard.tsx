import clsx from 'clsx';
import { useState } from 'react';

const Guard = ({ children }: { children: React.ReactNode }) => {
  const [password, setPassword] = useState('');
  const [passed, setPassed] = useState(false);
  return (
    <>
      {passed ? (
        children
      ) : (
        <form
          className={clsx(
            'fixed top-0 left-0 flex h-screen w-screen items-center justify-center'
          )}
          onSubmit={(e) => {
            e.preventDefault();
            if (password === '123456') setPassed(true);
          }}
        >
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-bordered input w-full max-w-xs"
          />
        </form>
      )}
    </>
  );
};
export default Guard;
