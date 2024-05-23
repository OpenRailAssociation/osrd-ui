import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_DATA } from './assets/sampleData';

import OperationalPointList from '../components/OperationalPointList';

const OperationalPointListData = SAMPLE_DATA.operational_points ?? [];

const meta: Meta<typeof OperationalPointList> = {
  component: OperationalPointList,
  title: 'Manchette/OperationalPointList',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OperationalPointList>;

export const Default: Story = {
  args: {
    operationalPoints: OperationalPointListData,
  },
};
