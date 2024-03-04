import React, { useState} from 'react';
import { Trophy, RequiredInput } from '@osrd-project/ui-icons';

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
    let inputBorder = 'border rounded'
    if(leadingContent && !trailingContent) inputBorder = 'rounded-r-md border-t border-r border-b'
    else if(trailingContent && !leadingContent) inputBorder = 'rounded-l-md border-t border-b border-l'
    else if(leadingContent && trailingContent) inputBorder = 'border-t border-b'
    
    
    const d = 'bg-red-50'
    return (
        <div className={`${d} flex flex-col ${small ? 'small' : ''}`}>
            <div className="relative flex items-center">
                {required && <span className="absolute left-0 text-info-30 mt-[5px] mr-[8px] mb-[3px] rounded-[0.5px]"> <RequiredInput/> </span>}
                <label className="ml-[24px] text-grey-80 font-sans font-semibold text-base text-left leading-6" htmlFor={id}>{label}</label>
            </div>
            {hint && <span className="text-grey-50 text-sm leading-5 ml-[25px]">{hint}</span>}
            <div className="ml-[24px] mb-[3px] flex items-center">
                {leadingContent && <span className="text-sm text-grey-80 text-left leading-5 rounded-l-md px-[16px] pt-[9px] pb-[11px] border border-grey-40">{leadingContent}</span>}
                <input className={`custom-input ${ trailingContent || leadingContent ? 'w-[96px]' : ''} bg-black-1  ${inputBorder} border-grey-40 shadow-input px-[12px] py-[8px]`} id={id} type={type} value={value} onChange={(e) => setValue(e.target.value)}/>
                {trailingContent && <span className="text-sm text-grey-80 text-left leading-5 rounded-r-md px-[16px] pt-[9px] pb-[11px] border border-grey-40">{trailingContent}</span>}
                {checkIndicator && <span className="text-info-30 my-[8px] ml-[12px]" ><Trophy size={small ? 'sm' : 'lg'}/></span>}
            </div>
        </div>
    )
}
export default Input;

// border-radius: 0px 4px 4px 0px;
// border: 1px solid rgba(148, 145, 142, 1);
// box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5) inset;
// opacity: 1;
// background-color: rgba(0, 0, 0, 0.02);