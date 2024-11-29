import React, { useRef, useState } from 'react';

import { EyeClosed, Telescope } from '@osrd-project/ui-icons';
import Manchette, { type ProjectPathTrainResult, type Waypoint } from '@osrd-project/ui-manchette';
import { PathLayer, SpaceTimeChart } from '@osrd-project/ui-spacetimechart';
import type { Meta } from '@storybook/react';
import cx from 'classnames';

import '@osrd-project/ui-core/dist/theme.css';
import '@osrd-project/ui-manchette/dist/theme.css';
import '@osrd-project/ui-manchette-with-spacetimechart/dist/theme.css';

import Menu, { type MenuItem } from './Menu';
import { SAMPLE_WAYPOINTS, SAMPLE_PATHS_DATA } from '../assets/sampleData';
import useManchettesWithSpaceTimeChart from '../hooks/useManchetteWithSpaceTimeChart';

type ManchetteWithSpaceTimeWrapperProps = {
  waypoints: Waypoint[];
  projectPathTrainResult: ProjectPathTrainResult[];
  selectedTrain: number;
};

const DEFAULT_HEIGHT = 561;

/** Example of setting up a menu for the waypoints */

const ManchetteWithSpaceTimeWrapper = ({
  waypoints,
  projectPathTrainResult,
  selectedTrain,
}: ManchetteWithSpaceTimeWrapperProps) => {
  const manchetteWithSpaceTimeChartRef = useRef<HTMLDivElement>(null);

  const [activeWaypointId, setActiveWaypointPointId] = useState<string>();

  const menuItems: MenuItem[] = [
    {
      title: 'Action 1',
      icon: <EyeClosed />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveWaypointPointId(undefined);
      },
    },
    {
      title: 'Action 2',
      icon: <Telescope />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveWaypointPointId(undefined);
      },
    },
  ];

  const handleWaypointClick = (waypointId: string) => {
    setActiveWaypointPointId(waypointId);
  };

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
        className={cx('manchette flex', {
          'no-scroll': activeWaypointId,
        })}
        style={{ height: `${DEFAULT_HEIGHT}px` }}
        onScroll={handleScroll}
      >
        <Manchette
          {...manchetteProps}
          waypoints={manchetteProps.waypoints.map((op) => ({
            ...op,
            onClick: handleWaypointClick,
          }))}
          waypointMenuData={{
            activeWaypointId,
            menu: <Menu items={menuItems} />,
          }}
        />
        <div
          className="space-time-chart-container w-full sticky"
          style={{ bottom: 0, left: 0, top: 2, height: `${DEFAULT_HEIGHT - 6}px` }}
        >
          <SpaceTimeChart
            className="inset-0 absolute h-full"
            spaceOrigin={0}
            timeOrigin={Math.min(...projectPathTrainResult.map((p) => +p.departureTime))}
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

const meta: Meta<typeof ManchetteWithSpaceTimeWrapper> = {
  title: 'Manchette with SpaceTimeChart/rendering',
  component: ManchetteWithSpaceTimeWrapper,
};

export default meta;

export const WaypointMenu = {
  args: {
    waypoints: SAMPLE_WAYPOINTS,
    projectPathTrainResult: SAMPLE_PATHS_DATA,
    selectedTrain: 1,
  },
};
