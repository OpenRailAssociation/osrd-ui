import React from 'react';

import Waypoint from './Waypoint';
import type { InteractiveWaypoint } from '../types';

type WaypointListProps = {
  waypoints: InteractiveWaypoint[];
  activeWaypointId?: string;
  activeWaypointRef?: React.RefObject<HTMLDivElement>;
  splitPosition?: number[];
  splitHeight?: number;
};

const WaypointList = ({
  waypoints,
  activeWaypointId,
  activeWaypointRef,
  splitPosition,
  splitHeight,
}: WaypointListProps) => (
  <div className="waypoint-list">
    {waypoints.map((waypoint, index) => (
      <div key={waypoint.id}>
        <div className="waypoint-wrapper flex justify-start" style={waypoint.styles}>
          <Waypoint
            waypoint={waypoint}
            nameRef={activeWaypointId === waypoint.id ? activeWaypointRef : undefined}
            isActive={activeWaypointId === waypoint.id}
            isMenuActive={!!activeWaypointId}
          />
        </div>
        {splitPosition?.some((data) => data === index + 1) && (
          <div
            className="text-center p-2"
            style={{
              height: splitHeight || 'auto',
              minHeight: 24,
              backgroundColor: 'rgba(152, 192, 245, 1)',
            }}
          >
            <span>Hello World</span>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default WaypointList;
