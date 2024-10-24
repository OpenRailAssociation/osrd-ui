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

/**
 * Example of setting up a menu for the waypoints.
 * When displayed, the interaction with the rest of the manchette is disabled,
 * the scroll inside the manchette is locked and the pan in the space time chart is disabled.
 * */

const ManchetteWithSpaceTimeWrapper = ({
  waypoints,
  projectPathTrainResult,
  selectedTrain,
}: ManchetteWithSpaceTimeWrapperProps) => {
  const manchetteWithSpaceTimeChartRef = useRef<HTMLDivElement>(null);
  // Allow us to compute the position of the menu in Manchette component
  const manchetteWithSpaceTimeCharWrappertRef = useRef<HTMLDivElement>(null);
  // Allow us to know which waypoint has been clicked and change its style
  const [activeWaypointId, setActiveWaypointId] = useState<string>();

  const menuItems: MenuItem[] = [
    {
      title: 'Action 1',
      icon: <EyeClosed />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveWaypointId(undefined);
      },
    },
    {
      title: 'Action 2',
      icon: <Telescope />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveWaypointId(undefined);
      },
    },
  ];

  const handleWaypointClick = (waypointId: string) => {
    setActiveWaypointId(waypointId);
  };

  const { manchetteProps, spaceTimeChartProps, handleScroll } = useManchettesWithSpaceTimeChart(
    waypoints,
    projectPathTrainResult,
    manchetteWithSpaceTimeChartRef,
    selectedTrain
  );

  return (
    // Ref needs to be on the parent on the scrollable element (.manchette) and have a position
    // relative so the menu can properly overflow the manchette
    <div ref={manchetteWithSpaceTimeCharWrappertRef} className="manchette-space-time-chart-wrapper">
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
            menu: <Menu items={menuItems} />,
            activeWaypointId,
            manchetteWrapperRef: manchetteWithSpaceTimeCharWrappertRef,
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
            onPan={activeWaypointId ? undefined : spaceTimeChartProps.onPan}
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
