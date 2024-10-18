import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_WAYPOINTS } from './assets/sampleData';
import OperationalPoint from '../components/OperationalPoint';

const meta: Meta<typeof OperationalPoint> = {
  component: OperationalPoint,
  title: 'Manchette/OperationalPoint',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OperationalPoint>;

export const Default: Story = {
  args: {
    waypoint: {
      ...SAMPLE_WAYPOINTS[0],
      display: true,
    },
  },
};
