import React, { useState } from 'react';

import '@osrd-project/ui-core/dist/theme.css';

import type { Meta } from '@storybook/react';

import { OPERATIONAL_POINTS, PATHS } from './lib/paths';
import upward from '../assets/images/ScheduledMaintenanceUp.svg';
import { PathLayer } from '../components/PathLayer';
import { SpaceTimeChart } from '../components/SpaceTimeChart';
import { WorkScheduleLayer } from '../components/WorkScheduleLayer';
import { type Point, type PathData, type OperationalPoint } from '../lib/types';
import { type WorkSchedule } from '../types';
import { getDiff } from '../utils/vectors';

const SAMPLE_WORK_SCHEDULES: WorkSchedule[] = [
  {
    type: 'TRACK',
    timeStart: new Date('2024-04-02T00:00:00Z'),
    timeEnd: new Date('2024-04-02T00:15:00Z'),
    spaceRanges: [
      [20000, 35000],
      [45000, 60000],
    ],
  },
  {
    type: 'TRACK',
    timeStart: new Date('2024-04-02T00:15:00Z'),
    timeEnd: new Date('2024-04-02T01:00:00Z'),
    spaceRanges: [
      [80000, 100000],
      [110000, 140000],
    ],
  },
  {
    type: 'TRACK',
    timeStart: new Date('2024-04-02T01:30:00Z'),
    timeEnd: new Date('2024-04-02T02:30:00Z'),
    spaceRanges: [[50000, 100000]],
  },
];

const DEFAULT_HEIGHT = 550;

type WorkSchedulesWrapperProps = {
  operationalPoints: OperationalPoint[];
  paths: (PathData & { color: string })[];
  workSchedules: WorkSchedule[];
};

const WorkSchedulesWrapper = ({
  operationalPoints = [],
  paths = [],
  workSchedules,
}: WorkSchedulesWrapperProps) => {
  const [state, setState] = useState<{
    xOffset: number;
    yOffset: number;
    panning: null | { initialOffset: Point };
  }>({
    xOffset: -300,
    yOffset: 0,
    panning: null,
  });
  const simpleOperationalPoints = operationalPoints.map(({ id, position }) => ({
    id,
    label: id,
    position,
  }));
  const spaceScale = [
    {
      from: 0,
      to: 75000,
      coefficient: 300,
    },
  ];
  return (
    <div className="manchette-space-time-chart-wrapper" style={{ height: `${DEFAULT_HEIGHT}px` }}>
      <SpaceTimeChart
        className="inset-0 absolute h-full"
        spaceOrigin={0}
        xOffset={state.xOffset}
        yOffset={state.yOffset}
        timeOrigin={+new Date('2024/04/02')}
        operationalPoints={simpleOperationalPoints}
        timeScale={10000}
        spaceScales={spaceScale}
        onPan={({ initialPosition, position, isPanning }) => {
          const diff = getDiff(initialPosition, position);
          setState((s) => {
            // Stop panning:
            if (!isPanning) {
              return { ...s, panning: null };
            }
            // Start panning:
            else if (!s.panning) {
              return {
                ...s,
                panning: {
                  initialOffset: {
                    x: s.xOffset,
                    y: s.yOffset,
                  },
                },
              };
            }
            // Keep panning:
            else {
              const { initialOffset } = s.panning;
              return {
                ...s,
                xOffset: initialOffset.x + diff.x,
                yOffset: initialOffset.y + diff.y,
              };
            }
          });
        }}
      >
        {paths.map((path) => (
          <PathLayer key={path.id} path={path} color={path.color} />
        ))}
        <WorkScheduleLayer workSchedules={workSchedules} imageUrl={upward} />
      </SpaceTimeChart>
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Workschedules',
  component: WorkSchedulesWrapper,
} as Meta<typeof WorkSchedulesWrapper>;

export const Default = {
  args: {
    operationalPoints: OPERATIONAL_POINTS,
    paths: PATHS.slice(2, 4),
    workSchedules: SAMPLE_WORK_SCHEDULES,
  },
};
