import React, { useRef } from 'react';

import cx from 'classnames';

import { type InteractiveWaypoint } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmToKm } from '../utils';

type WaypointProps = {
  waypoint: InteractiveWaypoint;
  isActive: boolean;
  isMenuActive?: boolean;
};

const Waypoint = ({
  waypoint: { name, secondaryCode, id, position, display, onClick },
  isActive,
  isMenuActive,
}: WaypointProps) => {
  const waypointRef = useRef<HTMLDivElement>(null);

  if (!display) return null;

  return (
    <div
      ref={waypointRef}
      className={cx('flex waypoint items-baseline', {
        'waypoint-active': isActive,
        'menu-active': isMenuActive,
      })}
      id={id}
      onClick={() => {
        if (onClick && !isMenuActive) onClick(id, waypointRef);
      }}
    >
      <div className="waypoint-position justify-self-start text-end">
        {positionMmToKm(position)}
      </div>

      <div className="waypoint-name mx-2 justify-self-start">{name}</div>
      <div className="waypoint-separator"></div>
      <div className="waypoint-ch font-mono justify-self-end">{secondaryCode}</div>
      <div className="waypoint-separator"></div>

      <div className="waypoint-type"></div>
      <div className="waypoint-separator"></div>
    </div>
  );
};

export default Waypoint;
