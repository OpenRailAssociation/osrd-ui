import React, { useState} from 'react';
import { Gear, RequiredInput, CheckCircle, Info, Alert, Blocked } from '@osrd-project/ui-icons';
import cx from 'classnames';
import useKeyPress from './hooks/useKeyPress';

type InputAffixProps = {
    content:string
    small?: boolean;
    type: "leading" | "trailing";
}

const InputAffix: React.FC<InputAffixProps> = ({
content,
type,
small
}) => {
    return (
        <div className={cx(`${type}-content-wrapper`, { "small":small })}>
            <span className={`${type}-content`}>{content}</span>
        </div>
    )
}

type statusInput = "success" | "info" | "error" | "warning" | "loading";

type statusWithMessage = {
    status:statusInput,
    message?:string
}

type InputStatusIconProps = {
    status:statusInput;
    small?: boolean;
}

const InputStatusIcon: React.FC<InputStatusIconProps> = ({ status, small }) => {
    return (
        <span className={cx("status-icon", status, { "small":small })} >
            { status==='loading' && <Gear size={small ? 'sm' : 'lg'}/>}
            { status==='info' && <Info size={small ? 'sm' : 'lg'}/>}
            { status==='success' && <CheckCircle variant='fill' size={small ? 'sm' : 'lg'}/>}
            { status==='warning' && <Alert variant="fill" size={small ? 'sm' : 'lg'}/>}
            { status==='error' && <Blocked variant="fill" size={small ? 'sm' : 'lg'}/>}
        </span>
    );
}

type InputProps = {
    id:string;
    label: string;
    type: "text" | "number";
    value?: number | string;
    hint?: string;
    leadingContent?:string;
    trailingContent?:string;
    required?:boolean;
    small?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    statusWithMessage?: statusWithMessage;
}

const Input: React.FC<InputProps> = ({ 
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
    small
}) => {
    const [value, setValue] = useState(initialValue);
    const [focusViaKeyboard, setFocusViaKeyboard] = useState(false);
    useKeyPress("Tab", async () => setFocusViaKeyboard(true));

    const statusClassname = {...(statusWithMessage ? { [statusWithMessage.status]:statusWithMessage.status } : {})};
    
    return (
        <div className={cx("feed-back", statusClassname, { 'small': small})}>
            <div className={cx("custom-input", statusClassname)}>
                {/* LABEL */}
                <div className={cx("label-wrapper", { 'small':small, 'has-hint': hint })}>
                    {required && <span className="required"> <RequiredInput/> </span>}
                    <label
                        className={cx("label", {
                            'small':small,
                            'disabled': disabled
                        })}
                        htmlFor={id}
                    >
                        {label}
                    </label>
                </div>

                {/* HINT */}
                {hint && <span className={cx("hint", { 'small':small })}>{hint}</span>}
                
                {/* INPUT WRAPPER AND STATUS ICON */}
                <div className="input-wrapper-and-status-icon">
                    <div className={cx("input-wrapper", {'small':small, 'focused': focusViaKeyboard})}>
                        {leadingContent && <InputAffix content={leadingContent} type="leading" small={small} />}
                        <input 
                            className={cx('input', {
                                'with-leading-only': leadingContent && !trailingContent,
                                'with-trailing-only': trailingContent && !leadingContent,
                                'with-leading-and-trailing': leadingContent && trailingContent,
                                ...statusClassname,
                                'small':small,
                            })}
                            id={id}
                            type={type}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            disabled={disabled}
                            readOnly={readOnly}
                            onBlur={() => setFocusViaKeyboard(false)}
                        />
                        {trailingContent && <InputAffix content={trailingContent} type="trailing" small={small} />}
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

