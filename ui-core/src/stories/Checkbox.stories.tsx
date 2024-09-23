import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import Checkbox from '../components/inputs/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Core/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    isIndeterminate: { control: 'boolean' },
    small: { control: 'boolean' },
    checked: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Check this box if you like trains',
  },
};
export const Hint: Story = {
  args: {
    label: 'Butter',
    hint: 'Without salt, sorry',
  },
};
export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate',
    isIndeterminate: true,
  },
};
