import React from 'react';

import type { Point } from '../lib/types';

export type ConflictTooltipProps = {
  position: Point;
  timeStart: number;
  spaceStart: number;
  spaceEnd: number;
  conflicts: {
    trainNames: string[];
    type: string;
    timeStart: number;
    timeEnd: number;
  }[];
};

const formatDistance = (meters: number) => {
  const km = meters / 1000;
  return km.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
};

export const ConflictTooltip = ({
  position,
  timeStart,
  spaceStart,
  spaceEnd,
  conflicts,
}: ConflictTooltipProps) => (
  <div className="spacetimechart-tooltip" style={{ left: position.x, top: position.y }}>
    <div className="start-time">{new Date(timeStart).toLocaleTimeString()}</div>
    <div className="position-range">
      <div className="start-position">{formatDistance(spaceStart)}</div>
      <div className="end-position">{formatDistance(spaceEnd)}</div>
    </div>
    {conflicts.map((conflict, index) => (
      <section className="conflict" key={index}>
        <header>{conflict.trainNames.join(' ×× ')}</header>
        <footer>
          <div>{conflict.type}</div>
          <div>{Math.round((conflict.timeEnd - conflict.timeStart) / 1000)}s</div>
        </footer>
      </section>
    ))}
  </div>
);
