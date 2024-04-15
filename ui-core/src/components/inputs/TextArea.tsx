import React, { useState } from 'react';
import InputStatusIcon, { Status } from './InputStatusIcon';
import { RequiredInput } from '@osrd-project/ui-icons';
import cx from 'classnames';

import useKeyPress from './hooks/useKeyPress';

type StatusWithMessage = {
  status: Status;
  message?: string;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  statusWithMessage?: StatusWithMessage;
  inputWrapperClassname?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  value: initialValue,
  hint,
  required,
  disabled,
  readOnly,
  statusWithMessage,
  inputWrapperClassname,
}) => {
  const [value, setValue] = useState(initialValue);
  const [focusViaKeyboard, setFocusViaKeyboard] = useState(false);

  useKeyPress('Tab', async () => setFocusViaKeyboard(true));

  const statusClassname = statusWithMessage?.status ? { [statusWithMessage.status]: true } : {};

  return (
    <div className={cx('text-area-wrapper', statusClassname)}>
      <div className="custom-input">
        <div className={cx('label-wrapper', { 'has-hint': hint })}>
          {required && (
            <span className="required">
              <RequiredInput />
            </span>
          )}
          <label className={cx('label', { disabled })} htmlFor={id}>
            {label}
          </label>
        </div>

        {hint && <span className="hint">{hint}</span>}

        <div className="input-wrapper-and-status-icon">
          <div
            className={cx('input-wrapper', inputWrapperClassname, { focused: focusViaKeyboard })}
          >
            <textarea
              className={cx('input', statusClassname)}
              id={id}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={disabled}
              readOnly={readOnly}
              onBlur={() => setFocusViaKeyboard(false)}
            />
          </div>
          {statusWithMessage && (
            <span className={cx('status-icon', statusWithMessage.status)}>
              <InputStatusIcon status={statusWithMessage.status} />
            </span>
          )}
        </div>

        {statusWithMessage?.message && (
          <span className={cx('status-message', statusClassname)}>{statusWithMessage.message}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
