import cx from 'classnames';
import React, { ReactNode } from 'react';
import { Gear } from '@osrd-project/ui-icons';

type ButtonVariant = 'Normal' | 'Cancel' | 'Quiet' | 'Destructive' | 'Primary';

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  isDisabled?: boolean;
  leadingIcon?: ReactNode;
  counter?: number;
  size?: 'large' | 'medium' | 'small';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'Primary',
  isLoading = false,
  isDisabled = false,
  leadingIcon = null,
  counter = null,
  size = 'large',
  onClick,
}) => {
  const handleClick = () => {
    if (!isLoading && !isDisabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={cx('button flex items-center', variant.toLowerCase(), size.toLowerCase(), {
        loading: isLoading,
      })}
      onClick={handleClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <>
          <span className="icon">
            <Gear variant="fill" size="lg" />
          </span>
        </>
      ) : (
        <>
          {leadingIcon && <span className="leading-icon mr-2">{leadingIcon}</span>}
          {label}
          {counter !== null && <span className="counter ml-2">{counter}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
