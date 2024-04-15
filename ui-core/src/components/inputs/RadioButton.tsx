import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import useKeyPress from './hooks/useKeyPress';

export interface RadioButtonProps {
  label: string;
  value: string;
  hint?: string;
  checked: boolean;
  disabled?: boolean;
  readonly?: boolean;
  small?: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  hint,
  checked,
  disabled,
  readonly,
  onChange,
  small,
}) => {
  const [focusViaKeyboard, setFocusViaKeyboard] = useState(false);
  const radioButtonRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusViaKeyboard && radioButtonRef.current) {
      radioButtonRef.current.focus();
    }
  }, [focusViaKeyboard]);

  useKeyPress('Tab', () => setFocusViaKeyboard(true));

  const handleChange = () => {
    if (!checked && !disabled && !readonly) {
      onChange(value);
    }
  };

  return (
    <div
      className={cx('radio-button', { 'read-only': readonly, small })}
      onClick={handleChange}
      tabIndex={0}
      ref={radioButtonRef}
    >
      <div className="radio-container">
        <input
          name="radio"
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          tabIndex={-1}
          onChange={handleChange}
        />
        <span className={cx('checkmark', { focused: focusViaKeyboard })}></span>
        <label className="radio-label">{label}</label>
      </div>
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
};

export default RadioButton;
