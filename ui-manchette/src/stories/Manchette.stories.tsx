import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import type { Meta, StoryObj } from '@storybook/react';

import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import Manchette from '../components/Manchette';

const meta: Meta<typeof Manchette> = {
  component: Manchette,
  title: 'Manchette/Manchette',
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
type Story = StoryObj<typeof Manchette>;

export const Default: Story = {
  args: {
    waypoints: SAMPLE_WAYPOINTS.map((waypoint) => ({ ...waypoint, display: true })),
  },
};
