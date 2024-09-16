import React from 'react';

import OperationalPoint from './OperationalPoint';
import { type StyledOperationalPointType } from '../types';

type OperationalPointListProps = {
  operationalPoints: StyledOperationalPointType[];
};

const OperationalPointList = ({ operationalPoints }: OperationalPointListProps) => (
  <div className="operational-point-list ">
    {operationalPoints.map((op, index) => (
      <div
        key={op.id}
        className="operational-point-wrapper flex flex-col justify-start"
        style={op.styles}
      >
        <OperationalPoint {...op} />
      </div>
    ))}
  </div>
);

export default OperationalPointList;
