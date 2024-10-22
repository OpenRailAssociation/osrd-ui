import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {
  type Conflict,
  ConflictLayer,
  ConflictTooltip,
  OccupancyBlockLayer,
  SpaceTimeChart,
  PathLayer,
} from '../';
import { OPERATIONAL_POINTS, PATHS, START_DATE } from './lib/paths';
import { X_ZOOM_LEVEL, Y_ZOOM_LEVEL } from './lib/utils';
import {
  KILOMETER,
  MINUTE,
  OCCUPANCY_FREE,
  OCCUPANCY_SEMAPHORE,
  OCCUPANCY_WARNING,
} from '../lib/consts';
import type { Point } from '../lib/types';

import '@osrd-project/ui-spacetimechart/dist/theme.css';

const CONFLICTS = [
  {
    timeStart: +START_DATE + 15 * MINUTE,
    timeEnd: +START_DATE + 20 * MINUTE,
    spaceStart: 12 * KILOMETER,
    spaceEnd: 19 * KILOMETER,
  },
  {
    timeStart: +START_DATE + 20 * MINUTE,
    timeEnd: +START_DATE + 35 * MINUTE,
    spaceStart: 19 * KILOMETER,
    spaceEnd: 39 * KILOMETER,
  },
  {
    timeStart: +START_DATE + 35 * MINUTE,
    timeEnd: +START_DATE + 37 * MINUTE,
    spaceStart: 39 * KILOMETER,
    spaceEnd: 41 * KILOMETER,
  },
];

const CONFLICT_GROUP = {
  timeStart: +START_DATE + 15 * MINUTE,
  spaceStart: 12 * KILOMETER,
  spaceEnd: 41 * KILOMETER,
  conflicts: [
    {
      trainNames: ['4655', '6079'],
      type: 'Spacing',
      timeStart: +START_DATE + 15 * MINUTE,
      timeEnd: +START_DATE + 35 * MINUTE,
    },
    {
      trainNames: ['4655', '5431'],
      type: 'Spacing',
      timeStart: +START_DATE + 35 * MINUTE,
      timeEnd: +START_DATE + 37 * MINUTE,
    },
  ],
};

const OCCUPANCY_BLOCKS = [
  {
    timeStart: +START_DATE + 42 * MINUTE,
    timeEnd: +START_DATE + 43 * MINUTE,
    spaceStart: 10 * KILOMETER,
    spaceEnd: 14 * KILOMETER,
    color: OCCUPANCY_FREE,
  },
  {
    timeStart: +START_DATE + 43 * MINUTE,
    timeEnd: +START_DATE + 46 * MINUTE,
    spaceStart: 10 * KILOMETER,
    spaceEnd: 14 * KILOMETER,
    color: OCCUPANCY_SEMAPHORE,
  },
  {
    timeStart: +START_DATE + 46 * MINUTE,
    timeEnd: +START_DATE + 48 * MINUTE,
    spaceStart: 10 * KILOMETER,
    spaceEnd: 14 * KILOMETER,
    color: OCCUPANCY_WARNING,
  },
  {
    timeStart: +START_DATE + 44 * MINUTE,
    timeEnd: +START_DATE + 45 * MINUTE,
    spaceStart: 14 * KILOMETER,
    spaceEnd: 18 * KILOMETER,
    color: OCCUPANCY_FREE,
  },
  {
    timeStart: +START_DATE + 45 * MINUTE,
    timeEnd: +START_DATE + 48 * MINUTE,
    spaceStart: 14 * KILOMETER,
    spaceEnd: 18 * KILOMETER,
    color: OCCUPANCY_SEMAPHORE,
  },
  {
    timeStart: +START_DATE + 48 * MINUTE,
    timeEnd: +START_DATE + 50 * MINUTE,
    spaceStart: 14 * KILOMETER,
    spaceEnd: 18 * KILOMETER,
    color: OCCUPANCY_WARNING,
  },
];

/**
 * This story aims at showcasing various additional layers.
 */
const Wrapper = () => {
  const [hoveredConflict, setHoveredConflict] = useState<Conflict | null>(null);
  const [cursorPosition, setCursorPosition] = useState<Point | null>(null);

  return (
    <div className="inset-0">
      <SpaceTimeChart
        className="inset-0 absolute overflow-hidden p-0 m-0"
        operationalPoints={OPERATIONAL_POINTS}
        spaceOrigin={0}
        spaceScales={OPERATIONAL_POINTS.slice(0, -1).map((point, i) => ({
          from: point.position,
          to: OPERATIONAL_POINTS[i + 1].position,
          size: 50 * Y_ZOOM_LEVEL,
        }))}
        timeOrigin={+new Date('2024/04/02')}
        timeScale={60000 / X_ZOOM_LEVEL}
        xOffset={0}
        yOffset={0}
        onHoveredChildUpdate={({ item }) => {
          let conflict = null;
          if (item?.element?.type === 'conflict') {
            conflict = CONFLICTS[item.element.conflictIndex];
          }
          setHoveredConflict(conflict);
        }}
        onMouseMove={({ position }) => {
          setCursorPosition(position);
        }}
      >
        {PATHS.map((path) => (
          <PathLayer key={path.id} path={path} color={path.color} />
        ))}
        <ConflictLayer conflicts={CONFLICTS} />
        <OccupancyBlockLayer occupancyBlocks={OCCUPANCY_BLOCKS} />
        {hoveredConflict && cursorPosition && (
          <ConflictTooltip {...CONFLICT_GROUP} position={cursorPosition} />
        )}
      </SpaceTimeChart>
    </div>
  );
};

const meta = {
  title: 'SpaceTimeChart/Layers',
  component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Default arguments',
  args: {},
};
