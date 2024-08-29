import React, { type FC, useContext } from 'react';

import { round } from 'lodash';

import { formatTimeLength } from './utils';
import { WHITE_75 } from '../../lib/consts';
import { MouseContext, SpaceTimeChartContext } from '../../lib/context';
import { type DataPoint, type Point } from '../../lib/types';

/**
 * This component draws a dashed line from p1 to p2, using SVG:
 */
export const Line: FC<{
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

const CROSS_SIZE = 11;
const Cross: FC<{ size?: number }> = ({ size = CROSS_SIZE }) => (
  <>
    <div
      style={{
        position: 'absolute',
        width: size,
        height: 1,
        left: -size / 2,
        top: -0.5,
        background: 'black',
      }}
    />
    <div
      style={{
        position: 'absolute',
        width: 1,
        height: size,
        left: -0.5,
        top: -size / 2,
        background: 'black',
      }}
    />
  </>
);

/**
 * This component renders a data label, to help bring context to the SpaceTimeChart:
 */
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
    <Cross />
    <div className="content" style={{ background: WHITE_75 }}>
      {isDiff ? (
        <>
          <div>Time difference: {formatTimeLength(new Date(data.time))}</div>
          <div>Distance to mark: {round(data.position).toLocaleString()} m</div>
        </>
      ) : (
        <>
          <div>Time: {new Date(data.time).toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
          <div>Distance: {round(data.position).toLocaleString()} m</div>
        </>
      )}
    </div>
  </div>
);

/**
 * This component renders a DataLabel under the mouse, using the MouseContext from the SpaceTimeChart:
 */
export const MouseTracker: FC<{ reference?: DataPoint }> = ({ reference }) => {
  const { getPoint } = useContext(SpaceTimeChartContext);
  const { position, data, isHover } = useContext(MouseContext);

  return isHover ? (
    <>
      {!!reference && <Line p1={position} p2={getPoint(reference)} />}
      {!!reference && <DataLabel data={reference} position={getPoint(reference)} marginTop={5} />}
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
