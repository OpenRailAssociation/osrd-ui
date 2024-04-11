import React, { useState } from "react";
import RadioButton, { RadioButtonProps } from "./RadioButton";
import cx from "classnames";
import InputStatusIcon, { Status } from "./InputStatusIcon";
import { RequiredInput } from "@osrd-project/ui-icons";

export interface RadioGroupProps {
  label?: string;
  subtitle?: string;
  readonly?: boolean;
  required?: boolean;
  small?: boolean;
  options: RadioButtonProps[];
  statusWithMessage?: {
    status: Status;
    message?: string;
  };
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  subtitle,
  readonly,
  options,
  statusWithMessage,
  required,
  small,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(options.find((option) => option.checked)?.value || "");

  const handleOptionChange = (value: string) => {
    setSelectedValue(value);
  };

  const statusClassname = statusWithMessage?.status ? { [statusWithMessage.status]: true } : {};

  return (
    <div className={cx("radio-button-wrapper", statusClassname)}>
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
          label={option.label}
          value={option.value}
          hint={option.hint}
          readonly={readonly}
          checked={readonly ? option.checked : selectedValue === option.value}
          disabled={option.disabled}
          onChange={handleOptionChange}
          small={small}
        />
      ))}
      {statusWithMessage?.message && (
        <div className="status-with-message">
          <span className={cx("status-icon", statusWithMessage.status)}>
            <InputStatusIcon status={statusWithMessage.status} />
          </span>

          <span className={cx("status-message", statusClassname)}>{statusWithMessage.message}</span>
        </div>
      )}
    </div>
  );
};

export default RadioGroup;
