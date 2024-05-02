import { useState, useRef, useEffect } from 'react';
import useClickOutside from '../../hooks/useOutsideClick';
import { useModalPosition } from '../../hooks/useModalPosition';
import { computeNewSelectedSlot, formatInputValue, formatValueToSlot } from './utils';
import { DatePickerProps } from './DatePicker';

const MODAL_HORIZONTAL_OFFSET = -24;
const MODAL_VERTICAL_OFFSET = 3;

export default function useDatePicker(datePickerProps: DatePickerProps) {
  const { inputProps, value, isRangeMode, onDateChange } = datePickerProps;
  const [showPicker, setShowPicker] = useState(false);
  const [inputValue, setInputValue] = useState(formatInputValue(datePickerProps));
  const [selectedSlot, setSelectedSlot] = useState(formatValueToSlot(datePickerProps));

  const calendarPickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useClickOutside(calendarPickerRef, (e) => {
    // Do not close the picker if any children in input wrapper is clicked.
    // This wrapper include, the input itself, the trailing content (which contains the calendar icon) and the leading content
    if (inputRef.current && inputRef.current.parentElement?.contains(e.target as Node)) return;
    setShowPicker(false);
  });
  const { calculatePosition, modalPosition } = useModalPosition(
    inputRef,
    calendarPickerRef,
    MODAL_VERTICAL_OFFSET,
    MODAL_HORIZONTAL_OFFSET
  );

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setShowPicker(true);
    inputProps.onClick?.(e);
  };

  const handleDayClick = (clickedDate: Date) => {
    if (isRangeMode) {
      const newSelectedSlot = computeNewSelectedSlot(clickedDate, value);
      onDateChange(clickedDate, newSelectedSlot);
    } else {
      onDateChange(clickedDate);
    }
  };

  useEffect(() => {
    if (showPicker) calculatePosition();
  }, [showPicker, calculatePosition]);

  useEffect(() => {
    setInputValue(formatInputValue(datePickerProps));
    setSelectedSlot(formatValueToSlot(datePickerProps));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    showPicker,
    inputValue,
    selectedSlot,
    modalPosition,
    inputRef,
    calendarPickerRef,
    setShowPicker,
    handleDayClick,
    handleInputClick,
  };
}
