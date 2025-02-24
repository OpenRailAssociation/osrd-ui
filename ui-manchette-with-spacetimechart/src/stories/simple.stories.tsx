import type { Meta } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import '@osrd-project/ui-manchette-with-spacetimechart/dist/theme.css';

import { SAMPLE_WAYPOINTS, SAMPLE_PATHS_DATA } from '../assets/sampleData';
import ManchetteWithSpaceTimeChart from '../components/ManchetteWithSpaceTimeChart';

const meta: Meta<typeof ManchetteWithSpaceTimeChart> = {
  title: 'Manchette with SpaceTimeChart/simple',
  component: ManchetteWithSpaceTimeChart,
};

export default meta;

export const Default = {
  args: {
    waypoints: SAMPLE_WAYPOINTS,
    projectPathTrainResult: SAMPLE_PATHS_DATA,
    selectedTrain: 1,
  },
};
