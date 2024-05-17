import React from 'react';
import { OperationalPointType } from '../types/pathPropertiesTypes';
import OperationalPoint from './OperationalPoint';
import cx from 'classnames';

interface OperationalPointListProps {
  operationalPoints: OperationalPointType[];
  isProportionnal?: boolean;
  zoom?: number;
  width?: number;
}

const OperationalPointList: React.FC<OperationalPointListProps> = ({
  operationalPoints,
  isProportionnal = false,
  zoom = 1,
}) => {
  const baseHeight = 24;
  const operationalPointHeight = (op: OperationalPointType) => {
    if (isProportionnal) {
      // WIP :  Ratio to find
      return '100%';
    } else {
      return baseHeight * zoom;
    }
  };
  return (
    <div className="operational-point-list">
      {operationalPoints.map((op, index, { length }) => (
        //WIP : length will be usefull for proportionnal display
        <div
          key={index}
          className={cx('operational-point-wrapper flex flex-col justify-start', {})}
          style={{ height: operationalPointHeight(op) }}
        >
          <OperationalPoint {...op} />
        </div>
      ))}
    </div>
  );
};

export default OperationalPointList;
