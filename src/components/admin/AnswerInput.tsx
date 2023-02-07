import { postUpdateItemInUse } from '@/broadcast';
import AttackPlayerForm from '@/components/admin/AttackPlayerForm';
import ItemSelect from '@/components/admin/ItemsSelect';
import SwapItemForm from '@/components/admin/SwapItemForm';
import { useConfigData } from '@/store/configSlice';
import { usePlayer, usePlayersActions } from '@/store/playersSlice';
import { Answer } from '@/types/Answer';
import { Item, ItemValue } from '@/types/Item';
import { getItem, getItemCalcFn } from '@/utils/getItem';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AnswerInput = ({
  disabled,
  answer,
  playerId,
}: {
  answer: Answer;
  disabled: boolean;
  playerId: string;
}) => {
  const [answered, setAnswered] = useState(false);
  const [bettedPoint, setBettedPoint] = useState(10);
  const [earnedPoint, setEarnedPoint] = useState(0);
  const { setCurrentTurnPlayerPoint, setCurrentTurnPlayerUsedItem } =
    usePlayersActions();
  // Set current betted point
  const { playing } = useConfigData();
  const player = usePlayer(playerId);
  const [usedItem, setUsedItem] = useState<Item | null>(null);
  const [doubleBet, setDoubleBet] = useState(false);

  if (!playing) {
    disabled = true;
  }

  useEffect(() => {
    console.log(player);
  }, [usedItem, bettedPoint]);

  useEffect(() => {
    // trigger store actions
    setCurrentTurnPlayerPoint(playerId, earnedPoint);
  }, [earnedPoint]);

  useEffect(() => {
    setCurrentTurnPlayerUsedItem(playerId, usedItem);
    setEarnedPoint(0);
    setAnswered(false);
    setBettedPoint(10);

    if (usedItem?.value === 'double_bet') {
      setDoubleBet(true);
    } else {
      setDoubleBet(false);
    }

    if (usedItem?.value === 'swap') {
      if (player)
        toast(
          (t) => (
            <SwapItemForm
              onClose={() => {
                setUsedItem(null);
              }}
              toastObj={t}
              srcPlayer={player}
            />
          ),
          {
            duration: Infinity,
          }
        );
    } else {
    }

    if (usedItem?.value === 'attack' || usedItem?.value === 'strike') {
      if (player) {
        toast(
          (t) => (
            <AttackPlayerForm
              type={usedItem.value as 'attack' | 'strike'}
              onClose={() => {
                setUsedItem(null);
              }}
              toastObj={t}
              srcPlayer={player}
            />
          ),
          {
            duration: Infinity,
          }
        );
      }
    }

    postUpdateItemInUse({
      playerId,
      item: usedItem,
    });
  }, [usedItem]);

  const handleAnswer = (isCorrectAnswer: boolean) => {
    return (e: React.MouseEvent) => {
      setAnswered(true);
      if (doubleBet) {
        const questionPoint = isCorrectAnswer
          ? bettedPoint
          : -((player?.point || 0) / 2);
        setEarnedPoint(questionPoint);
        return;
      }

      const questionPoint = isCorrectAnswer ? bettedPoint : -bettedPoint;
      let totalPoint = questionPoint;
      if (usedItem) {
        const calcFn = getItemCalcFn(usedItem.value as ItemValue);
        totalPoint = calcFn(questionPoint);
      }
      setEarnedPoint(totalPoint);
    };
  };
  const handleReset = () => {
    return (e: React.MouseEvent) => {
      setAnswered(false);
      setEarnedPoint(0);
    };
  };

  return (
    <>
      <div className={clsx('relative flex flex-col items-center')}>
        {!disabled && player && player.itemsLeft.length > 0 && (
          <>
            <ItemSelect
              data={player.itemsLeft}
              value={usedItem}
              onChange={(newValue) => {
                if (newValue) {
                  const item = getItem(newValue.value);
                  if (item) {
                    setUsedItem(item);
                  }
                } else {
                  setUsedItem(null);
                }
              }}
            />
            <div className="mt-4" />
          </>
        )}
        {disabled && usedItem && (
          <span className={clsx('absolute -top-8 mb-2 text-primary')}>
            {usedItem.label}
          </span>
        )}

        <input
          className={clsx('h-8 w-full rounded-tl-md rounded-tr-md text-center')}
          type="number"
          min={10}
          max={doubleBet ? (player?.point || 0) * 2 : player?.point || 0}
          step={10}
          value={bettedPoint}
          onChange={(e) => setBettedPoint(+e.target.value)}
          disabled={disabled}
        />
        <div className={clsx('btn-group w-full', '[&>button]:flex-1')}>
          <button
            className={clsx(
              'btn-error btn-sm btn !rounded-tl-none rounded-br-none text-3xl ',
              {
                'btn-disabled': answered || disabled,
              }
            )}
            onClick={handleAnswer(false)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              className="w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
            </svg>
          </button>
          <button
            className={clsx(
              'btn-primary btn-sm btn rounded-tr-none rounded-br-none text-3xl ',
              {
                'btn-disabled': !answered || disabled,
              }
            )}
            onClick={handleReset()}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              className="w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8 6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z"
              />
            </svg>
          </button>
          <button
            className={clsx(
              'btn-success btn-sm btn rounded-tl-none rounded-bl-none !rounded-tr-none text-3xl',
              {
                'btn-disabled': answered || disabled,
              }
            )}
            onClick={handleAnswer(true)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 16 16"
              className="w-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
            </svg>
          </button>
        </div>
      </div>

      {disabled && answer.status?.beAttacked && (
        <div
          className={clsx(
            'mt-4 w-32 whitespace-normal text-center text-primary'
          )}
        >
          Be attacked by:
          <p className={clsx('line-clamp-1')}>
            {answer.status.beAttacked.by.name}
          </p>
          <p className={clsx('line-clamp-1')}>
            -{answer.status.beAttacked.point} point
          </p>
        </div>
      )}

      {disabled && answer.status?.beStriked && (
        <div
          className={clsx(
            'mt-4 w-32 whitespace-normal text-center text-primary'
          )}
        >
          Be striked by:
          <p className={clsx('line-clamp-1')}>
            {answer.status.beStriked.by.name}
          </p>
        </div>
      )}

      <p
        className={clsx('mt-4 w-full text-center', {
          'text-green-500': earnedPoint > 0,
          'text-red-500': earnedPoint < 0,
        })}
      >
        {earnedPoint === 0
          ? '---'
          : earnedPoint > 0
          ? `+${earnedPoint} point`
          : `${earnedPoint} point`}
      </p>
    </>
  );
};
export default AnswerInput;
