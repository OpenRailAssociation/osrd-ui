import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TimePicker, { TimePickerProps } from '../components/inputs/TimePicker';

import '@osrd-project/ui-core/dist/theme.css';

const TimePickerStory = (props: TimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState(props.hours);
  const [selectedMinute, setSelectedMinute] = useState(props.minutes);
  const onTimeChange = (newTime: { hours: number; minutes: number }) => {
    setSelectedHour(newTime.hours);
    setSelectedMinute(newTime.minutes);
  };
  useEffect(() => {
    setSelectedHour(props.hours);
    setSelectedMinute(props.minutes);
  }, [props.hours, props.minutes]);
  return (
    <TimePicker
      {...props}
      hours={selectedHour}
      minutes={selectedMinute}
      onTimeChange={onTimeChange}
    />
  );
};

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  args: {
    disabled: false,
    readOnly: false,
  },
  argTypes: {
    hours: {
      control: {
        type: 'number',
        min: 0,
        max: 23,
        step: 1,
      },
    },
    minutes: {
      control: {
        type: 'number',
        min: 0,
        max: 59,
        step: 1,
      },
    },
  },
  title: 'TimePicker',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '7rem' }}>
        <Story />
      </div>
    ),
  ],
  render: TimePickerStory,
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    label: 'Heure',
  },
};

export const DisabledTimePicker: Story = {
  args: {
    disabled: true,
    label: 'Heure',
  },
};
