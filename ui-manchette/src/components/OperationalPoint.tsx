import React, { useRef } from 'react';

import cx from 'classnames';

import type { WaypointMenuItem, StyledOperationalPointType } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmToKm } from '../utils';
import WaypointMenu from './WaypointMenu';

type OperationalPointProps = {
  operationalPoint: StyledOperationalPointType;
  isActive: boolean;
  waypointMenuItems?: WaypointMenuItem[];
  waypointMenuClassName?: string;
};

const OperationalPoint = ({
  operationalPoint: { extensions, id, position, display, onClick },
  isActive,
  waypointMenuItems,
  waypointMenuClassName,
}: OperationalPointProps) => {
  const opRef = useRef<HTMLDivElement>(null);

  if (!display) return null;

  return (
    <div
      className={cx('flex op items-baseline', {
        'menu-active': isActive,
      })}
      id={id}
      ref={opRef}
      onClick={() => {
        if (onClick) onClick(`${id}-${position}`); // to handle waypoints with same id
      }}
    >
      <div className="op-position justify-self-start text-end">{positionMmToKm(position)}</div>

      <div className="op-name mx-2 justify-self-start">{extensions?.identifier?.name}</div>
      <div className="op-separator"></div>
      <div className="op-ch font-mono justify-self-end">{extensions?.sncf?.ch}</div>
      <div className="op-separator"></div>

      <div className="op-type"></div>
      <div className="op-separator"></div>
      {isActive && waypointMenuItems && (
        <WaypointMenu items={waypointMenuItems} className={waypointMenuClassName} />
      )}
    </div>
  );
};

export default OperationalPoint;
