import { useListenPlayers } from '@/broadcast';
import { useState } from 'react';

const TestSocket = () => {
  const [msg, setMsg] = useState('');
  const playersListened = useListenPlayers('online');

  console.log('playersListened', playersListened);

  return (
    <form
      className="relative z-10"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button className="btn-primary btn">Send</button>
    </form>
  );
};

export default TestSocket;
