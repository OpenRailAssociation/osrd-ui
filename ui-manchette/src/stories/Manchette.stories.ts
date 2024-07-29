import type { Meta, StoryObj } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import { SAMPLE_PATH_PROPERTIES_DATA, SAMPLE_PATHS_DATA } from './assets/sampleData';
import Manchette from '../components/Manchette';

const OperationalPointListData = SAMPLE_PATH_PROPERTIES_DATA.operational_points ?? [];
const PathData = SAMPLE_PATHS_DATA ?? [];

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
    projectPathTrainResult: {
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
    projectPathTrainResult: PathData,
  },
};
