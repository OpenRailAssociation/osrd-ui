import React, { useState } from 'react';
import { Eye, EyeClosed } from '@osrd-project/ui-icons';

import Input, { InputProps } from './Input';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [showPassword, toggleShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      trailingContent={{
        content: showPassword ? <EyeClosed /> : <Eye />,
        onClickCallback: () => toggleShowPassword(!showPassword),
      }}
      inputWrapperClassname="password-input"
      ref={ref}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
