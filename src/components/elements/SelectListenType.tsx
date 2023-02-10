import { useListenTypesActions } from '@/store/ListenTypesSlice';
import { ListenTypes } from '@/types/ListenTypes';
import clsx from 'clsx';
import { useState } from 'react';

const SelectListenType = () => {
  const [option, setOption] = useState<ListenTypes | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const { setType } = useListenTypesActions();

  if (submitted) {
    return null;
  }

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-base-300'
      )}
    >
      <div className="form-control">
        <label className="label">
          <span className="label-text">MODE</span>
        </label>
        <select
          value={option}
          className="select-bordered select w-full max-w-xs"
          onChange={(e) => {
            const value = e.target.value;
            setOption(value as ListenTypes | undefined);
            if (value) {
              setType(value as ListenTypes);
              setSubmitted(true);
            }
          }}
        >
          <option disabled={option !== undefined} value={undefined}>
            Choose view mode
          </option>
          <option value={'offline'}>Offline</option>
          <option value={'online'}>Online</option>
        </select>
      </div>
    </div>
  );
};
export default SelectListenType;
