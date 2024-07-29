import React, { useState } from 'react';

import { type StoryObj, type Meta } from '@storybook/react';

import {
  DatePicker,
  type DatePickerProps,
  type RangeDatePickerProps,
  type SingleDatePickerProps,
  type CalendarSlot,
} from '../components/inputs/datePicker';
import '@osrd-project/ui-core/dist/theme.css';

const now = new Date();
const endSelectableDate = new Date(now);
endSelectableDate.setMonth(endSelectableDate.getMonth() + 3);

const endSelectedDate = new Date(now);
endSelectedDate.setDate(endSelectedDate.getDate() + 5);

const selectableSlot = { start: now, end: endSelectableDate };

const rangeSelectedSlot = { start: now, end: endSelectedDate };

const DatePickerStory = (props: DatePickerProps) => {
  const [value, setValue] = useState(props.value);
  const onSlotChange = (_: Date, nextSelectedSlot: CalendarSlot | undefined) =>
    setValue(nextSelectedSlot);
  const onDayChange = (nextDate: Date) => setValue(nextDate);

  if (props.isRangeMode) {
    return (
      <DatePicker
        {...props}
        value={value as RangeDatePickerProps['value']}
        onDateChange={onSlotChange}
      />
    );
  } else {
    return (
      <DatePicker
        {...props}
        value={value as SingleDatePickerProps['value']}
        onDateChange={onDayChange}
      />
    );
  }
};

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      story: {
        height: '500px',
      },
    },
  },
  args: {
    calendarPickerProps: {
      numberOfMonths: 1,
      selectableSlot,
    },
    inputProps: {
      id: 'date-picker',
      label: 'Select a date',
    },
  },
  render: (props) => <DatePickerStory {...props} />,
  title: 'core/DatePicker',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Single: Story = {
  args: {
    isRangeMode: false,
    value: now,
  },
};

export const Range: Story = {
  args: {
    isRangeMode: true,
    value: rangeSelectedSlot,
  },
};
