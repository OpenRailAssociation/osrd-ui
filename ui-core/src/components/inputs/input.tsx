import React, { useState} from 'react';
import { Trophy, RequiredInput } from '@osrd-project/ui-icons';
import cx from 'classnames';

interface InputProps {
    id:string;
    label: string;
    type: "text" | "number";
    value?: number | string;
    hint?: string;
    leadingContent?:string;
    trailingContent?:string;
    checkIndicator?:boolean;
    required?:boolean;
    small?: boolean;
}

//TODO Tag
//Est ce qu'on veut focus lorsqu'on clique sur prefix/suffixe de l'input ?
// - box shadow de l'input
// - small leading content input line-height: 16px -> 8px
// - icon checkIndicator
// - input number avec les arrows.
const Input: React.FC<InputProps> = ({ 
    id,
    label,
    type,
    value: initialValue,
    hint,
    leadingContent,
    trailingContent,
    checkIndicator,
    required,
    small
}) => {
    const [value, setValue] = useState(initialValue);    
    
    return (
        <div className={"custom-input"}>
            <div className="label-wrapper">
                {required && <span className="required"> <RequiredInput/> </span>}
                <label className={cx("label", {'small':small})} htmlFor={id}>{label}</label>
            </div>
            {hint && <span className="hint">{hint}</span>}
            <div className={cx("input-wrapper")}>
                {leadingContent && <span className={cx("leading-content", { "small":small })}>{leadingContent}</span>}
                <input 
                    className={cx('input', {
                        'with-leading-only': leadingContent && !trailingContent,
                        'with-trailing-only': trailingContent && !leadingContent,
                        'with-leading-and-trailing': leadingContent && trailingContent,
                        'small':small
                    })}
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {trailingContent && <span className={cx("trailing-content", { "small":small })}>{trailingContent}</span>}
                {checkIndicator && <span className={cx("checkIndicator", { "small":small })} ><Trophy size={small ? 'sm' : 'lg'}/></span>}
            </div>
        </div>
    )
}
export default Input;