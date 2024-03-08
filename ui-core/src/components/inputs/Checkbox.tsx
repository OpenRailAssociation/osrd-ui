import React from 'react';
import cx from 'classnames';

interface CheckboxProps {
  id?: string;
  label: string;
  small?: boolean;
  isChecked: boolean;
  isIndeterminate?: boolean;
  onChange: (id?: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  small = false,
  isChecked,
  isIndeterminate = false,
  onChange,
}) => {
  return (
    <label className={cx('custom-checkbox', { 'small': small })}>
      <input
        type="checkbox"
        checked={isChecked}
        ref={input => input && (input.indeterminate = isIndeterminate)}
        onChange={() => onChange(id)}
      />
      <span className='checkmark'></span>
      <div className='label'>{label}</div>
    </label>
  );
};

export default Checkbox;
