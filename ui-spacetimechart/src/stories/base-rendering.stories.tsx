import React, { FC } from 'react';
import type { Meta } from '@storybook/react';

import { OPERATIONAL_POINTS, PATHS } from './assets/paths';
import { SpaceTimeChart, PathLayer } from '../';
import { X_ZOOM_LEVEL, Y_ZOOM_LEVEL } from './utils';

import './tailwind-mockup.css';

/**
 * This story aims at showcasing how to render a SpaceTimeChart.
 */
const Wrapper: FC<{
  xZoomLevel: number;
  yZoomLevel: number;
  xOffset: number;
  yOffset: number;
  spaceScaleType: 'linear' | 'proportional';
}> = ({ xZoomLevel, yZoomLevel, xOffset, yOffset, spaceScaleType }) => {
  return (
    <SpaceTimeChart
      className="inset-0 absolute"
      operationalPoints={OPERATIONAL_POINTS}
      spaceOrigin={0}
      spaceScales={OPERATIONAL_POINTS.slice(0, -1).map((point, i) => ({
        from: point.position,
        to: OPERATIONAL_POINTS[i + 1].position,
        ...(spaceScaleType === 'linear'
          ? { size: 50 * yZoomLevel }
          : { coefficient: 150 / yZoomLevel }),
      }))}
      timeOrigin={+new Date('2024/04/02')}
      timeScale={60000 / xZoomLevel}
      xOffset={xOffset}
      yOffset={yOffset}
    >
      {PATHS.map((path, i) => (
        <PathLayer key={path.id} index={i} path={path} color={path.color} />
      ))}
    </SpaceTimeChart>
  );
};

export default {
  title: 'SpaceTimeChart/Rendering',
  component: Wrapper,
  argTypes: {
    xZoomLevel: {
      name: 'X zoom level',
      description: '(in pixels/minute)',
      defaultValue: 0.4,
      control: { type: 'range', min: 0.1, max: 75, step: 0.1 },
    },
    xOffset: {
      name: 'X offset',
      description: '(in pixels)',
      defaultValue: 0,
      control: { type: 'number', step: 10 },
    },
    yZoomLevel: {
      name: 'Y zoom level',
      options: ['linear', 'proportional'],
      defaultValue: 1,
      control: { type: 'range', min: 0.1, max: 10, step: 0.1 },
    },
    yOffset: {
      name: 'Y offset',
      description: '(in pixels)',
      defaultValue: 0,
      control: { type: 'number', step: 10 },
    },
    spaceScaleType: {
      name: 'Space scaling type',
      options: ['linear', 'proportional'],
      defaultValue: 'linear',
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Wrapper>;

export const DefaultArgs = {
  name: 'Default arguments',
  args: {
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    xOffset: 0,
    yOffset: 0,
    spaceScaleType: 'linear',
  },
};
