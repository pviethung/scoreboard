import {
  postAppRestart,
  postPlayers,
  postProgress,
  postUpdateItemInUse,
} from '@/broadcast';
import { useConfigActions, useConfigData } from '@/store/configSlice';
import { usePlayersActions } from '@/store/playersSlice';
import clsx from 'clsx';
import { memo, useState } from 'react';

const GameActions = () => {
  const { playing } = useConfigData();
  const [touched, setTouched] = useState(false);
  const { reorderPlayers, resetData, calculatePoints } = usePlayersActions();
  const { restart, start, stop } = useConfigActions();

  const handlePlay = (e: React.MouseEvent) => {
    if (playing) {
      // stop
      calculatePoints();
      const players = reorderPlayers();
      postPlayers(players);
      setTouched(true);
      stop();
      // postAppStop();
      postProgress({
        playing: false,
        setting: false,
      });
      postUpdateItemInUse({
        item: null,
        playerId: 'all',
      });
    } else {
      const players = reorderPlayers();
      // star
      postPlayers(players);
      start();

      postProgress({
        setting: false,
        playing: true,
      });
    }
  };
  const handleRestart = (e: React.MouseEvent) => {
    resetData();
    restart();

    postAppRestart();
    postProgress({
      playing: false,
      setting: true,
    });
  };

  return (
    <div className={clsx('flex gap-4')}>
      {!touched && (
        <button className={clsx('btn-primary btn w-40')} onClick={handlePlay}>
          {playing ? (
            <>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 16 16"
                className="mr-1 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
              </svg>
              Stop
            </>
          ) : (
            <>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 16 16"
                className="mr-1 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
              Play
            </>
          )}
        </button>
      )}

      <button className={clsx('btn-primary btn w-40')} onClick={handleRestart}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 16 16"
          className="mr-1 w-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8 6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z"
          />
        </svg>
        Restart
      </button>
    </div>
  );
};
export default memo(GameActions);
