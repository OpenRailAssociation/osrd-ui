import React from 'react';
import { Gear, CheckCircle, Info, Alert, Blocked } from '@osrd-project/ui-icons';
import cx from 'classnames';

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

export default InputStatusIcon;
