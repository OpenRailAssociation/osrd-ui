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
      strokeWidth="2"
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

const DataLabel: FC<{ data: DataPoint; position: Point; isDiff?: boolean; marginTop?: number }> = ({
  data,
  position,
  isDiff,
  marginTop = 0,
}) => (
  <div
    style={{
      position: 'absolute',
      top: position.y + marginTop,
      left: position.x,
      whiteSpace: 'nowrap',
      background: WHITE_75,
      fontSize: '0.7em',
    }}
  >
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

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          width: 3,
          height: 3,
          margin: '-1 -1',
          background: 'black',
        }}
      />
      <DataLabel data={data} position={position} marginTop={5} />
    </div>
  );
};

/**
 * This story aims at showcasing how to measure times and distances in a SpaceTimeChart.
 */
const Wrapper: FC<{
  spaceScaleType: 'linear' | 'proportional';
}> = ({ spaceScaleType }) => {
  const [state, setState] = useState<{
    xOffset: number;
    yOffset: number;
    xZoomLevel: number;
    yZoomLevel: number;
    panTarget: null | { type: 'stage'; initialOffset: Point };
    mark: null | { data: DataPoint };
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
            setState((state) => ({
              ...state,
              panTarget: null,
            }));
          }
          // Start panning stage
          else if (!panTarget) {
            setState((state) => ({
              ...state,
              panTarget: {
                type: 'stage',
                initialOffset: {
                  x: state.xOffset,
                  y: state.yOffset,
                },
              },
            }));
          }
          // Keep panning stage:
          else if (panTarget.type === 'stage') {
            const xOffset = panTarget.initialOffset.x + diff.x;
            const yOffset = panTarget.initialOffset.y + diff.y;

            setState((state) => ({
              ...state,
              xOffset,
              yOffset,
            }));
          }
        }}
        onZoom={(payload) => {
          setState((state) => ({
            ...state,
            ...zoom(state, payload),
          }));
        }}
      >
        {PATHS.map((path, i) => (
          <PathLayer key={path.id} index={i} path={path} color={path.color} />
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
  },
} as Meta<typeof Wrapper>;

export const DefaultArgs = {
  name: 'Default arguments',
  args: {
    spaceScaleType: 'linear',
  },
};
