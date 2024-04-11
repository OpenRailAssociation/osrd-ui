import React from 'react';
import { Gear, CheckCircle, Info, Alert, Blocked } from '@osrd-project/ui-icons';
import cx from 'classnames';

import Label from './Label';
import Hint from './Hint';
import StatusMessage from './StatusMessage';

export type status = 'success' | 'info' | 'error' | 'warning' | 'loading';

type InputStatusIconProps = {
  status: status;
  small?: boolean;
};

const InputStatusIcon: React.FC<InputStatusIconProps> = ({ status, small }) => {
  const size = small ? 'sm' : 'lg';
  return (
    <span className={cx('status-icon', status)}>
      {status === 'loading' && <Gear size={size} />}
      {status === 'info' && <Info size={size} />}
      {status === 'success' && <CheckCircle variant="fill" size={size} />}
      {status === 'warning' && <Alert variant="fill" size={size} />}
      {status === 'error' && <Blocked variant="fill" size={size} />}
    </span>
  );
};

export type statusWithMessage = {
  status: status;
  message?: string;
};

export type FieldWrapperProps = {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  statusWithMessage?: statusWithMessage;
  small?: boolean;
  children: React.ReactNode;
};

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  label,
  hint,
  required,
  disabled,
  statusWithMessage,
  small = false,
  children,
}) => {
  const statusClassname = {
    ...(statusWithMessage ? { [statusWithMessage.status]: statusWithMessage.status } : {}),
  };

  return (
    <div className={cx('feed-back', statusClassname, { small: small })}>
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
