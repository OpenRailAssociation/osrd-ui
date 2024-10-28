import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import WaypointList from '../components/WaypointList';

const meta: Meta<typeof WaypointList> = {
  component: WaypointList,
  title: 'Manchette/WaypointList',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WaypointList>;

export const Default: Story = {
  args: {
    waypoints: SAMPLE_WAYPOINTS.map((waypoint) => ({ ...waypoint, display: true })),
  },
};
