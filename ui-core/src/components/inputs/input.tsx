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
// - utilisation de classnames
const Input: React.FC<InputProps> = ({ id, label, type, value: initialValue, hint, leadingContent, trailingContent, checkIndicator, required, small }) => {
    const [value, setValue] = useState(initialValue);    
    
    const d = 'bg-red-50'
    return (
        <div className={`custom-input ${d}`}>
            <div className="label-wrapper">
                {required && <span className="required"> <RequiredInput/> </span>}
                <label className="label" htmlFor={id}>{label}</label>
            </div>
            {hint && <span className="hint">{hint}</span>}
            <div className="input-wrapper">
                {leadingContent && <span className="leading-content">{leadingContent}</span>}
                <input 
                    className={cx('input', {
                        'with-leading-only': leadingContent && !trailingContent,
                        'with-trailing-only': trailingContent && !leadingContent,
                        'with-leading-and-trailing': leadingContent && trailingContent
                    })}
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {trailingContent && <span className="trailing-content">{trailingContent}</span>}
                {checkIndicator && <span className="checkIndicator" ><Trophy size={small ? 'sm' : 'lg'}/></span>}
            </div>
        </div>
    )
}
export default Input;