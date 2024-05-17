import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_DATA } from './assets/sampleData';

import Manchette from '../components/Manchette';

const OperationalPointListData = SAMPLE_DATA.operational_points;

const meta: Meta<typeof Manchette> = {
  component: Manchette,
  title: 'Manchette',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Manchette>;

export const Default: Story = {
  args: {
    operationalPoints: OperationalPointListData,
  },
};
