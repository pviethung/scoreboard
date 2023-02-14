import tikSound from '@/assets/tik-effect.mp3';
import { useConfigData } from '@/store/configSlice';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import ReactCountdown, { CountdownRenderProps } from 'react-countdown';

const CountDownContent = ({
  completed,
  minutes,
  seconds,
}: {
  completed: boolean;
  minutes: number;
  seconds: number;
}) => {
  const { timePerQuest } = useConfigData();
  const content = completed ? (
    /* @ts-ignore */
    <span style={{ '--value': seconds }}></span>
  ) : (
    /* @ts-ignore */
    <span style={{ '--value': seconds === 0 ? timePerQuest : seconds }}></span>
  );

  return (
    <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
      <div className="p-2 text-neutral-content">
        <span className="countdown font-mono text-xl">
          {/* @ts-ignore */}
          {content}
        </span>
        s
      </div>
    </div>
  );
};
const renderer = ({ completed, seconds, minutes }: CountdownRenderProps) => {
  return (
    <CountDownContent
      completed={completed}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

const CountDown = () => {
  const { timePerQuest } = useConfigData();
  const [isCounting, setIsCounting] = useState(false);
  const [date, setDate] = useState(Date.now() + timePerQuest * 1000);
  const countdownRef = useRef<ReactCountdown>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (countdownRef.current) {
      countdownRef.current.pause();
    }
  }, []);

  useEffect(() => {
    if (isCounting) {
      setTimeout(() => {
        if (!audioRef.current) return;
        audioRef.current.play();
      }, 1000);
    } else {
      if (!audioRef.current) return;
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [isCounting]);

  return (
    <div className={clsx('flex items-center')}>
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth={0}
        viewBox="0 0 15 15"
        className={clsx('w-6')}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L12.058 2.05806C12.3021 1.81398 12.6978 1.81398 12.9419 2.05806C13.186 2.30214 13.186 2.69786 12.9419 2.94194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13361 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.49998 8.49998V4.09998C5.06992 4.09998 3.09998 6.06992 3.09998 8.49998C3.09998 10.93 5.06992 12.9 7.49998 12.9C8.715 12.9 9.815 12.4075 10.6112 11.6112L7.49998 8.49998Z"
          fill="currentColor"
        />
      </svg>

      <ReactCountdown
        ref={countdownRef}
        date={date}
        renderer={renderer}
        onStart={({ total }) => {
          setDate(Date.now() + total);
        }}
        onComplete={() => {
          setIsCounting(false);
        }}
      />

      <button
        className={clsx('btn-sm btn')}
        onClick={() => {
          setDate(Date.now() + timePerQuest * 1000);
          if (countdownRef.current) {
            countdownRef.current.getApi().pause();
            setIsCounting(false);
          }
        }}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          viewBox="0 0 24 24"
          className="w-6 fill-green-500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M6 13c0-1.65.67-3.15 1.76-4.24L6.34 7.34A8.014 8.014 0 004 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91zm14 0c0-4.42-3.58-8-8-8-.06 0-.12.01-.18.01l1.09-1.09L11.5 2.5 8 6l3.5 3.5 1.41-1.41-1.08-1.08c.06 0 .12-.01.17-.01 3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93z" />
        </svg>
      </button>

      <button
        className={clsx('btn-primary btn-sm btn w-12')}
        onClick={() => {
          if (!countdownRef.current) return;
          if (isCounting) {
            countdownRef.current.getApi().pause();
            setIsCounting(false);
          } else {
            if (date < Date.now()) {
              return;
            }
            countdownRef.current.getApi().start();
            setIsCounting(true);
          }
        }}
      >
        {!isCounting ? (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 16 16"
            className="w-6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
          </svg>
        ) : (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 512 512"
            className="w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M120.16 45A20.162 20.162 0 0 0 100 65.16v381.68A20.162 20.162 0 0 0 120.16 467h65.68A20.162 20.162 0 0 0 206 446.84V65.16A20.162 20.162 0 0 0 185.84 45h-65.68zm206 0A20.162 20.162 0 0 0 306 65.16v381.68A20.162 20.162 0 0 0 326.16 467h65.68A20.162 20.162 0 0 0 412 446.84V65.16A20.162 20.162 0 0 0 391.84 45h-65.68z" />
          </svg>
        )}
      </button>

      <audio ref={audioRef} src={tikSound}>
        <a href="/media/cc0-audio/t-rex-roar.mp3">Download audio</a>
      </audio>
    </div>
  );
};

export default CountDown;
