import React, { useState } from "react";
import cx from "classnames";

import useKeyPress from "./hooks/useKeyPress";
import FieldWrapper, { FieldWrapperProps } from "./FieldWrapper";

type InputAffixProps = {
  value: InputAffixContent | InputAffixContentWithCallback;
  type: "leading" | "trailing";
  disabled: boolean;
  readOnly: boolean;
};

const InputAffix: React.FC<InputAffixProps> = ({ value, type, disabled, readOnly }) => {
  const isContentWithCallback = typeof value === "object" && value !== null && "onClickCallback" in value;
  const spanContent = isContentWithCallback
    ? (value as InputAffixContentWithCallback).content
    : (value as InputAffixContent);
  const wrapperProps = isContentWithCallback
    ? { onClick: (value as InputAffixContentWithCallback).onClickCallback }
    : {};

  return (
    <div className={cx(`${type}-content-wrapper`, { disabled, "read-only": readOnly })} {...wrapperProps}>
      <span className={`${type}-content`}>{spanContent}</span>
    </div>
  );
};

export type status = "success" | "info" | "error" | "warning" | "loading";

export type statusWithMessage = {
  status: status;
  message?: string;
};

type InputAffixContent = string | React.ReactNode;

type InputAffixContentWithCallback = {
  content: string | React.ReactNode;
  onClickCallback: () => void;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperProps & {
    leadingContent?: InputAffixContent | InputAffixContentWithCallback;
    trailingContent?: InputAffixContent | InputAffixContentWithCallback;
    inputWrapperClassname?: string;
  };

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  value: initialValue,
  hint,
  leadingContent,
  trailingContent,
  required,
  disabled = false,
  readOnly = false,
  statusWithMessage,
  inputWrapperClassname,
  small = false,
}) => {
  const [value, setValue] = useState(initialValue);
  const [focusViaKeyboard, setFocusViaKeyboard] = useState(false);
  useKeyPress('Tab', async () => setFocusViaKeyboard(true));

  return (
    <FieldWrapper
      id={id}
      label={label}
      hint={hint}
      statusWithMessage={statusWithMessage}
      disabled={disabled}
      required={required}
      small={small}
    >
      <div className={cx("input-wrapper", inputWrapperClassname, { focused: focusViaKeyboard, small })}>
        {leadingContent && <InputAffix value={leadingContent} type="leading" disabled={disabled} readOnly={readOnly} />}
        <input
          className={cx("input", {
            "with-leading-only": leadingContent && !trailingContent,
            "with-trailing-only": trailingContent && !leadingContent,
            "with-leading-and-trailing": leadingContent && trailingContent,
            [statusWithMessage?.status || ""]: !!statusWithMessage,
          })}
          id={id}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          readOnly={readOnly}
          onBlur={() => setFocusViaKeyboard(false)}
        />
        {trailingContent && (
          <InputAffix value={trailingContent} type="trailing" disabled={disabled} readOnly={readOnly} />
        )}
      </div>
    </FieldWrapper>
  );
};

export default Input;
