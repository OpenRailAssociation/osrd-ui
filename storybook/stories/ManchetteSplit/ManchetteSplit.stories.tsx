import React from 'react';

import '@osrd-project/ui-charts/dist/theme.css';
import { Manchette } from '@osrd-project/ui-charts';
import '@osrd-project/ui-core/dist/theme.css';
import type { Meta, StoryObj } from '@storybook/react';

import WAYPOINTS_DATA from './sampleData';

const meta: Meta<typeof Manchette> = {
  component: Manchette,
  title: 'Manchette/ManchetteSplit',
  tags: ['autodocs'],
  argTypes: { contents: { control: { type: 'object' } } },
};

export default meta;
type Story = StoryObj<typeof Manchette>;

const customDiv = (
  <div style={{ height: 'auto', minHeight: 24, backgroundColor: 'rgba(152, 192, 245, 1)' }}>
    Hello World
  </div>
);

export const Default: Story = {
  args: {
    contents: [
      WAYPOINTS_DATA[0],
      customDiv,
      WAYPOINTS_DATA[1],
      WAYPOINTS_DATA[2],
      customDiv,
      WAYPOINTS_DATA[3],
      customDiv,
    ],
  },
};
