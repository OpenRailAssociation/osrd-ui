import '@osrd-project/ui-manchette/dist/theme.css';
import type { Meta, StoryObj } from '@storybook/react';

import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import SplitManchetteWithDiv from '../components/SplitManchetteWithDiv';

const meta: Meta<typeof SplitManchetteWithDiv> = {
  component: SplitManchetteWithDiv,
  title: 'Manchette/SplitManchetteWithDiv',
  tags: ['autodocs'],
  argTypes: {
    waypoints: {
      control: {
        type: 'object',
      },
    },
    splitPosition: {
      control: {
        type: 'object',
      },
    },
    splitHeight: {
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplitManchetteWithDiv>;

export const Default: Story = {
  args: {
    waypoints: SAMPLE_WAYPOINTS.map((waypoint) => ({ ...waypoint, display: true })),
    splitPosition: [1, 2],
    splitHeight: 100,
  },
};
