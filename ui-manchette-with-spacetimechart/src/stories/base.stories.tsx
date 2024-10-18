/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';

import { Manchette } from '@osrd-project/ui-manchette';
import type { ProjectPathTrainResult, Waypoint } from '@osrd-project/ui-manchette/dist/types';
import { PathLayer, SpaceTimeChart } from '@osrd-project/ui-spacetimechart';
import type { Meta } from '@storybook/react';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import '@osrd-project/ui-manchette-with-spacetimechart/dist/theme.css';

import { SAMPLE_WAYPOINTS, SAMPLE_PATHS_DATA } from '../assets/sampleData';
import useManchettesWithSpaceTimeChart from '../hooks/useManchetteWithSpaceTimeChart';

type ManchetteWithSpaceTimeWrapperProps = {
  waypoints: Waypoint[];
  projectPathTrainResult: ProjectPathTrainResult[];
  selectedTrain: number;
};
const DEFAULT_HEIGHT = 561;

const ManchetteWithSpaceTimeWrapper = ({
  waypoints,
  projectPathTrainResult,
  selectedTrain,
}: ManchetteWithSpaceTimeWrapperProps) => {
  const manchetteWithSpaceTimeChartRef = useRef<HTMLDivElement>(null);
  const { manchetteProps, spaceTimeChartProps, handleScroll } = useManchettesWithSpaceTimeChart(
    waypoints,
    projectPathTrainResult,
    manchetteWithSpaceTimeChartRef,
    selectedTrain
  );

  return (
    <div className="manchette-space-time-chart-wrapper">
      <div
        className="header bg-ambientB-5 w-full border-b border-grey-30"
        style={{ height: '40px' }}
      ></div>
      <div
        ref={manchetteWithSpaceTimeChartRef}
        className="manchette flex"
        style={{ height: `${DEFAULT_HEIGHT}px` }}
        onScroll={handleScroll}
      >
        <Manchette {...manchetteProps} />
        <div
          className="space-time-chart-container w-full sticky"
          style={{ bottom: 0, left: 0, top: 0, height: `${DEFAULT_HEIGHT - 6}px` }}
        >
          <SpaceTimeChart
            className="inset-0 absolute h-full"
            spaceOrigin={0}
            timeOrigin={Math.min(...projectPathTrainResult.map((p) => +p.departure_time))}
            {...spaceTimeChartProps}
          >
            {spaceTimeChartProps.paths.map((path) => (
              <PathLayer key={path.id} path={path} color={path.color} />
            ))}
          </SpaceTimeChart>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Manchette with SpaceTimeChart/rendering',
  component: ManchetteWithSpaceTimeWrapper,
} satisfies Meta<typeof ManchetteWithSpaceTimeWrapper>;

export default meta;

export const Default = {
  args: {
    waypoints: SAMPLE_WAYPOINTS,
    projectPathTrainResult: SAMPLE_PATHS_DATA,
    selectedTrain: 1,
  },
};
