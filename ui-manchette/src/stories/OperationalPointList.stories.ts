import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import OperationalPointList from '../components/OperationalPointList';

const meta: Meta<typeof OperationalPointList> = {
  component: OperationalPointList,
  title: 'Manchette/OperationalPointList',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OperationalPointList>;

export const Default: Story = {
  args: {
    waypoints: SAMPLE_WAYPOINTS.map((waypoint) => ({ ...waypoint, display: true })),
  },
};
