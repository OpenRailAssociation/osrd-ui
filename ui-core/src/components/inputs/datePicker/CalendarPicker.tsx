import React from 'react';
import cx from 'classnames';
import { ChevronLeft, ChevronRight } from '@osrd-project/ui-icons';
import Calendar from './Calendar';
import { CalendarSlot } from './type';
import useCalendarPicker from './useCalendarPicker';

export type CalendarPickerPrivateProps = {
  selectedSlot?: CalendarSlot;
  onDayClick: (day: Date) => void;
  modalPosition: {
    top: number;
    left: number;
  };
  calendarPickerRef: React.RefObject<HTMLDivElement>;
};

export type CalendarPickerPublicProps = {
  initialDate?: Date;
  numberOfMonths?: 1 | 2 | 3;
  selectableSlot?: CalendarSlot;
};

export type CalendarPickerProps = CalendarPickerPrivateProps & CalendarPickerPublicProps;

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  initialDate,
  selectedSlot,
  selectableSlot,
  numberOfMonths = 1,
  onDayClick,
  modalPosition,
  calendarPickerRef,
}) => {
  const {
    displayedMonthsStartDates,
    showNavigationBtn,
    canGoToNextMonth,
    canGoToPreviousMonth,
    handleGoToNextMonth,
    handleGoToPreviousMonth,
  } = useCalendarPicker({
    initialDate,
    selectedSlot,
    selectableSlot,
    numberOfMonths,
  });

  return (
    <div ref={calendarPickerRef} className="calendar-picker" style={modalPosition}>
      {showNavigationBtn && (
        <span
          className={cx('calendar-navigation-btn', 'previous', {
            disabled: !canGoToPreviousMonth,
          })}
          onClick={handleGoToPreviousMonth}
        >
          <ChevronLeft size="lg" />
        </span>
      )}
      <div className={cx('calendar-list', { 'navigation-btn-hidden': !showNavigationBtn })}>
        {displayedMonthsStartDates.map((date, index) => {
          return (
            <Calendar
              key={index}
              displayedMonthStartDate={date}
              selectableSlot={selectableSlot}
              selectedSlot={selectedSlot}
              onDayClick={onDayClick}
            />
          );
        })}
      </div>
      {showNavigationBtn && (
        <span
          className={cx('calendar-navigation-btn', 'next', {
            disabled: !canGoToNextMonth,
          })}
          onClick={handleGoToNextMonth}
        >
          <ChevronRight size="lg" />
        </span>
      )}
    </div>
  );
};

export default CalendarPicker;
