import React, { useEffect, useState } from 'react';

import cx from 'classnames';

import FieldWrapper, { type FieldWrapperProps } from './inputs/FieldWrapper';

export type SelectProps<T> = Omit<
  React.InputHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange'
> &
  Omit<FieldWrapperProps, 'children'> & {
    options: Array<T>;
    value: T;
    getOptionLabel: (option: T) => string;
    onChange: (option?: T) => void;
  };

const Select = <T,>({
  id,
  label,
  hint,
  value,
  options,
  placeholder,
  statusWithMessage,
  required,
  disabled,
  readOnly,
  small,
  getOptionLabel,
  onChange,
}: SelectProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<T | undefined>(value);
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.target.selectedIndex;
    const newSelectedOption = options[placeholder ? index - 1 : index];
    setSelectedOption(newSelectedOption);
    onChange(newSelectedOption);
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <FieldWrapper
      id={id}
      label={label}
      hint={hint}
      statusWithMessage={statusWithMessage}
      required={required}
      disabled={disabled}
      small={small}
    >
      <select
        className={cx('osrd-ui-custom-select', statusWithMessage?.status, {
          'placeholder-selected': placeholder && !selectedOption,
          small,
          'read-only': readOnly,
        })}
        required={required}
        disabled={disabled || readOnly}
        onChange={handleOnChange}
      >
        {placeholder && <option>{`– ${placeholder} –`}</option>}
        {options.map((option) => (
          /* eslint-disable-next-line react/jsx-key */
          <option selected={option === selectedOption}>{getOptionLabel(option)}</option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default Select;
