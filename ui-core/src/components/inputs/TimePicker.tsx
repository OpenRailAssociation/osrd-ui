import React, { useState, useRef } from 'react';

import cx from 'classnames';

import Input, { type InputProps } from './Input';
import InputModal from '../Modal';

export type TimePickerProps = InputProps & {
  hours?: number;
  minutes?: number;
  onTimeChange: ({ hours, minutes }: { hours: number; minutes: number }) => void;
};

type TimeRangeProps = {
  range: number[];
  selectedItem: number;
  className: string;
  onSelectItem: (item: number) => void;
};

const TimeRange = ({ range, selectedItem, className, onSelectItem }: TimeRangeProps) => (
  <div className="time-grid">
    {range.map((item) => (
      <div
        key={item}
        className={cx(className, { selected: selectedItem === item })}
        onClick={() => onSelectItem(item)}
      >
        {item.toString().padStart(2, '0')}
      </div>
    ))}
  </div>
);

const TimePicker = ({ onTimeChange, hours = 0, minutes = 0, ...otherProps }: TimePickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const incrementMinute = (increment: number) => {
    let newMinutes = minutes + increment;
    let newHours = hours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours = newHours === 23 ? 0 : newHours + 1;
    } else if (newMinutes < 0) {
      newMinutes = 59;
      newHours = newHours === 0 ? 23 : newHours - 1;
    }
    onTimeChange({ hours: newHours, minutes: newMinutes });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const [h, m] = value.split(':');
    if (h !== undefined && m !== undefined) {
      onTimeChange({ hours: parseInt(h), minutes: parseInt(m) });
    }
  };

  const formatTimeValue = (value: number, max: number) =>
    Math.max(0, Math.min(max, value)).toString().padStart(2, '0');

  const selectedTime = `${formatTimeValue(hours, 23)}:${formatTimeValue(minutes, 59)}`;
  const hoursRange = [...Array(24).keys()];
  const minutesRange = [...Array(12).keys()].map((i) => i * 5);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="time-picker">
      <Input
        type="time"
        name="time"
        value={selectedTime}
        onClick={openModal}
        onChange={handleChange}
        ref={inputRef}
        {...otherProps}
      />
      <InputModal inputRef={inputRef} isOpen={isModalOpen} onClose={closeModal}>
        <div className="time-picker-container">
          <TimeRange
            range={hoursRange}
            selectedItem={hours}
            className="hour"
            onSelectItem={(h) => onTimeChange({ hours: h, minutes })}
          />

          <div className="time-separator">:</div>

          <div className="minute-container">
            <TimeRange
              range={minutesRange}
              selectedItem={minutes}
              className="minute"
              onSelectItem={(m) => onTimeChange({ hours: hours, minutes: m })}
            />
            <div className="minute-buttons">
              <button onClick={() => incrementMinute(-1)} className="minute-button">
                -1mn
              </button>
              <button onClick={() => incrementMinute(1)} className="minute-button">
                +1mn
              </button>
            </div>
          </div>
        </div>
      </InputModal>
    </div>
  );
};

export default TimePicker;
