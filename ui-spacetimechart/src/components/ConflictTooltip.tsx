import React from 'react';

import type { Point } from '../lib/types';

export type ConflictTooltipProps = {
  position: Point;
  timeStart: number;
  spaceStart: number;
  spaceEnd: number;
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
}: ConflictTooltipProps) => (
  <div className="spacetimechart-tooltip" style={{ left: position.x, top: position.y }}>
    <div className="start-time">{new Date(timeStart).toLocaleTimeString()}</div>
    <div className="position-range">
      <div className="start-position">{formatDistance(spaceStart)}</div>
      <div className="end-position">{formatDistance(spaceEnd)}</div>
    </div>
  </div>
);
