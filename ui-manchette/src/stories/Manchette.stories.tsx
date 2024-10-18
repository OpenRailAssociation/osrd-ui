import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import type { Meta, StoryObj } from '@storybook/react';

import { SAMPLE_PATH_PROPERTIES_DATA } from './assets/sampleData';
import Manchette from '../components/Manchette';
import { type StyledOperationalPointType } from '../types';

const OperationalPointListData: StyledOperationalPointType[] =
  SAMPLE_PATH_PROPERTIES_DATA.operational_points?.map((op) => ({ ...op, display: true })) ?? [];

const meta: Meta<typeof Manchette> = {
  component: Manchette,
  title: 'Manchette/Manchette',
  tags: ['autodocs'],
  argTypes: {
    operationalPoints: {
      control: {
        type: 'object',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Manchette>;

export const Default: Story = {
  args: {
    operationalPoints: OperationalPointListData,
  },
};
