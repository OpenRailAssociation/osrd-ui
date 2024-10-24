import React from 'react';

import OperationalPoint from './OperationalPoint';
import type { WaypointMenuData, StyledOperationalPointType } from '../types';

type OperationalPointListProps = {
  operationalPoints: StyledOperationalPointType[];
  waypointMenuData: WaypointMenuData;
};

const OperationalPointList = ({
  operationalPoints,
  waypointMenuData: { activeOperationalPointId, waypointMenuItems, waypointMenuClassName },
}: OperationalPointListProps) => (
  <div className="operational-point-list ">
    {operationalPoints.map((op) => (
      <div
        key={op.id}
        className="operational-point-wrapper flex flex-col justify-start"
        style={op.styles}
      >
        <OperationalPoint
          operationalPoint={op}
          isActive={activeOperationalPointId === `${op.id}-${op.position}`}
          waypointMenuItems={waypointMenuItems}
          waypointMenuClassName={waypointMenuClassName}
        />
      </div>
    ))}
  </div>
);

export default OperationalPointList;
