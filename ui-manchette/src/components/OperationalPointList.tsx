import React from 'react';

import OperationalPoint from './OperationalPoint';
import { type StyledOperationalPointType } from '../types';

type OperationalPointListProps = {
  operationalPoints: StyledOperationalPointType[];
};

const OperationalPointList: React.FC<OperationalPointListProps> = ({ operationalPoints }) => (
  <div className="operational-point-list ">
    {operationalPoints.map((op, index) => (
      <div
        key={index}
        className="operational-point-wrapper flex flex-col justify-start"
        style={op.styles}
      >
        <OperationalPoint {...op} />
      </div>
    ))}
  </div>
);

export default OperationalPointList;
