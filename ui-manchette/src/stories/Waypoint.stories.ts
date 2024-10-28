import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import Waypoint from '../components/Waypoint';

const meta: Meta<typeof Waypoint> = {
  component: Waypoint,
  title: 'Manchette/Waypoint',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Waypoint>;

export const Default: Story = {
  args: {
    waypoint: {
      ...SAMPLE_WAYPOINTS[0],
      display: true,
    },
  },
};
