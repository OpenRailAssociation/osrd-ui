import React from 'react';
import cx from 'classnames';
import InputStatusIcon from './InputStatusIcon';

export type status = 'success' | 'info' | 'error' | 'warning' | 'loading';

export type statusWithMessage = {
  status: status;
  message?: string;
};

export type StatusMessageProps = {
  statusWithMessage: statusWithMessage;
  showIcon?: boolean;
  small?: boolean;
};

const StatusMessage: React.FC<StatusMessageProps> = ({ statusWithMessage, showIcon, small }) => {
  const { status, message } = statusWithMessage;
  if (message === undefined) return null;

  return (
    <div className="status-message-wrapper">
      {showIcon && <InputStatusIcon status={status} small={small} />}
      <span className={cx('status-message', { [status]: status })}>{message}</span>
    </div>
  );
};

export default StatusMessage;
