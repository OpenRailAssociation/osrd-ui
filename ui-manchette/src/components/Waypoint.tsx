import React, { useRef } from 'react';

import cx from 'classnames';

import { type InteractiveWaypoint } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmToKm } from '../utils';

const MENU_OFFSET = 2;

type WaypointProps = {
  waypoint: InteractiveWaypoint;
  isActive: boolean;
  waypointMenu?: React.ReactNode;
};

const Waypoint = ({
  waypoint: { name, secondaryCode, id, position, display, onClick },
  isActive,
  waypointMenu,
}: WaypointProps) => {
  const waypointRef = useRef<HTMLDivElement>(null);

  if (!display) return null;

  return (
    <>
      <div
        ref={waypointRef}
        className={cx('flex waypoint items-baseline', {
          'menu-active': isActive,
        })}
        id={id}
        onClick={() => {
          if (onClick) onClick(id);
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
        {waypointMenu && isActive && waypointRef.current && (
          <div
            className="menu-wrapper"
            style={{ top: waypointRef.current.getBoundingClientRect().bottom - MENU_OFFSET }}
          >
            {waypointMenu}
          </div>
        )}
      </div>
      <div className="last-separator"></div>
    </>
  );
};

export default Waypoint;
