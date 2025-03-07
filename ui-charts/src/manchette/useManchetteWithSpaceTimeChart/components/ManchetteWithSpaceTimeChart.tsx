import React, { useCallback, useMemo, useRef, useState } from 'react';

import { clamp, keyBy } from 'lodash';

import { PathLayer, SpaceTimeChart, type SpaceTimeChartProps } from '../../../spaceTimeChart';
import { useDraw } from '../../../spaceTimeChart/hooks/useCanvas';
import { type DrawingFunction, type Point } from '../../../spaceTimeChart/lib/types';

import { X_ZOOM_LEVEL, zoom, Y_ZOOM_LEVEL } from '../../../spaceTimeChart/stories/lib/utils';
import Manchette, {
  type ProjectPathTrainResult,
  type ManchetteProps,
  type InteractiveWaypoint,
} from '../../Manchette';
import { getDiff } from '../../Manchette/utils/vector';
import useManchetteWithSpaceTimeChart from '../hooks/useManchetteWithSpaceTimeChart';
import { SAMPLE_WAYPOINTS } from '../assets/sampleData';

export type ManchetteWithSpaceTimeChartProps = {
  contents: (InteractiveWaypoint | React.ReactNode)[];
  splitPoints: string;
  splitHeight: number;
  scaleWithZoom: boolean;
  swapAxis: boolean;
  projectPathTrainResult: ProjectPathTrainResult[];
  selectedTrain?: number;
  height?: number;
  children?: React.ReactNode;
  header?: React.ReactNode;
  manchetteProps?: ManchetteProps;
  spaceTimeChartProps?: SpaceTimeChartProps;
};

/**
 * This component renders a colored area where the line only has one track:
 */
const FlatStep = ({ position }: { position: number }) => {
  const drawMonoTrackSpace = useCallback<DrawingFunction>(
    (ctx, { getSpacePixel, width, height, spaceAxis }) => {
      const spaceSize = spaceAxis === 'x' ? width : height;
      const timeSize = spaceAxis === 'x' ? height : width;
      const fromPixel = clamp(getSpacePixel(position), 0, spaceSize);
      const toPixel = clamp(getSpacePixel(position, true), 0, spaceSize);
      const monoLineSize = toPixel - fromPixel;
      if (!monoLineSize) return;

      ctx.fillStyle = '#EFF3F5';
      if (spaceAxis === 'x') {
        ctx.fillRect(fromPixel, 0, monoLineSize, timeSize);
      } else {
        ctx.fillRect(0, fromPixel, timeSize, monoLineSize);
      }
    },
    [position]
  );

  useDraw('overlay', drawMonoTrackSpace);

  return null;
};

/**
 * A simple component to display a manchette and a space time chart.
 *
 * This only covers basic usage. For more advanced control over the manchette
 * and space time chart, the useManchetteWithSpaceTimeChart() hook can be used.
 */
const ManchetteWithSpaceTimeChart = ({
  contents,
  splitPoints,
  splitHeight,
  scaleWithZoom,
  swapAxis,
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
  const COEFFICIENT = 300;
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

  const { manchetteProps, spaceTimeChartProps, handleScroll } = useManchetteWithSpaceTimeChart(
    contents,
    projectPathTrainResult,
    manchetteWithSpaceTimeChartRef,
    selectedTrain,
    height,
    spaceTimeChartRef
  );

  // For this story, we split the chart on "City C" and "City E:
  const fullSplitPoints = useMemo(() => {
    const operationalPointsDict = keyBy(SAMPLE_WAYPOINTS, 'id');
    const splitPointsSet = new Set(splitPoints.split(','));
    return 'ABCDEF'
      .split('')
      .filter((letter) => splitPointsSet.has(letter))
      .map((letter) => ({
        position: operationalPointsDict.position,
        label: 'operationalPointsDict.label',
        height: scaleWithZoom ? splitHeight * state.yZoomLevel : splitHeight,
      }));
  }, [scaleWithZoom, splitHeight, splitPoints, state.yZoomLevel]);

  const spaceScales = useMemo(
    () =>
      fullSplitPoints
        .flatMap(({ position, height }) => [
          {
            to: position,
            coefficient: COEFFICIENT / state.yZoomLevel,
          },
          {
            to: position,
            size: height,
          },
        ])
        .concat({
          to: SAMPLE_WAYPOINTS.at(-1)!.position,
          coefficient: COEFFICIENT / state.yZoomLevel,
        }),
    [fullSplitPoints, state.yZoomLevel]
  );

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
            className="h-full"
            spaceOrigin={0}
            swapAxis={swapAxis}
            xOffset={state.xOffset}
            yOffset={state.yOffset}
            timeOrigin={+new Date('2024/04/02')}
            contents={SAMPLE_WAYPOINTS}
            timeScale={100000 / state.xZoomLevel}
            spaceScales={spaceScales}
            onPan={({ initialPosition, position, isPanning }) => {
              const { panning } = state;
              const diff = getDiff(initialPosition, position);

              // Stop panning:
              if (!isPanning) {
                setState((prev) => ({
                  ...prev,
                  panning: null,
                }));
              }
              // Start panning stage
              else if (!panning) {
                setState((prev) => ({
                  ...prev,
                  panning: {
                    initialOffset: {
                      x: prev.xOffset,
                      y: prev.yOffset,
                    },
                  },
                }));
              }
              // Keep panning stage:
              else {
                const xOffset = panning.initialOffset.x + diff.x;
                const yOffset = panning.initialOffset.y + diff.y;

                setState((prev) => ({
                  ...prev,
                  xOffset,
                  yOffset,
                }));
              }
            }}
            onZoom={(payload) => {
              setState((prev) => ({
                ...prev,
                ...zoom(state, payload),
              }));
            }}
          >
            {spaceTimeChartProps.paths.map((path, index) => (
              <PathLayer key={path.id} path={path} color={path.color} level={path.level} />
            ))}
            {fullSplitPoints.map((point, index) => (
              <FlatStep key={index} position={point!.position} />
            ))}

            {children}
          </SpaceTimeChart>
        </div>
      </div>
    </div>
  );
};

export default ManchetteWithSpaceTimeChart;
