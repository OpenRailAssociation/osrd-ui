import React, { useEffect } from 'react';
import { isEqual } from 'lodash';
import { OperationalPointType } from '../types';
import OperationalPoint from './OperationalPoint';
import { positionMmtoKm } from './helpers';
import { BASE_KM_HEIGHT, BASE_OP_HEIGHT } from './consts';

type OperationalPointListProps = {
  operationalPoints: OperationalPointType[];
  isProportionnal?: boolean;
  zoom?: number;
};

const OperationalPointList: React.FC<OperationalPointListProps> = ({
  operationalPoints,
  isProportionnal = false,
  zoom = 1,
}) => {
  const [operationalPointsToDisplay, setOperationalPointsToDisplay] = React.useState<
    OperationalPointType[]
  >([]);

  const operationalPointStyle = (op: OperationalPointType, nextOp?: OperationalPointType) => {
    if (isProportionnal) {
      if (!nextOp) {
        return { height: `${BASE_OP_HEIGHT}px` };
      } else {
        return {
          height: `${positionMmtoKm(nextOp.position - op.position) * zoom * BASE_KM_HEIGHT}px`,
        };
      }
    } else {
      return { height: `${BASE_OP_HEIGHT * zoom}px` };
    }
  };

  useEffect(() => {
    const calcOperationalPointsToDisplay = () => {
      if (isProportionnal) {
        const result = operationalPoints.reduce(
          (accumulatedPoints, nextOp) => {
            const lastDisplayedPoint = accumulatedPoints[accumulatedPoints.length - 1];
            const distance = positionMmtoKm(nextOp.position - lastDisplayedPoint.position);
            if (distance * BASE_KM_HEIGHT * zoom >= BASE_OP_HEIGHT) {
              accumulatedPoints.push(nextOp);
            }
            return accumulatedPoints;
          },
          [operationalPoints[0]]
        );

        const lastPoint = operationalPoints[operationalPoints.length - 1];
        if (isEqual(result[result.length - 1], lastPoint)) {
          result.push(lastPoint);
        }

        const secondLastIndex = result.length - 2;
        if (secondLastIndex >= 0) {
          const secondLastPoint = result[secondLastIndex];
          const lastDiff = positionMmtoKm(lastPoint.position - secondLastPoint.position);
          if (lastDiff * BASE_KM_HEIGHT * zoom < BASE_OP_HEIGHT) {
            result.splice(secondLastIndex, 1);
          }
        }

        return result;
      } else {
        return operationalPoints;
      }
    };
    setOperationalPointsToDisplay(calcOperationalPointsToDisplay());
  }, [operationalPoints, isProportionnal, zoom]);

  return (
    <div className="operational-point-list">
      {operationalPointsToDisplay.map((op, index) => (
        <div
          key={index}
          className="operational-point-wrapper flex flex-col justify-start"
          style={operationalPointStyle(op, operationalPointsToDisplay[index + 1])}
        >
          <OperationalPoint {...op} />
        </div>
      ))}
    </div>
  );
};

export default OperationalPointList;
