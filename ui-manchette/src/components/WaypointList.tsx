import React from 'react';

import Waypoint from './Waypoint';
import type { WaypointMenuData, InteractiveWaypoint } from '../types';

type WaypointListProps = {
  waypoints: InteractiveWaypoint[];
  waypointMenuData?: WaypointMenuData;
};

const WaypointList = ({ waypoints, waypointMenuData }: WaypointListProps) => (
  <div className="waypoint-list ">
    {waypoints.map((waypoint) => (
      <div
        key={waypoint.id}
        className="waypoint-wrapper flex justify-start"
        style={waypoint.styles}
      >
        <Waypoint
          waypoint={waypoint}
          isActive={waypointMenuData?.activeWaypointId === waypoint.id}
          waypointMenu={waypointMenuData?.menu}
          scrollableParentRef={waypointMenuData?.scrollableParentRef}
        />
      </div>
    ))}
  </div>
);

export default WaypointList;
