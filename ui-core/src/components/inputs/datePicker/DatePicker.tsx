import React from 'react';

import { Calendar as CalendarIcon } from '@osrd-project/ui-icons';
import cx from 'classnames';

import { type CalendarSlot } from '.';
import CalendarPicker, { type CalendarPickerPublicProps } from './CalendarPicker';
import useDatePicker from './useDatePicker';
import Input, { type InputProps } from '../Input';

type BaseDatePickerProps = {
  inputProps: InputProps;
  calendarPickerProps?: CalendarPickerPublicProps;
};

export type SingleDatePickerProps = BaseDatePickerProps & {
  isRangeMode?: false;
  onDateChange: (nextDate: Date) => void;
  value?: Date;
};

export type RangeDatePickerProps = BaseDatePickerProps & {
  isRangeMode: true;
  onDateChange: (clickedDate: Date, nextSelectedSlot?: CalendarSlot) => void;
  value?: CalendarSlot;
};

export type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

export const DatePicker = (props: DatePickerProps) => {
  const {
    inputValue,
    selectedSlot,
    showPicker,
    modalPosition,
    inputRef,
    calendarPickerRef,
    setShowPicker,
    handleDayClick,
    handleInputClick,
  } = useDatePicker(props);
  const { inputFieldWrapperClassname, ...otherInputProps } = props.inputProps;
  return (
    <div className="date-picker">
      <div>
        <Input
          {...otherInputProps}
          ref={inputRef}
          value={inputValue}
          onClick={handleInputClick}
          type="text"
          trailingContent={{
            content: <CalendarIcon />,
            onClickCallback: () => setShowPicker(!showPicker),
          }}
          inputFieldWrapperClassname={cx('date-picker-input', inputFieldWrapperClassname)}
          autoComplete="off"
        />
      </div>
      {showPicker && (
        <div className="calendar-picker-wrapper">
          <CalendarPicker
            {...props.calendarPickerProps}
            selectedSlot={selectedSlot}
            onDayClick={handleDayClick}
            modalPosition={modalPosition}
            calendarPickerRef={calendarPickerRef}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
