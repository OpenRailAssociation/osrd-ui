import React, { useState } from 'react';
import { Status } from './InputStatusIcon';
import cx from 'classnames';
import FieldWrapper from './FieldWrapper';

type StatusWithMessage = {
  status: Status;
  message?: string;
};

export type TextAreaProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  hint?: string;
  statusWithMessage?: StatusWithMessage;
  inputWrapperClassname?: string;
  maxCharCount?: number;
  warningCharCount?: number;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  value: initialValue,
  hint,
  required,
  disabled,
  readOnly,
  statusWithMessage,
  maxCharCount = 220,
  warningCharCount = 180,
}) => {
  const [value, setValue] = useState(initialValue);
  const [charCount, setCharCount] = useState((initialValue?.toString() || '').length || 0);

  const statusClassname = statusWithMessage?.status ? { [statusWithMessage.status]: true } : {};

  const charCountClass = () => {
    if (charCount === maxCharCount && charCount !== warningCharCount) {
      return 'char-count error';
    } else if (charCount > warningCharCount && charCount < maxCharCount) {
      return 'char-count warning';
    }
    return 'char-count';
  };

  return (
    <FieldWrapper
      id={id}
      label={label}
      hint={hint}
      statusWithMessage={statusWithMessage}
      disabled={disabled}
      required={required}
    >
      <div className="text-area-wrapper">
        {maxCharCount && (
          <div className={charCountClass()}>
            {charCount}/{maxCharCount}
          </div>
        )}
        <textarea
          className={cx('text-area', statusClassname)}
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setCharCount(e.target.value.length);
          }}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxCharCount}
        />
      </div>
    </FieldWrapper>
  );
};

export default TextArea;
