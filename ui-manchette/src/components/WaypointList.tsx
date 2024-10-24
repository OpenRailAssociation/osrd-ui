import React from 'react';

import Waypoint from './Waypoint';
import type { InteractiveWaypoint } from '../types';

type WaypointListProps = {
  waypoints: InteractiveWaypoint[];
  activeWaypointId?: string;
  activeWaypointRef?: React.RefObject<HTMLDivElement>;
};

const WaypointList = ({ waypoints, activeWaypointId, activeWaypointRef }: WaypointListProps) => (
  <div className="waypoint-list ">
    {waypoints.map((waypoint) => (
      <div
        key={waypoint.id}
        className="waypoint-wrapper flex justify-start"
        style={waypoint.styles}
      >
        <Waypoint
          waypoint={waypoint}
          nameRef={activeWaypointId === waypoint.id ? activeWaypointRef : undefined}
          isActive={activeWaypointId === waypoint.id}
          isMenuActive={!!activeWaypointId}
        />
      </div>
    ))}
  </div>
);

export default WaypointList;
