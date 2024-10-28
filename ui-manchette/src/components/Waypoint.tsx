import React, { useRef } from 'react';

import cx from 'classnames';

import { type InteractiveWaypoint } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmToKm } from '../utils';

type WaypointProps = {
  waypoint: InteractiveWaypoint;
  isActive: boolean;
};

const Waypoint = ({
  waypoint: { name, secondaryCode, id, position, display, onClick },
  isActive,
}: WaypointProps) => {
  const opRef = useRef<HTMLDivElement>(null);

  if (!display) return null;

  return (
    <div
      className={cx('flex waypoint items-baseline', {
        'menu-active': isActive,
      })}
      id={id}
      ref={opRef}
      onClick={() => {
        if (onClick) onClick(id, opRef.current);
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
