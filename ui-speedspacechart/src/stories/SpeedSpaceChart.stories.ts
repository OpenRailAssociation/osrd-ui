import type { Meta, StoryObj } from '@storybook/react';
import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-speedspacechart/dist/theme.css';
import SpeedSpaceChart from '../components/SpeedSpaceChart';
import { pathPropertiesPmpLm } from './assets/path_properties_PMP_LM';
import { simulationPmpLm } from './assets/simulation_PMP_LM';
import { formatData } from './utils';
import { translations } from './assets/const';
import { powerRestrictionsPmpLm } from './assets/power_restrictions_PMP_LM';
import { speedLimitTags } from './assets/speed_limit_tags_PMP_LM';

const data = formatData(
  simulationPmpLm,
  pathPropertiesPmpLm,
  powerRestrictionsPmpLm,
  speedLimitTags
);

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
    data,
    translations,
  },
};
