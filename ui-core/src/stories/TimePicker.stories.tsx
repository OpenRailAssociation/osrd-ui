import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TimePicker from '../components/inputs/TimePicker';

import '@osrd-project/ui-core/dist/theme.css';

const meta: Meta<typeof TimePicker> = {
  component: TimePicker,
  args: {
    disabled: false,
    readOnly: false,
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
