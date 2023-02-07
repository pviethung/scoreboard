import { Player } from '@/types/Player';
import Select, { ActionMeta, OnChangeValue } from 'react-select';

type PlayerData = {
  label: string;
  value: Player;
};

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const PlayersSelect = ({
  data,
  isClearable,
  onChange,
}: {
  data: PlayerData[];
  isClearable?: boolean;
  onChange: (
    newValue: OnChangeValue<PlayerData, false>,
    actionMeta: ActionMeta<PlayerData>
  ) => void;
}) => {
  return (
    <>
      <Select
        className="items-select"
        classNamePrefix="select"
        isClearable={isClearable}
        isSearchable={true}
        name="players"
        options={data}
        onChange={onChange}
        placeholder={'Select an player'}
      />
    </>
  );
};

export default PlayersSelect;
