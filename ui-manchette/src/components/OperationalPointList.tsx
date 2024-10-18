import React from 'react';

import OperationalPoint from './OperationalPoint';
import { type EnrichedWaypoint } from '../types';

type OperationalPointListProps = {
  waypoints: EnrichedWaypoint[];
  activeWaypointId?: string;
};

const OperationalPointList = ({ waypoints, activeWaypointId }: OperationalPointListProps) => (
  <div className="operational-point-list ">
    {waypoints.map((waypoint) => (
      <div
        key={waypoint.id}
        className="operational-point-wrapper flex flex-col justify-start"
        style={waypoint.styles}
      >
        <OperationalPoint waypoint={waypoint} isActive={activeWaypointId === waypoint.id} />
      </div>
    ))}
  </div>
);

export default OperationalPointList;
