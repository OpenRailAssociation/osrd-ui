import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-speedspacechart/dist/theme.css';
import SpeedSpaceChart from '../components/SpeedSpaceChart';
import OSRD_SAMPLE from './assets/sampleData';

const meta: Meta<typeof SpeedSpaceChart> = {
  title: 'SpeedSpaceChart/Rendering',
  component: SpeedSpaceChart,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SpeedSpaceChart>;

export const SpeedSpaceChartDefault: Story = {
  args: {
    width: 1440,
    height: 521.5,
    backgroundColor: 'rgb(247, 246, 238)',
    data: OSRD_SAMPLE,
  },
};
