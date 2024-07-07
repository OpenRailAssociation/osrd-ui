import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';

import Button from '../components/buttons/Button';

import React from 'react';
import { Archive, Bookmark, Cloud, Clock } from '@osrd-project/ui-icons';

const icons = { archive: <Archive />, bookmark: <Bookmark />, cloud: <Cloud />, clock: <Clock /> };

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {
    leadingIcon: {
      options: Object.keys(icons), // An array of serializable values
      mapping: icons, // Maps serializable option values to complex arg values
      control: {
        type: 'select', // Type 'select' is automatically inferred when 'options' is defined
        labels: {
          // 'labels' maps option values to string labels
          Archive: 'Archive',
          Bookmark: 'Bookmark',
          Cloud: 'Cloud',
          Clock: 'Clock',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Normal: Story = {
  args: {
    label: 'Normal',
    variant: 'Normal',
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'Primary',
  },
};

export const Quiet: Story = {
  args: {
    label: 'Quiet',
    variant: 'Quiet',
  },
};

export const Destructive: Story = {
  args: {
    label: 'Destructive',
    variant: 'Destructive',
  },
};

export const Cancel: Story = {
  args: {
    label: 'Cancel',
    variant: 'Cancel',
  },
};

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    isDisabled: true,
  },
};

export const Counter: Story = {
  args: {
    label: 'Counter',
    counter: 5,
  },
};

export const LeadingIcon: Story = {
  args: {
    label: 'Leading Icon',
    leadingIcon: <Archive />,
  },
};

export const LeadingIconCounter: Story = {
  args: {
    label: 'Leading Icon Counter',
    leadingIcon: <Archive />,
    counter: 5,
  },
};
