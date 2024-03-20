import type { InputProps } from './Input'
import Input from './Input'
import { Eye, EyeClosed } from '@osrd-project/ui-icons';
import { useState } from 'react';

const PasswordInput: React.FC<InputProps> = (props) => {
    const [isVisible, toggleVisibility] = useState(false);

    return (
        <Input  
                {...props}
                type={isVisible ? "text" : "password"}
                trailingContent={
                    {
                        content: isVisible ? <EyeClosed/> : <Eye/>,
                        onClickCallback: () => toggleVisibility(!isVisible)
                    }
                }
                inputWrapperClassname="password-input"
                small={false}
            />
    )
}

export default PasswordInput;