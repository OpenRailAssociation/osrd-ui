import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OPERATIONAL_POINTS, PATHS, START_DATE } from './lib/paths';
import { X_ZOOM_LEVEL, Y_ZOOM_LEVEL } from './lib/utils';
import { ConflictLayer, SpaceTimeChart, PathLayer } from '../';
import { KILOMETER, MINUTE } from '../lib/consts';

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

/**
 * This story aims at showcasing various additional layers.
 */
const Wrapper = () => (
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
    >
      {PATHS.map((path) => (
        <PathLayer key={path.id} path={path} color={path.color} />
      ))}
      <ConflictLayer conflicts={CONFLICTS} />
    </SpaceTimeChart>
  </div>
);

const meta = {
  title: 'SpaceTimeChart/Layers',
  component: Wrapper,
} satisfies Meta<typeof Wrapper>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  name: 'Default arguments',
  args: {},
};
