import React from 'react';

import Waypoint from './Waypoint';
import type { InteractiveWaypoint } from '../types';
import TrackOccupancyManchette from './TrackOccupancyManchette';

type WaypointListWithGOVProps = {
  waypoints: InteractiveWaypoint[];
  activeWaypointId?: string;
  activeWaypointRef?: React.RefObject<HTMLDivElement>;
  splitData?: { position: number; height?: number }[];
};

const WaypointListWithGOV = ({
  waypoints,
  activeWaypointId,
  activeWaypointRef,
  splitData = [],
}: WaypointListWithGOVProps) => (
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
        {splitData.some((data) => data.position === index + 1) && (
          <div
            className="text-center p-2"
            style={{
              height: splitData.find((data) => data.position === index + 1)?.height || 'auto',
            }}
          >
            <TrackOccupancyManchette tracks={waypoint.tracks} />
          </div>
        )}
      </div>
    ))}
  </div>
);

export default WaypointListWithGOV;
