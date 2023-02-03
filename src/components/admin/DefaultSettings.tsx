import { useConfigActions, useConfigData } from '@/store/configSlice';
import clsx from 'clsx';
import { useState } from 'react';

const DefaultSettings = () => {
  const { initialPoint, numOfQuest, timePerQuest } = useConfigData();
  const configActions = useConfigActions();
  const [appPoint, setAppPoint] = useState(initialPoint);
  const [appNumOfQuest, setAppNumOfQuest] = useState(numOfQuest);
  const [appTimePerQuest, setAppTimePerQuest] = useState(timePerQuest);

  return (
    <div className={clsx('mx-auto w-80')}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          configActions.setConfig({
            initialPoint: appPoint,
            numOfQuest: appNumOfQuest,
            timePerQuest: appTimePerQuest,
            playing: false,
            appInitialized: true,
          });
        }}
        className={clsx('flex flex-col gap-4')}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">DEFAULT PLAYER POINT</span>
          </label>
          <input
            type="text"
            value={appPoint}
            onChange={(e) => setAppPoint(+e.target.value)}
            className="input-bordered input w-full max-w-xs"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">NUMBER OF QUESTIONS</span>
          </label>
          <input
            type="text"
            value={appNumOfQuest}
            onChange={(e) => setAppNumOfQuest(+e.target.value)}
            className="input-bordered input w-full max-w-xs"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">TIME PER QUESTION</span>
          </label>
          <input
            type="text"
            value={appTimePerQuest}
            onChange={(e) => setAppTimePerQuest(+e.target.value)}
            className="input-bordered input w-full max-w-xs"
          />
        </div>
        <button className={clsx('btn-primary btn-block btn')}>CONFIRM</button>
      </form>
    </div>
  );
};
export default DefaultSettings;
