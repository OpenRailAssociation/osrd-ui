import React from 'react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import type { Meta, StoryObj } from '@storybook/react';

import Manchette from '@osrd-project/ui-manchette';
import { SAMPLE_WAYPOINTS } from '../../../ui-manchette/src/stories/assets/sampleData';

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
      SAMPLE_WAYPOINTS[0],
      customDiv,
      SAMPLE_WAYPOINTS[1],
      SAMPLE_WAYPOINTS[2],
      customDiv,
      SAMPLE_WAYPOINTS[3],
      customDiv,
    ],
  },
};
