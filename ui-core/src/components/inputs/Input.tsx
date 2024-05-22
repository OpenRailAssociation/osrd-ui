import React from 'react';

import cx from 'classnames';

import FieldWrapper, { type FieldWrapperProps } from './FieldWrapper';
import useFocusByTab from '../../hooks/useFocusByTab';

type InputAffixProps = {
  value: InputAffixContent | InputAffixContentWithCallback;
  type: 'leading' | 'trailing';
  disabled: boolean;
  readOnly: boolean;
};

const InputAffix: React.FC<InputAffixProps> = ({ value, type, disabled, readOnly }) => {
  const isContentWithCallback =
    typeof value === 'object' && value !== null && 'onClickCallback' in value;
  const spanContent = isContentWithCallback
    ? (value as InputAffixContentWithCallback).content
    : (value as InputAffixContent);
  const wrapperProps = isContentWithCallback
    ? { onClick: (value as InputAffixContentWithCallback).onClickCallback }
    : {};

  return (
    <div
      className={cx(`${type}-content-wrapper`, { disabled, 'read-only': readOnly })}
      {...wrapperProps}
    >
      <span className={`${type}-content`}>{spanContent}</span>
    </div>
  );
};

type InputAffixContent = string | React.ReactNode;

type InputAffixContentWithCallback = {
  content: string | React.ReactNode;
  onClickCallback: () => void;
};

type IconConfig = {
  icon: React.ReactNode;
  action: () => void;
  className?: string;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<FieldWrapperProps, 'children'> & {
    leadingContent?: InputAffixContent | InputAffixContentWithCallback;
    trailingContent?: InputAffixContent | InputAffixContentWithCallback;
    inputFieldWrapperClassname?: string;
    withIcons?: IconConfig[];
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      type,
      hint,
      leadingContent,
      trailingContent,
      required,
      disabled = false,
      readOnly = false,
      statusWithMessage,
      inputFieldWrapperClassname = '',
      small = false,
      withIcons = [],
      onKeyUp,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const { handleKeyUp, handleBlur, isFocusByTab } = useFocusByTab({ onBlur, onKeyUp });

    return (
      <FieldWrapper
        id={id}
        label={label}
        hint={hint}
        statusWithMessage={statusWithMessage}
        disabled={disabled}
        required={required}
        small={small}
        className={cx('input-field-wrapper', inputFieldWrapperClassname)}
      >
        <div
          className={cx('input-wrapper', {
            small,
            'focused-by-tab': isFocusByTab,
          })}
        >
          {leadingContent && (
            <InputAffix
              value={leadingContent}
              type="leading"
              disabled={disabled}
              readOnly={readOnly}
            />
          )}
          <div className="input-container">
            <input
              ref={ref}
              className={cx('input', {
                'with-leading-only': leadingContent && !trailingContent,
                'with-trailing-only': trailingContent && !leadingContent,
                'with-leading-and-trailing': leadingContent && trailingContent,
                [statusWithMessage?.status || '']: !!statusWithMessage,
              })}
              id={id}
              type={type}
              disabled={disabled}
              readOnly={readOnly}
              onKeyUp={handleKeyUp}
              onBlur={handleBlur}
              {...rest}
            />
            <div
              className={cx('input-icons', {
                small,
              })}
            >
              {withIcons.map((iconConfig, index) => (
                <span key={index} className={iconConfig?.className} onClick={iconConfig.action}>
                  {iconConfig.icon}
                </span>
              ))}
            </div>
          </div>
          {trailingContent && (
            <InputAffix
              value={trailingContent}
              type="trailing"
              disabled={disabled}
              readOnly={readOnly}
            />
          )}
        </div>
      </FieldWrapper>
    );
  }
);
Input.displayName = 'Input';
export default Input;
