import React, { useEffect, useMemo, useState } from 'react';

import { Button } from '@osrd-project/ui-core';
import type { Meta } from '@storybook/react';
import { clamp } from 'lodash';

import '@osrd-project/ui-core/dist/theme.css';

import { OPERATIONAL_POINTS, PATHS } from './lib/paths';
import { PathLayer } from '../components/PathLayer';
import { SpaceTimeChart } from '../components/SpaceTimeChart';
import { ZoomRect } from '../components/ZoomRect';
import { type Point, type PathData, type OperationalPoint } from '../lib/types';
import { getDiff } from '../utils/vectors';
import { MouseTracker } from './lib/components';

const DEFAULT_WIDTH = 900;
const DEFAULT_HEIGHT = 450;

const MIN_ZOOM = 0;
const MAX_ZOOM = 100;
const MIN_ZOOM_MS_PER_PX = 600000;
const MAX_ZOOM_MS_PER_PX = 625;
const DEFAULT_ZOOM_MS_PER_PX = 7500;
type SpaceTimeHorizontalZoomWrapperProps = {
  swapAxes: boolean;
  keepDrawing: boolean;
  spaceOrigin: number;
  xOffset: number;
  yOffset: number;
  operationalPoints: OperationalPoint[];
  paths: (PathData & { color: string })[];
};

const zoomValueToTimeScale = (slider: number) =>
  MIN_ZOOM_MS_PER_PX * Math.pow(MAX_ZOOM_MS_PER_PX / MIN_ZOOM_MS_PER_PX, slider / 100);

const timeScaleToZoomValue = (timeScale: number) =>
  (100 * Math.log(timeScale / MIN_ZOOM_MS_PER_PX)) /
  Math.log(MAX_ZOOM_MS_PER_PX / MIN_ZOOM_MS_PER_PX);

/**
 * This story demonstrates the behavior of drawing a rectangle with the mouse, and how it should behave in regards to the default zoom and pan.
 */
const DrawRectangleWrapper = ({
  swapAxes,
  keepDrawing,
  spaceOrigin,
  xOffset,
  yOffset,
  operationalPoints = [],
  paths = [],
}: SpaceTimeHorizontalZoomWrapperProps) => {
  const [state, setState] = useState<{
    zoomValue: number;
    xOffset: number;
    yOffset: number;
    panning: null | { initialOffset: Point };
    drawing: boolean;
    rect: {
      timeStart: Date;
      timeEnd: Date;
      spaceStart: number; // mm
      spaceEnd: number; // mm
    } | null;
  }>({
    zoomValue: timeScaleToZoomValue(DEFAULT_ZOOM_MS_PER_PX),
    xOffset,
    yOffset,
    panning: null,
    drawing: false,
    rect: null,
  });
  useEffect(() => {
    setState((prev) => ({ ...prev, xOffset }));
  }, [xOffset]);
  useEffect(() => {
    setState((prev) => ({ ...prev, yOffset }));
  }, [yOffset]);
  const handleZoom = (zoomValue: number, position = DEFAULT_WIDTH / 2) => {
    if (state.drawing) {
      return;
    }
    const boundedXZoom = clamp(zoomValue, MIN_ZOOM, MAX_ZOOM);
    const oldTimeScale = zoomValueToTimeScale(state.zoomValue);
    const newTimeScale = zoomValueToTimeScale(boundedXZoom);
    const newOffset = position - ((position - state.xOffset) * oldTimeScale) / newTimeScale;
    setState((prev) => ({ ...prev, zoomValue: boundedXZoom, xOffset: newOffset }));
  };
  const simpleOperationalPoints = operationalPoints.map(({ id, position }) => ({
    id,
    label: id,
    position,
  }));
  const timeOrigin = +new Date('2024-04-02T00:00:00');
  const timeScale = zoomValueToTimeScale(state.zoomValue);
  const spaceScale = useMemo(
    () => [
      {
        from: -100000,
        to: 100000,
        coefficient: 300,
      },
    ],
    []
  );
  return (
    <div
      className="draw-rectangle-wrapper p-4"
      style={{
        height: `${DEFAULT_HEIGHT}px`,
        width: `${DEFAULT_WIDTH}px`,
      }}
    >
      <SpaceTimeChart
        className="inset-0 absolute h-full"
        spaceOrigin={spaceOrigin}
        swapAxis={swapAxes}
        xOffset={state.xOffset}
        yOffset={state.yOffset}
        timeOrigin={timeOrigin}
        operationalPoints={simpleOperationalPoints}
        timeScale={timeScale}
        spaceScales={spaceScale}
        onZoom={({ delta, position: { x } }) => {
          handleZoom(state.zoomValue + delta, x);
        }}
        onPan={({ initialPosition, position, isPanning, data, initialData }) => {
          const diff = getDiff(initialPosition, position);
          setState((prev) => {
            // when releasing the mouse, onPan is called one last time with isPanning false
            if (!isPanning) {
              const newDrawing = keepDrawing ? {} : { drawing: false };
              return { ...prev, panning: null, ...newDrawing };
            }
            if (state.drawing) {
              const rect = {
                timeStart: new Date(initialData.time),
                timeEnd: new Date(data.time),
                spaceStart: initialData.position,
                spaceEnd: data.position,
              };

              return {
                ...prev,
                rect,
              };
            }
            // Start panning:
            else if (!prev.panning) {
              return {
                ...prev,
                panning: {
                  initialOffset: {
                    x: prev.xOffset,
                    y: prev.yOffset,
                  },
                },
              };
            }
            // Keep panning:
            else {
              const { initialOffset } = prev.panning;
              return {
                ...prev,
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
        {state.rect && (
          <ZoomRect
            timeStart={state.rect.timeStart}
            timeEnd={state.rect.timeEnd}
            spaceStart={state.rect.spaceStart}
            spaceEnd={state.rect.spaceEnd}
          />
        )}
        <MouseTracker />
      </SpaceTimeChart>
      <Button
        label={state.drawing ? 'stop drawing' : 'draw'}
        onClick={() => {
          setState((prev) => ({ ...prev, drawing: !prev.drawing }));
        }}
      />
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Draw rectangle',
  component: DrawRectangleWrapper,
} as Meta<typeof DrawRectangleWrapper>;

export const Default = {
  args: {
    swapAxes: false,
    keepDrawing: true,
    spaceOrigin: 0,
    xOffset: 0,
    yOffset: 0,
    operationalPoints: OPERATIONAL_POINTS,
    paths: PATHS.slice(1, 2),
  },
};
