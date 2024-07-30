import cx from 'classnames';
import React, { type ButtonHTMLAttributes, ReactNode } from 'react';
import { Gear } from '@osrd-project/ui-icons';

type ButtonVariant = 'Normal' | 'Cancel' | 'Quiet' | 'Destructive' | 'Primary';
type ButtonSize = 'large' | 'medium' | 'small';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'> & {
  label: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  isDisabled?: boolean;
  leadingIcon?: ReactNode;
  counter?: number;
  size?: ButtonSize;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'Primary',
  isLoading = false,
  isDisabled = false,
  leadingIcon = null,
  counter = null,
  size = 'large',
  onClick,
  ...btnAttrs
}) => {
  const handleClick = () => {
    if (!isLoading && !isDisabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      {...btnAttrs}
      className={cx(
        'button flex items-center',
        btnAttrs.className,
        variant.toLowerCase(),
        size.toLowerCase(),
        {
          loading: isLoading,
        }
      )}
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
