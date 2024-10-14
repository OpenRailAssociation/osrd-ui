import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_PATH_PROPERTIES_DATA } from './assets/sampleData';
import OperationalPointList from '../components/OperationalPointList';
import { type StyledOperationalPointType } from '../types';

const OperationalPointListData: StyledOperationalPointType[] =
  SAMPLE_PATH_PROPERTIES_DATA.operational_points?.map((op) => ({ ...op, display: true })) ?? [];

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
