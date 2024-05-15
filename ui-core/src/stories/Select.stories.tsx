import React from 'react';
import { StoryObj, Meta } from '@storybook/react';

import Select from '../components/Select';
import '@osrd-project/ui-core/dist/theme.css';

const meta: Meta<typeof Select> = {
  component: Select,
  args: {
    label: 'Fill colour',
    placeholder: 'Choose',
    value: 'blue',
    options: [
      { value: 'blue', label: 'Blue' },
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
    ],
    small: false,
    disabled: false,
    readOnly: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Select',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    value: undefined,
  },
};

export const SelectedOption: Story = {
  args: {
    value: 'blue',
  },
};

export const Hint: Story = {
  args: {
    hint: 'This is not a choice',
  },
};

export const RequiredInput: Story = {
  args: {
    required: true,
  },
};

export const InformationSelect: Story = {
  args: {
    required: true,
    statusWithMessage: {
      status: 'info',
      message: 'This is a one way choice',
    },
  },
};

export const WarningSelect: Story = {
  args: {
    required: true,
    statusWithMessage: {
      status: 'warning',
    },
  },
};

export const WarningWithMessageSelect: Story = {
  args: {
    required: true,
    statusWithMessage: {
      status: 'warning',
      message: 'This is a one way choice',
    },
  },
};

export const ErrorSelect: Story = {
  args: {
    required: true,
    statusWithMessage: {
      status: 'error',
    },
  },
};

export const ErrorWithMessageSelect: Story = {
  args: {
    required: true,
    statusWithMessage: {
      status: 'error',
      message: 'This is a one way choice',
    },
  },
};
