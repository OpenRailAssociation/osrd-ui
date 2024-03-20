import React, { useState} from 'react';
import { Gear, RequiredInput, CheckCircle, Info, Alert, Blocked } from '@osrd-project/ui-icons';
import cx from 'classnames';
import useKeyPress from './hooks/useKeyPress';

type InputAffixProps = {
    value:InputAffixContent | InputAffixContentWithCallback;
    type: "leading" | "trailing";
}

const InputAffix: React.FC<InputAffixProps> = ({
value,
type,
}) => {

  const isContentWithCallback = typeof value === 'object' && value !== null && 'onClickCallback' in value;
  const spanContent = isContentWithCallback ? (value as InputAffixContentWithCallback).content : value as InputAffixContent;
  const wrapperProps = isContentWithCallback ? { onClick: (value as InputAffixContentWithCallback).onClickCallback } : {};

    return (
        <div className={`${type}-content-wrapper`} {...wrapperProps}>
            <span className={`${type}-content`}>{spanContent}</span>
        </div>
    )
}

type status = "success" | "info" | "error" | "warning" | "loading";

type InputStatusIconProps = {
    status:status;
    small?: boolean;
}

const InputStatusIcon: React.FC<InputStatusIconProps> = ({ status, small }) => {
    return (
        <span className={cx("status-icon", status)} >
            { status==='loading' && <Gear size={small ? 'sm' : 'lg'}/>}
            { status==='info' && <Info size={small ? 'sm' : 'lg'}/>}
            { status==='success' && <CheckCircle variant='fill' size={small ? 'sm' : 'lg'}/>}
            { status==='warning' && <Alert variant="fill" size={small ? 'sm' : 'lg'}/>}
            { status==='error' && <Blocked variant="fill" size={small ? 'sm' : 'lg'}/>}
        </span>
    );
}

type statusWithMessage = {
    status:status,
    message?:string
}

type InputAffixContent = string | React.ReactNode;

type InputAffixContentWithCallback = {
    content: string | React.ReactNode;
    onClickCallback: () => void;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    id:string;
    label: string;
    hint?: string;
    leadingContent?:InputAffixContent | InputAffixContentWithCallback;
    trailingContent?:InputAffixContent | InputAffixContentWithCallback;
    small?: boolean;
    statusWithMessage?: statusWithMessage;
    inputWrapperClassname?:string
}

export const Input: React.FC<InputProps> = ({ 
    id,
    label,
    type,
    value: initialValue,
    hint,
    leadingContent,
    trailingContent,
    required,
    disabled,
    readOnly,
    statusWithMessage,
    inputWrapperClassname,
    small = false
}) => {
    const [value, setValue] = useState(initialValue);
    const [focusViaKeyboard, setFocusViaKeyboard] = useState(false);
    useKeyPress("Tab", async () => setFocusViaKeyboard(true));

    const statusClassname = {...(statusWithMessage ? { [statusWithMessage.status]:statusWithMessage.status } : {})};
    
    return (
        <div className={cx("feed-back", statusClassname, { 'small': small})}>
            <div className="custom-input">
                {/* LABEL */}
                <div className={cx("label-wrapper", { 'has-hint': hint })}>
                    {required && <span className="required"> <RequiredInput/> </span>}
                    <label
                        className={cx("label", {'disabled': disabled })}
                        htmlFor={id}
                    >
                        {label}
                    </label>
                </div>

                {/* HINT */}
                {hint && <span className="hint">{hint}</span>}
                
                {/* INPUT WRAPPER AND STATUS ICON */}
                <div className="input-wrapper-and-status-icon">
                    <div className={cx("input-wrapper", inputWrapperClassname, {'focused': focusViaKeyboard})}>
                        {leadingContent && <InputAffix value={leadingContent} type="leading" />}
                        <input 
                            className={cx('input', {
                                'with-leading-only': leadingContent && !trailingContent,
                                'with-trailing-only': trailingContent && !leadingContent,
                                'with-leading-and-trailing': leadingContent && trailingContent,
                                ...statusClassname
                            })}
                            id={id}
                            type={type}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            disabled={disabled}
                            readOnly={readOnly}
                            onBlur={() => setFocusViaKeyboard(false)}
                        />
                        {trailingContent && <InputAffix value={trailingContent} type="trailing" />}
                    </div>
                    {statusWithMessage && <InputStatusIcon status={statusWithMessage.status} small={small} />}
                </div>

                {/* STATUS MESSAGE */}
                {statusWithMessage?.message && <span className={cx("status-message", statusClassname)}>{statusWithMessage.message}</span>}
            </div>
        </div>
    )
}

export default Input;

