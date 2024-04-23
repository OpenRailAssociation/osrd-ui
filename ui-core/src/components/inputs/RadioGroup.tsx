import React, { ChangeEvent, useState } from 'react';
import RadioButton, { RadioButtonProps } from './RadioButton';
import InputStatusIcon from './InputStatusIcon';
import { RequiredInput } from '@osrd-project/ui-icons';

import cx from 'classnames';
import { statusWithMessage } from './FieldWrapper';

export type RadioGroupProps = {
  label?: string;
  subtitle?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  small?: boolean;
  value?: string;
  options: RadioButtonProps[];
  statusWithMessage?: statusWithMessage;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  value,
  subtitle,
  readOnly,
  disabled,
  options,
  statusWithMessage,
  required,
  small,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

  const handleOptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLLabelElement>,
    nextOption: RadioButtonProps
  ) => {
    if (!readOnly) {
      setSelectedValue(nextOption.value);
      nextOption.onChange?.(e);
    }
  };

  const statusClassname = statusWithMessage?.status ? { [statusWithMessage.status]: true } : {};

  return (
    <div className={cx('radio-button-wrapper', statusClassname)}>
      {label && (
        <label className="label">
          {required && (
            <span className="required">
              <RequiredInput />
            </span>
          )}
          {label} {subtitle && <span className="subtitle">{subtitle}</span>}
        </label>
      )}

      {options.map((option) => (
        <RadioButton
          key={option.value}
          {...option}
          readOnly={readOnly}
          disabled={disabled}
          checked={selectedValue === option.value}
          onChange={(e) => {
            handleOptionChange(e, option);
          }}
          small={small}
        />
      ))}
      {statusWithMessage?.message && (
        <div className="status-with-message">
          <InputStatusIcon status={statusWithMessage.status} />
          <span className={cx('status-message', statusClassname)}>{statusWithMessage.message}</span>
        </div>
      )}
    </div>
  );
};

export default RadioGroup;
