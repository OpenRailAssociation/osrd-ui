import React from 'react';
import { StyledOperationalPointType } from '../types';
import OperationalPoint from './OperationalPoint';

type OperationalPointListProps = {
  operationalPoints: StyledOperationalPointType[];
};

const OperationalPointList: React.FC<OperationalPointListProps> = ({ operationalPoints }) => {
  return (
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
};

export default OperationalPointList;
