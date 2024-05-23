import React, { type FC, useState } from 'react';

import type { Meta } from '@storybook/react';
import cx from 'classnames';

import { MouseTracker } from './lib/components';
import { OPERATIONAL_POINTS, PATHS } from './lib/paths';
import {
  MAX_X_ZOOM,
  MAX_Y_ZOOM,
  MIN_X_ZOOM,
  MIN_Y_ZOOM,
  X_ZOOM_LEVEL,
  Y_ZOOM_LEVEL,
} from './lib/utils';
import { SpaceTimeChart, PathLayer } from '../';
import { type Point } from '../lib/types';
import { getDiff } from '../utils/vectors';

import './lib/tailwind-mockup.css';

/**
 * This story aims at showcasing how to handle panning and zooming in a SpaceTimeChart.
 */
const Wrapper: FC<{
  enableSnapping: boolean;
  hideGrid: boolean;
  hidePathsLabels: boolean;
  swapAxis: boolean;
  spaceScaleType: 'linear' | 'proportional';
}> = ({ enableSnapping, hideGrid, hidePathsLabels, swapAxis, spaceScaleType }) => {
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
        enableSnapping={enableSnapping}
        hideGrid={hideGrid}
        hidePathsLabels={hidePathsLabels}
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
              const { initialOffset } = s.panning;
              return {
                ...s,
                xOffset: initialOffset.x + diff.x,
                yOffset: initialOffset.y + diff.y,
              };
            }
          });
        }}
        onZoom={({ delta, position: { x, y } }) => {
          setState((s) => {
            const newState = { ...s };

            newState.xZoomLevel = Math.min(
              Math.max(newState.xZoomLevel * (1 + delta / 10), MIN_X_ZOOM),
              MAX_X_ZOOM
            );
            newState.yZoomLevel = Math.min(
              Math.max(newState.yZoomLevel * (1 + delta / 10), MIN_Y_ZOOM),
              MAX_Y_ZOOM
            );

            // These line is to center the zoom on the mouse Y position:
            newState.xOffset = x - ((x - state.xOffset) / state.xZoomLevel) * newState.xZoomLevel;
            newState.yOffset = y - ((y - state.yOffset) / state.yZoomLevel) * newState.yZoomLevel;

            return newState;
          });
        }}
      >
        {PATHS.map((path) => (
          <PathLayer key={path.id} path={path} color={path.color} />
        ))}
        <MouseTracker />
      </SpaceTimeChart>
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Options',
  component: Wrapper,
  argTypes: {
    enableSnapping: {
      name: 'Enable snapping?',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    hideGrid: {
      name: 'Hide grid?',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    hidePathsLabels: {
      name: 'Hide paths labels?',
      defaultValue: false,
      control: { type: 'boolean' },
    },
    swapAxis: {
      name: 'Swap time and space axis?',
      defaultValue: false,
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
    enableSnapping: true,
    hideGrid: false,
    hidePathsLabels: false,
    swapAxis: false,
    spaceScaleType: 'linear',
  },
};
