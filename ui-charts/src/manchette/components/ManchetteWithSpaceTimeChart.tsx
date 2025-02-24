import React, { useRef } from 'react';

import Manchette, { type ManchetteProps } from './Manchette';
import { PathLayer, SpaceTimeChart, type SpaceTimeChartProps } from '../../spaceTimeChart';
import useManchetteWithSpaceTimeChart from '../hooks/useManchetteWithSpaceTimeChart';
import { type ProjectPathTrainResult, type Waypoint } from '../types';

export type ManchetteWithSpaceTimeChartProps = {
  waypoints: Waypoint[];
  projectPathTrainResult: ProjectPathTrainResult[];
  selectedTrain?: number;
  height?: number;
  children?: React.ReactNode;
  header?: React.ReactNode;
  manchetteProps?: ManchetteProps;
  spaceTimeChartProps?: SpaceTimeChartProps;
};

/**
 * A simple component to display a manchette and a space time chart.
 *
 * This only covers basic usage. For more advanced control over the manchette
 * and space time chart, the useManchetteWithSpaceTimeChart() hook can be used.
 */
const ManchetteWithSpaceTimeChart = ({
  waypoints,
  projectPathTrainResult,
  selectedTrain,
  height = 561,
  children,
  header,
  manchetteProps: additionalManchetteProps,
  spaceTimeChartProps: additionalSpaceTimeChartProps,
}: ManchetteWithSpaceTimeChartProps) => {
  const manchetteWithSpaceTimeChartRef = useRef<HTMLDivElement>(null);
  const spaceTimeChartRef = useRef<HTMLDivElement>(null);

  const { manchetteProps, spaceTimeChartProps, handleScroll } = useManchetteWithSpaceTimeChart({
    waypoints,
    projectPathTrainResult,
    manchetteWithSpaceTimeChartRef,
    selectedTrain,
    height,
    spaceTimeChartRef,
    defaultTimeOrigin: Math.min(...projectPathTrainResult.map((p) => +p.departureTime)),
  });

  return (
    <div className="manchette-space-time-chart-wrapper">
      <div
        className="header bg-ambientB-5 w-full border-b border-grey-30"
        style={{ height: '40px' }}
      >
        {header}
      </div>
      <div
        ref={manchetteWithSpaceTimeChartRef}
        className="manchette flex"
        style={{ height: `${height}px` }}
        onScroll={handleScroll}
      >
        <Manchette {...manchetteProps} {...additionalManchetteProps} />
        <div
          className="space-time-chart-container w-full sticky"
          ref={spaceTimeChartRef}
          style={{ bottom: 0, left: 0, top: 2, height: `${height - 6}px` }}
        >
          <SpaceTimeChart
            className="inset-0 absolute h-full"
            {...spaceTimeChartProps}
            {...additionalSpaceTimeChartProps}
          >
            {spaceTimeChartProps.paths.map((path) => (
              <PathLayer key={path.id} path={path} color={path.color} level={path.level} />
            ))}
            {children}
          </SpaceTimeChart>
        </div>
      </div>
    </div>
  );
};

export default ManchetteWithSpaceTimeChart;
