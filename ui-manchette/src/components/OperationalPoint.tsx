import React, { useRef } from 'react';

import cx from 'classnames';

import { type EnrichedWaypoint } from '../types';
import '@osrd-project/ui-core/dist/theme.css';
import { positionMmToKm } from '../utils';

type OperationalPointProps = {
  waypoint: EnrichedWaypoint;
  isActive: boolean;
};

const OperationalPoint = ({
  waypoint: { name, secondaryCode, id, position, display, onClick },
  isActive,
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
        onClick && onClick(id, opRef.current);
      }}
    >
      <div className="op-position justify-self-start text-end">{positionMmToKm(position)}</div>

      <div className="op-name mx-2 justify-self-start">{name}</div>
      <div className="op-separator"></div>
      <div className="op-ch font-mono justify-self-end">{secondaryCode}</div>
      <div className="op-separator"></div>

      <div className="op-type"></div>
      <div className="op-separator"></div>
    </div>
  );
};

export default OperationalPoint;
