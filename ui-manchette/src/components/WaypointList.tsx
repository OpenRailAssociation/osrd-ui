import React from 'react';

import Waypoint from './Waypoint';
import type { InteractiveWaypoint } from '../types';

type WaypointListProps = {
  waypoints: InteractiveWaypoint[];
  activeWaypointId?: string;
  activeWaypointRef?: React.Ref<HTMLDivElement>;
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
          nameRef={activeWaypointId === waypoint.id ? activeWaypointRef : null}
          waypoint={waypoint}
          isActive={activeWaypointId === waypoint.id}
          isMenuActive={!!activeWaypointId}
        />
      </div>
    ))}
  </div>
);

export default WaypointList;
