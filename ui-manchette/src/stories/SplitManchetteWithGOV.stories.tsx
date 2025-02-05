import '@osrd-project/ui-manchette/dist/theme.css';
import type { Meta, StoryObj } from '@storybook/react';

import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import SplitManchetteWithGOV from '../components/SplitManchetteWithGOV';

const meta: Meta<typeof SplitManchetteWithGOV> = {
  component: SplitManchetteWithGOV,
  title: 'Manchette/SplitManchetteWithGOV',
  tags: ['autodocs'],
  argTypes: {
    waypoints: {
      control: {
        type: 'object',
      },
    },
    zoomYIn: {
      action: 'zoomYIn',
    },
    zoomYOut: {
      action: 'zoomYOut',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplitManchetteWithGOV>;

export const Default: Story = {
  args: {
    waypoints: SAMPLE_WAYPOINTS.map((waypoint) => ({ ...waypoint, display: true })),
  },
};
