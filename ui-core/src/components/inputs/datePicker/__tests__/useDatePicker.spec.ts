import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RangeDatePickerProps, SingleDatePickerProps } from '..';
import useDatePicker from '../useDatePicker';

describe('useDatePicker', () => {
  let onDayChange: RangeDatePickerProps['onDateChange'];
  let onSlotChange: SingleDatePickerProps['onDateChange'];

  beforeEach(() => {
    onDayChange = vi.fn();
    onSlotChange = vi.fn();
  });

  describe('day click on calendar handling', () => {
    describe('single mode', () => {
      it('should call onDateChange callback with the clicked date', () => {
        const { result } = renderHook(() =>
          useDatePicker({
            inputProps: { id: 'id', label: 'single' },
            isRangeMode: false,
            onDateChange: onDayChange,
          })
        );

        const clickedDate = new Date(2024, 0, 1);

        act(() => {
          result.current.handleDayClick(clickedDate);
        });

        expect(onDayChange).toHaveBeenCalledWith(clickedDate);
      });
    });

    describe('range mode', () => {
      it('should call onDateChange callback with the clicked date and the next slot', () => {
        const initialValue = { start: new Date(2024, 0, 1), end: null };
        const { result } = renderHook(() =>
          useDatePicker({
            inputProps: { id: 'id', label: 'range' },
            isRangeMode: true,
            value: initialValue,
            onDateChange: onSlotChange,
          })
        );

        const clickedDate = new Date(2024, 0, 2);
        act(() => {
          result.current.handleDayClick(clickedDate);
        });
        expect(onSlotChange).toHaveBeenCalledWith(clickedDate, {
          ...initialValue,
          end: clickedDate,
        });
      });
    });
  });

  describe('input click handling', () => {
    it('should show the picker and call the input onClick callback ', () => {
      const onClickCallback = vi.fn();
      const { result } = renderHook(() =>
        useDatePicker({
          inputProps: { id: 'id', label: 'label', onClick: onClickCallback },
          isRangeMode: false,
          onDateChange: onDayChange,
        })
      );

      act(() => {
        result.current.handleInputClick({} as React.MouseEvent<HTMLInputElement, MouseEvent>);
      });

      expect(result.current.showPicker).toBe(true);
      expect(onClickCallback).toHaveBeenCalled();
    });
  });
});
