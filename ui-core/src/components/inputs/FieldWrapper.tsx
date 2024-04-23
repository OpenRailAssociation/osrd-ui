import React from 'react';
import cx from 'classnames';

import Label from './Label';
import Hint from './Hint';
import StatusMessage, { statusWithMessage } from './StatusMessage';
import InputStatusIcon from './InputStatusIcon';

export type FieldWrapperProps = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  statusWithMessage?: statusWithMessage;
  small?: boolean;
  children: React.ReactNode;
  className?: string;
};

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  label,
  hint,
  required,
  disabled,
  statusWithMessage,
  small = false,
  className,
  children,
}) => {
  const statusClassname = statusWithMessage ? { [statusWithMessage.status]: true } : {};

  return (
    <div className={cx('feed-back', statusClassname, className, { small: small })}>
      <div className="custom-field">
        {/* LABEL AND HINT */}
        <Label
          htmlFor={id}
          text={label}
          required={required}
          hasHint={Boolean(hint)}
          disabled={disabled}
          small={small}
        />
        {hint && <Hint text={hint} />}

        {/* FIELD WRAPPER AND STATUS ICON */}
        <div className="field-wrapper-and-status-icon">
          {children}
          {statusWithMessage && <InputStatusIcon status={statusWithMessage.status} small={small} />}
        </div>

        {/* STATUS MESSAGE */}
        {statusWithMessage?.message && (
          <StatusMessage status={statusWithMessage.status} message={statusWithMessage.message} />
        )}
      </div>
    </div>
  );
};

export default FieldWrapper;
