import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useCalendar from '../useCalendar';

export const january = 0;
export const february = 1;
export const march = 2;
export const april = 3;
export const june = 5;
export const july = 6;
export const august = 7;
export const november = 10;
export const december = 11;

const displayedMonthStartDate = new Date(2024, july, 1);
const selectedSlot = { start: new Date(2024, july, 10), end: new Date(2024, july, 20) };
const selectableSlot = { start: new Date(2024, july, 5), end: new Date(2024, july, 25) };

const { result } = renderHook(() =>
  useCalendar({ displayedMonthStartDate, selectedSlot, selectableSlot, onDayClick: () => {} })
);

describe('useCalendar', () => {
  describe('day calculation', () => {
    it('should include days from the previous month when the first day of the displayed month is not a Monday', () => {
      const displayedMonthStartDate = new Date(2024, march, 1); //friday
      const { result } = renderHook(() =>
        useCalendar({ displayedMonthStartDate, onDayClick: () => {} })
      );

      expect(result.current.days[0].getMonth()).toBe(february);
    });

    it('should include days from the next month when the last day of the displayed month is not a Sunday', () => {
      //the last day of november 2024 is a saturday
      const displayedMonthStartDate = new Date(2024, november, 1); //friday
      const { result } = renderHook(() =>
        useCalendar({ displayedMonthStartDate, onDayClick: () => {} })
      );

      expect(result.current.days[result.current.days.length - 1].getMonth()).toBe(december);
    });

    it('should not include days from the previous month when the displayed month starts on a Monday', () => {
      const displayedMonthStartDate = new Date(2024, july, 1); //monday
      const { result } = renderHook(() =>
        useCalendar({ displayedMonthStartDate, onDayClick: () => {} })
      );

      expect(result.current.days[0].getMonth()).toBe(july);
    });

    it('should not include days from the next month when the displayed month ends on a Sunday', () => {
      const displayedMonthStartDate = new Date(2024, june, 1); //saturday
      const { result } = renderHook(() =>
        useCalendar({ displayedMonthStartDate, onDayClick: () => {} })
      );

      expect(result.current.days[result.current.days.length - 1].getMonth()).toBe(june);
    });
  });

  describe('day wrapper classnames', () => {
    it('should have "day-wrapper" classname for all days', () => {
      expect(result.current.buildDayWrapperClassName(new Date(2024, july, 15))).toContain(
        'day-wrapper'
      );
    });

    describe('selectable slot classname', () => {
      it('should have "outside-selectable-slot" classname for days outside the selectable slot', () => {
        expect(result.current.buildDayWrapperClassName(new Date(2024, april, 1))).toContain(
          'outside-selectable-slot'
        );
      });

      it('should have "inside-selectable-slot" classname for days inside the selectable slot', () => {
        expect(result.current.buildDayWrapperClassName(new Date(2024, july, 10))).toContain(
          'inside-selectable-slot'
        );
      });
    });

    describe('selected slot classname', () => {
      it('should have "start" classname for the start day of the selected slot', () => {
        expect(result.current.buildDayWrapperClassName(selectedSlot.start)).toContain('start');
      });

      it('should have "end" classname for the end day of the selected slot', () => {
        expect(result.current.buildDayWrapperClassName(selectedSlot.end)).toContain('end');
      });

      it('should have "within-selected-slot" classname for days within the selected slot', () => {
        expect(result.current.buildDayWrapperClassName(new Date(2024, july, 15))).toContain(
          'within-selected-slot'
        );
      });

      it('should not have "within-selected-slot" classname for days within the selected slot', () => {
        expect(result.current.buildDayWrapperClassName(new Date(2024, july, 21))).not.toContain(
          'within-selected-slot'
        );
      });
    });

    describe('other classnames', () => {
      it('should have "past" classname for days before today', () => {
        expect(result.current.buildDayWrapperClassName(new Date(1900, june, 30))).toContain('past');
      });

      it('should not assign past if the day is after selected start', () => {
        expect(result.current.buildDayWrapperClassName(new Date(2024, august, 1))).not.toContain(
          'past'
        );
      });

      it('should have "current-month" classname for days in the displayed month', () => {
        expect(result.current.buildDayWrapperClassName(new Date(2024, july, 15))).toContain(
          'current-month'
        );
      });
    });
  });

  describe('isDateSelectable', () => {
    it('should return false for days outside the selectable slot', () => {
      expect(result.current.isDateSelectable(new Date(2024, april, 1))).toBe(false);
    });

    it('should return false for days outside the displayed month', () => {
      expect(result.current.isDateSelectable(new Date(2024, june, 1))).toBe(false);
    });

    it('should return true for days within the selectable slot and in the displayed month', () => {
      expect(result.current.isDateSelectable(new Date(2024, july, 15))).toBe(true);
    });
  });

  describe('isToday', () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { result } = renderHook(() =>
      useCalendar({ displayedMonthStartDate, selectedSlot, selectableSlot, onDayClick: () => {} })
    );

    it('should return true for today', () => {
      expect(result.current.isToday(today)).toBe(true);
    });

    it('should return false for a day that is not today', () => {
      expect(result.current.isToday(new Date(2023, july, 15))).toBe(false);
    });
  });
});
