import React, { type FC, useContext, useState } from 'react';

import type { Meta } from '@storybook/react';
import cx from 'classnames';
import { round } from 'lodash';

import { OPERATIONAL_POINTS, PATHS } from './assets/paths';
import { X_ZOOM_LEVEL, Y_ZOOM_LEVEL, zoom } from './utils';
import { SpaceTimeChart, PathLayer } from '../';
import { WHITE_75 } from '../lib/consts';
import { MouseContext, SpaceTimeChartContext } from '../lib/context';
import { type DataPoint, type Point } from '../lib/types';
import { getDiff } from '../utils/vectors';

const Line: FC<{
  p1: Point;
  p2: Point;
}> = ({ p1, p2 }) => (
  <svg width="100%" height="100%">
    <line
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke="black"
      strokeWidth="1"
      strokeDasharray="5, 5"
    />
  </svg>
);

function formatTimeLength(date: Date): string {
  const totalMilliseconds = date.getTime();
  const sign = totalMilliseconds >= 0 ? '+' : '-';

  let absMilliseconds = Math.abs(totalMilliseconds);

  const hours = Math.floor(absMilliseconds / (1000 * 60 * 60));
  absMilliseconds -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(absMilliseconds / (1000 * 60));

  let result = sign;
  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    if (hours > 0) result += ' ';
    result += `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return result.trim();
}

const CROSS_SIZE = 11;
const DataLabel: FC<{
  data: DataPoint;
  position: Point;
  isDiff?: boolean;
  marginTop?: number;
}> = ({ data, position, isDiff, marginTop = 0 }) => (
  <div
    style={{
      position: 'absolute',
      top: position.y,
      left: position.x,
      paddingTop: marginTop,
      whiteSpace: 'nowrap',
      fontSize: '0.7em',
    }}
  >
    <div
      style={{
        position: 'absolute',
        width: CROSS_SIZE,
        height: 1,
        left: -CROSS_SIZE / 2,
        top: -0.5,
        background: 'black',
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: 1,
        height: CROSS_SIZE,
        left: -0.5,
        top: -CROSS_SIZE / 2,
        background: 'black',
      }}
    />
    <div className="content" style={{ background: WHITE_75 }}>
      {isDiff ? (
        <>
          <div>Time difference: {formatTimeLength(new Date(data.time))}</div>
          <div>Distance to mark: {round(data.position).toLocaleString()} m</div>
        </>
      ) : (
        <>
          <div>Time: {new Date(data.time).toLocaleTimeString()}</div>
          <div>Distance: {round(data.position).toLocaleString()} m</div>
        </>
      )}
    </div>
  </div>
);

const MouseTracker: FC<{ reference?: DataPoint }> = ({ reference }) => {
  const { getPoint } = useContext(SpaceTimeChartContext);
  const { position, data, isHover } = useContext(MouseContext);

  return isHover ? (
    <>
      {!!reference && <Line p1={position} p2={getPoint(reference)} />}
      <DataLabel
        data={
          reference
            ? {
                position: data.position - reference.position,
                time: data.time - reference.time,
              }
            : data
        }
        position={position}
        isDiff={!!reference}
        marginTop={30}
      />
    </>
  ) : null;
};

const Mark: FC<{ data: DataPoint }> = ({ data }) => {
  const { getPoint } = useContext(SpaceTimeChartContext);
  const position = getPoint(data);

  return <DataLabel data={data} position={position} marginTop={5} />;
};

/**
 * This story aims at showcasing how to measure times and distances in a SpaceTimeChart.
 */
const Wrapper: FC<{
  spaceScaleType: 'linear' | 'proportional';
  enableSnapping: boolean;
}> = ({ spaceScaleType, enableSnapping }) => {
  const [state, setState] = useState<{
    xOffset: number;
    yOffset: number;
    xZoomLevel: number;
    yZoomLevel: number;
    panTarget: null | { type: 'stage'; initialOffset: Point };
    mark: null | { data: DataPoint; pathId?: string };
  }>({
    xOffset: 0,
    yOffset: 0,
    xZoomLevel: X_ZOOM_LEVEL,
    yZoomLevel: Y_ZOOM_LEVEL,
    panTarget: null,
    mark: null,
  });

  return (
    <div className="inset-0">
      <SpaceTimeChart
        className={cx(
          'inset-0 absolute overflow-hidden p-0 m-0',
          state.panTarget && 'cursor-grabbing'
        )}
        enableSnapping={enableSnapping}
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
        onClick={({ data }) => {
          if (!state.panTarget) setState({ ...state, mark: state.mark ? null : { data } });
        }}
        onPan={({ initialPosition, position, isPanning }) => {
          const { panTarget } = state;
          const diff = getDiff(initialPosition, position);

          // Stop panning:
          if (!isPanning) {
            setState((prev) => ({
              ...prev,
              panTarget: null,
            }));
          }
          // Start panning stage
          else if (!panTarget) {
            setState((prev) => ({
              ...prev,
              panTarget: {
                type: 'stage',
                initialOffset: {
                  x: prev.xOffset,
                  y: prev.yOffset,
                },
              },
            }));
          }
          // Keep panning stage:
          else if (panTarget.type === 'stage') {
            const xOffset = panTarget.initialOffset.x + diff.x;
            const yOffset = panTarget.initialOffset.y + diff.y;

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
        {PATHS.map((path) => (
          <PathLayer key={path.id} path={path} color={path.color} />
        ))}
        <MouseTracker reference={state.mark?.data} />
        {state.mark && <Mark data={state.mark.data} />}
      </SpaceTimeChart>
    </div>
  );
};

export default {
  title: 'SpaceTimeChart/Measuring times and distances',
  component: Wrapper,
  argTypes: {
    spaceScaleType: {
      name: 'Space scaling type',
      options: ['linear', 'proportional'],
      defaultValue: 'linear',
      control: { type: 'radio' },
    },
    enableSnapping: {
      name: 'Enable snapping to closest points?',
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof Wrapper>;

export const DefaultArgs = {
  name: 'Default arguments',
  args: {
    spaceScaleType: 'linear',
    enableSnapping: true,
  },
};
