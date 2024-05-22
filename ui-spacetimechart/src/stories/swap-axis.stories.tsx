import React, { type FC, useState } from 'react';

import type { Meta } from '@storybook/react';
import cx from 'classnames';

import { OPERATIONAL_POINTS, PATHS } from './assets/paths';
import {
  MAX_X_ZOOM,
  MAX_Y_ZOOM,
  MIN_X_ZOOM,
  MIN_Y_ZOOM,
  X_ZOOM_LEVEL,
  Y_ZOOM_LEVEL,
} from './utils';
import { SpaceTimeChart, PathLayer } from '../';
import { type Point } from '../lib/types';
import { getDiff } from '../utils/vectors';

import './tailwind-mockup.css';

/**
 * This story aims at showcasing how to swap time and space axis in a SpaceTimeChart.
 */
const Wrapper: FC<{
  swapAxis: boolean;
  spaceScaleType: 'linear' | 'proportional';
}> = ({ swapAxis, spaceScaleType }) => {
  const [state, setState] = useState<{
    xOffset: number;
    yOffset: number;
    xZoomLevel: number;
    yZoomLevel: number;
    panning: null | { initialOffset: Point };
  }>({
    xOffset: 0,
    yOffset: 0,
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    panning: null,
  });

  return (
    <div className="inset-0">
      <SpaceTimeChart
        className={cx('inset-0 absolute p-0 m-0', state.panning && 'cursor-grabbing')}
        swapAxis={swapAxis}
        operationalPoints={OPERATIONAL_POINTS}
        spaceOrigin={0}
        spaceScales={OPERATIONAL_POINTS.slice(0, -1).map((point, i) => ({
          from: point.position,
          to: OPERATIONAL_POINTS[i + 1].position,
          ...(spaceScaleType === 'linear'
            ? { size: 50 * state.yZoomLevel }
            : { coefficient: 150 / state.yZoomLevel }),
        }))}
        timeOrigin={+new Date('2024/04/02')}
        timeScale={60000 / state.xZoomLevel}
        xOffset={state.xOffset}
        yOffset={state.yOffset}
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
              return {
                ...s,
                xOffset: s.panning.initialOffset.x + diff.x,
                yOffset: s.panning.initialOffset.y + diff.y,
              };
            }
          });
        }}
        onZoom={({ delta, position: { x, y } }) => {
          // The zoom is quite straightforward. The hardest part is to keep the zoom centered on the
          // mouse. There is a shorter version in ./utils.ts, used by the other stories.
          setState((s) => {
            const newState = {
              ...s,
            };
            newState.xZoomLevel = Math.min(
              Math.max(newState.xZoomLevel * (1 + delta / 10), MIN_X_ZOOM),
              MAX_X_ZOOM
            );
            // This line is to center the zoom on the mouse X position:
            newState.xOffset = x - ((x - s.xOffset) / s.xZoomLevel) * newState.xZoomLevel;
            newState.yZoomLevel = Math.min(
              Math.max(newState.yZoomLevel * (1 + delta / 10), MIN_Y_ZOOM),
              MAX_Y_ZOOM
            );
            // This line is to center the zoom on the mouse Y position:
            newState.yOffset = y - ((y - s.yOffset) / s.yZoomLevel) * newState.yZoomLevel;

            return newState;
          });
        }}
      >
        {PATHS.map((path) => (
          <PathLayer key={path.id} path={path} color={path.color} />
        ))}
      </SpaceTimeChart>
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Swap axis',
  component: Wrapper,
  argTypes: {
    swapAxis: {
      name: 'Swap time and space axis?',
      defaultValue: true,
      control: { type: 'boolean' },
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
    swapAxis: true,
    spaceScaleType: 'linear',
  },
};
