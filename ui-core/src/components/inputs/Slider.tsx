import React, { useEffect, useState } from 'react';
import type { ChangeEvent, MouseEvent, InputHTMLAttributes } from 'react';

import cx from 'classnames';

export type SliderProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: number;
  onChangeCommitted?: (e: MouseEvent<HTMLInputElement>) => void;
  containerClassName?: string;
};

// onChange returns an event or number
const Slider = ({
  id,
  value: initialValue,
  min = 0,
  max = 100,
  step = 1,
  width = 112,
  onChange,
  onChangeCommitted,
  disabled,
  className,
  containerClassName,
  ...rest
}: SliderProps) => {
  const [value, setValue] = useState<number>(
    initialValue !== undefined ? Number(initialValue) : Number(min)
  );

  useEffect(() => {
    setValue(Number(initialValue));
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(e);
  };

  const handleMouseUp = (e: MouseEvent<HTMLInputElement>) => {
    if (onChangeCommitted) {
      onChangeCommitted(e);
    }
  };

  return (
    <div
      className={cx('range-wrapper', containerClassName, { disabled })}
      style={{ width: `${width}px` }}
    >
      <input
        type="range"
        className={cx('range-slider', className)}
        id={id}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};

export default Slider;
