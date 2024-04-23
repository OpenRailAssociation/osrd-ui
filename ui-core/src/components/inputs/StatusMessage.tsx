import React from 'react';
import cx from 'classnames';
import { status } from './Input';

export type statusWithMessage = {
  status: status;
  message?: string;
};

export type StatusMessageProps = statusWithMessage;

const StatusMessage: React.FC<StatusMessageProps> = ({ status, message }) => {
  return <span className={cx('base-status-message', { [status]: status })}>{message}</span>;
};

export default StatusMessage;
