import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';

import Label from '../components/inputs/Label';

const meta: Meta<typeof Label> = {
  component: Label,
  args: {
    htmlFor: 'https://osrd.fr/en/',
    text: 'OSRD',
    small: true,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 'fit-content' }}>
        <Story />
      </div>
    ),
  ],
  title: 'Core/Label',
  tags: ['autodocs'],
};

export default meta;

type LabelStory = StoryObj<typeof Label>;

export const Default: LabelStory = {
  args: {},
};

export const Hint: LabelStory = {
  args: {
    hasHint: true,
  },
};

export const Required: LabelStory = {
  args: {
    required: true,
  },
};

export const Disabled: LabelStory = {
  args: {
    disabled: true,
  },
};

export const Large: LabelStory = {
  args: {
    small: false,
  },
};
