import React from 'react';

import OperationalPoint from './OperationalPoint';
import { type StyledOperationalPointType } from '../types';

type OperationalPointListProps = {
  operationalPoints: StyledOperationalPointType[];
  activeOperationalPointId?: string;
};

const OperationalPointList = ({
  operationalPoints,
  activeOperationalPointId,
}: OperationalPointListProps) => (
  <div className="operational-point-list ">
    {operationalPoints.map((op) => (
      <div
        key={op.id}
        className="operational-point-wrapper flex flex-col justify-start"
        style={op.styles}
      >
        <OperationalPoint operationalPoint={op} isActive={activeOperationalPointId === op.id} />
      </div>
    ))}
  </div>
);

export default OperationalPointList;
