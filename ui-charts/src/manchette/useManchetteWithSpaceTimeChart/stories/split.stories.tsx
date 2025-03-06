import React from 'react';

import type { Meta } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-charts/dist/theme.css';

import { SAMPLE_WAYPOINTS, SAMPLE_PATHS_DATA } from '../assets/sampleData';
import ManchetteWithSpaceTimeChart from '../components/ManchetteWithSpaceTimeChart';

const meta: Meta<typeof ManchetteWithSpaceTimeChart> = {
  title: 'Manchette with SpaceTimeChart/split',
  component: ManchetteWithSpaceTimeChart,
};

const customDiv = <div style={{ height: '100px', backgroundColor: '#EFF3F5' }} />;

const allWaypoints = SAMPLE_WAYPOINTS.map((waypoint, index) => {
  if (index === 0 || index === 1 || index === 3) {
    return [waypoint, customDiv];
  }
  return waypoint;
}).flat();

export default meta;

export const Default = {
  args: {
    contents: allWaypoints,
    projectPathTrainResult: SAMPLE_PATHS_DATA,
    selectedTrain: 1,
  },
};
