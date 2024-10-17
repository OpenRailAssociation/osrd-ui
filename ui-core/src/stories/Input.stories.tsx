import React from 'react';

import { ChevronDown, X } from '@osrd-project/ui-icons';
import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';

import Input from '../components/inputs/Input';

const meta: Meta<typeof Input> = {
  component: Input,
  args: {
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
  title: 'Core/Input',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Your name',
    type: 'text',
  },
};

export const Value: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Manuel',
  },
};

export const Hint: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Manuel',
    hint: "It doesn't have to be real",
  },
};

export const LeadingContent: Story = {
  args: {
    label: 'Price',
    type: 'number',
    leadingContent: '£',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '10rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const TrainlingContent: Story = {
  args: {
    label: 'Price',
    type: 'number',
    trailingContent: '€',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '10rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const LeadingAndTrainlingContent: Story = {
  args: {
    label: 'Price',
    type: 'number',
    leadingContent: 'Minimum',
    trailingContent: 'Km/h',
  },
};

export const RequiredInput: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
  },
};

export const LoadingInput: Story = {
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Manuel',
    statusWithMessage: {
      status: 'loading',
    },
  },
};

export const SuccessInput: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
    value: 'jean-michel.halleurt@exemple.fr',
    statusWithMessage: {
      status: 'success',
    },
  },
};

export const InformationInput: Story = {
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Jean-Michel Halleurt',
    statusWithMessage: {
      status: 'info',
      message: 'You won’t be able to change it',
    },
  },
};

export const WarningInput: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
    value: 'Jean-Michel Halleurt',
    statusWithMessage: {
      status: 'warning',
      message: 'Don’t be a troll, please',
    },
  },
};

export const WarningWithoutMessageInput: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    required: true,
    value: 'Jean-Michel Halleurt',
    statusWithMessage: {
      status: 'warning',
    },
  },
};

export const ErrorInput: Story = {
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Michel Sardou',
    statusWithMessage: {
      status: 'error',
      message: '“Michel Sardou” can’t be used',
    },
  },
};

export const ErrorWithoutMessageInput: Story = {
  args: {
    label: 'Name',
    type: 'text',
    required: true,
    value: 'Michel Sardou',
    statusWithMessage: {
      status: 'error',
    },
  },
};

export const InputWithChevronButton: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Manuel',
    withIcons: [
      {
        icon: <ChevronDown size="lg" />,
        action: () => {},
        className: 'chevron-icon',
      },
    ],
  },
};

export const InputWithClearButton: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr',
    withIcons: [
      {
        icon: <X size="lg" />,
        action: () => {},
        className: 'chevron-icon',
      },
    ],
  },
};

export const InputWithTwoIconAndLongValue: Story = {
  args: {
    label: 'Your name',
    type: 'text',
    value: 'Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr',
    withIcons: [
      {
        icon: <X size="lg" />,
        action: () => {},
        className: 'chevron-icon',
      },
      {
        icon: <ChevronDown size="lg" />,
        action: () => {},
        className: 'chevron-icon',
      },
    ],
  },
};
