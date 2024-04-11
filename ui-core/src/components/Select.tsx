import React, { useState } from 'react';
import FieldWrapper, { FieldWrapperProps } from './inputs/FieldWrapper';
import cx from 'classnames';

export type SelectOption = { value: string; label: string };

/**
 * Type for the props of the Select component.
 *
 * We use Omit to create a new type based on React.InputHTMLAttributes<HTMLSelectElement>,
 * but without the 'value' property. This is because we want to enforce that the 'value'
 * prop for our Select component is always a string. In React, the 'value' prop for a
 * select element can be a string, a number, or an array of strings (for multiple selects),
 * but for our Select component, we want to ensure that it's always a string.
 */
export type SelectProps = Omit<React.InputHTMLAttributes<HTMLSelectElement>, 'value'> &
  FieldWrapperProps & {
    value?: string;
    placeholder?: string;
    options: SelectOption[];
  };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
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
      onChange,
    },
    ref
  ) => {
    if (value && value != '' && !options.some((option) => option.value === value)) {
      console.warn(`option "${value}" does not match any option`);
    }

    const [selectedOption, setSelectedOption] = useState<string>(value || '');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(e.target.value);
      onChange?.(e);
    };

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
          className={cx('custom-select', {
            'placeholder-selected': selectedOption === '',
            small,
            'read-only': readOnly,
            [statusWithMessage?.status || '']: !!statusWithMessage,
          })}
          value={selectedOption}
          required={required}
          disabled={disabled || readOnly}
          ref={ref}
          onChange={handleChange}
        >
          <option value="">{placeholder ? `– ${placeholder} –` : ''}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  }
);

Select.displayName = 'Select';

export default Select;
