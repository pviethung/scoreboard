import { Item } from '@/types/Item';
import Select, { ActionMeta, OnChangeValue } from 'react-select';

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const ItemSelect = ({
  data,
  onChange,
  isClearable = true,
  placeholder,
  value,
}: {
  data: Item[];
  isClearable?: boolean;
  placeholder?: string;
  value?: Item | null;
  onChange: (
    newValue: OnChangeValue<Item, false>,
    actionMeta: ActionMeta<Item>
  ) => void;
}) => {
  return (
    <>
      <Select
        className="items-select"
        value={value !== undefined ? value : undefined}
        classNamePrefix="select"
        isClearable={isClearable}
        isSearchable={true}
        name="items"
        options={data}
        onChange={onChange}
        placeholder={placeholder ? placeholder : 'Select an item'}
      />
    </>
  );
};

export default ItemSelect;
