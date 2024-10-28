import React from 'react';

import Waypoint from './Waypoint';
import { type InteractiveWaypoint } from '../types';

type WaypointListProps = {
  waypoints: InteractiveWaypoint[];
  activeWaypointId?: string;
};

const WaypointList = ({ waypoints, activeWaypointId }: WaypointListProps) => (
  <div className="waypoint-list ">
    {waypoints.map((waypoint) => (
      <div
        key={waypoint.id}
        className="waypoint-wrapper flex flex-col justify-start"
        style={waypoint.styles}
      >
        <Waypoint waypoint={waypoint} isActive={activeWaypointId === waypoint.id} />
      </div>
    ))}
  </div>
);

export default WaypointList;
