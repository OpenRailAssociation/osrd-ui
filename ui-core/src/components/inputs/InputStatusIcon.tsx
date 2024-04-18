import React from 'react';
import { Gear, CheckCircle, Info, Alert, Blocked } from '@osrd-project/ui-icons';

export type Status = 'success' | 'info' | 'error' | 'warning' | 'loading';

interface InputStatusIconProps {
  status: Status;
  small?: boolean;
}

const InputStatusIcon: React.FC<InputStatusIconProps> = ({ status, small }) => {
  const iconProps = { size: small ? 'sm' : 'lg' } as const;
  const statusClass = `status-icon ${status}`;

  switch (status) {
    case 'loading':
      return (
        <span className={statusClass}>
          <Gear {...iconProps} />
        </span>
      );
    case 'info':
      return (
        <span className={statusClass}>
          <Info {...iconProps} />
        </span>
      );
    case 'success':
      return (
        <span className={statusClass}>
          <CheckCircle variant="fill" {...iconProps} />
        </span>
      );
    case 'warning':
      return (
        <span className={statusClass}>
          <Alert variant="fill" {...iconProps} />
        </span>
      );
    case 'error':
      return (
        <span className={statusClass}>
          <Blocked variant="fill" {...iconProps} />
        </span>
      );
    default:
      return null;
  }
};

export default InputStatusIcon;
