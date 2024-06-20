import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';
import CheckboxesTree from '../components/inputs/Checkbox/CheckboxesTree';

const meta: Meta<typeof CheckboxesTree> = {
  component: CheckboxesTree,
  title: 'CheckboxesTree',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    small: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxesTree>;

const milkButterCream = [
  { id: 1, checkboxProps: { label: 'Milk' } },
  { id: 2, checkboxProps: { label: 'Butter' } },
  { id: 3, checkboxProps: { label: 'Cream' } },
];

const milkSugarLemon = [
  { id: 1, checkboxProps: { label: 'Milk' } },
  { id: 2, checkboxProps: { label: 'Sugar' } },
  { id: 3, checkboxProps: { label: 'Lemon slice' } },
];

export const Default: Story = {
  args: {
    items: milkButterCream,
  },
};

export const GroupWithLabel: Story = {
  args: {
    items: milkSugarLemon,
    label: 'With your tea',
  },
};

export const GroupWithLabelCaption: Story = {
  args: {
    items: milkSugarLemon,
    label: 'With your tea',
    hint: 'At no extra cost for you',
  },
};

export const LabelOverflow: Story = {
  args: {
    items: [
      { id: 1, checkboxProps: { label: 'A walk on the beach' } },
      { id: 2, checkboxProps: { label: 'A bike ride on long forest winding roads' } },
      { id: 3, checkboxProps: { label: 'Reading a book in a couch' } },
    ],
  },
};

export const Nested: Story = {
  args: {
    items: [
      {
        id: 0,
        checkboxProps: { label: 'Dairy products' },
        items: [
          { id: 1, checkboxProps: { label: 'Milk' } },
          { id: 2, checkboxProps: { label: 'Butter' } },
          { id: 3, checkboxProps: { label: 'Cream' } },
        ],
      },
    ],
  },
};

export const MoreNested: Story = {
  args: {
    items: [
      {
        id: 1,
        checkboxProps: { label: 'foo' },
        items: [
          {
            id: 2,
            checkboxProps: { label: 'foo2' },
            items: [
              { id: 3, checkboxProps: { label: 'foo3' } },
              { id: 4, checkboxProps: { label: 'foo4' } },
            ],
          },
          {
            id: 5,
            checkboxProps: { label: 'foo5' },
            items: [
              {
                id: 6,
                checkboxProps: { label: 'foo6' },
                items: [
                  { id: 8, checkboxProps: { label: 'foo8' } },
                  { id: 9, checkboxProps: { label: 'foo9' } },
                ],
              },
            ],
          },
        ],
      },
      { id: 7, checkboxProps: { label: 'foo7' } },
    ],
  },
};

export const Required: Story = {
  args: {
    items: milkSugarLemon,
    label: 'With your beverage',
    required: true,
  },
};

export const Information: Story = {
  args: {
    items: milkButterCream.map((item, index) =>
      index === 1
        ? { ...item, checkboxProps: { ...item.checkboxProps, checked: true } }
        : { ...item }
    ),
    disabled: true,
    statusWithMessage: { status: 'info', message: 'These controls are disabled' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Warning: Story = {
  args: {
    items: milkSugarLemon,
    statusWithMessage: {
      status: 'warning',
      message: 'Your tea will be black, strong and not sweet at all',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    items: [
      { id: 1, checkboxProps: { label: 'Chocolate cake' } },
      { id: 2, checkboxProps: { label: 'Ice cream' } },
      { id: 3, checkboxProps: { label: 'Tiramisu' } },
    ],
    statusWithMessage: {
      status: 'error',
      message: 'You can’t order a meal without a pastry',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
