import React from 'react';

import Waypoint from './Waypoint';
import type { InteractiveWaypoint } from '../types';

type WaypointListProps = {
  contents: (InteractiveWaypoint | React.ReactNode)[];
  activeWaypointId?: string;
  activeWaypointRef?: React.RefObject<HTMLDivElement>;
};

const isInteractiveWaypoint = (
  item: InteractiveWaypoint | React.ReactNode
): item is InteractiveWaypoint =>
  item != null && typeof item === 'object' && 'id' in item && 'position' in item;

const WaypointList = ({ contents, activeWaypointId, activeWaypointRef }: WaypointListProps) => (
  <div className="waypoint-list">
    {contents.map((content, index) =>
      isInteractiveWaypoint(content) ? (
        <div
          key={content.id}
          className="waypoint-wrapper flex justify-start"
          style={content.styles}
        >
          <Waypoint
            waypoint={content}
            nameRef={activeWaypointId === content.id ? activeWaypointRef : undefined}
            isActive={activeWaypointId === content.id}
            isMenuActive={!!activeWaypointId}
          />
        </div>
      ) : (
        <div key={index}>{content}</div>
      )
    )}
  </div>
);

export default WaypointList;
