import type { OperationalPoint } from '@osrd-project/ui-spacetimechart/dist/lib/types';
import type { OperationalPointType, StyledOperationalPointType } from '../types';
import { BASE_KM_HEIGHT, BASE_OP_HEIGHT } from './consts';

export const positionMmToKm = (position: number) => {
  return Math.round((position / 1000000) * 10) / 10;
};

export const calcOperationalPointsToDisplay = (
  operationalPoints: OperationalPointType[],
  isProportionnal: boolean,
  zoom: number
) => {
  if (isProportionnal) {
    const result = operationalPoints.reduce(
      (acc, nextOp) => {
        let op = { ...acc[acc.length - 1] };
        const newOp = { ...nextOp, display: true, styles: {} };
        const diff = positionMmToKm(nextOp.position - op.position);
        if (diff * 8 * zoom >= BASE_OP_HEIGHT) {
          acc.push(newOp);
          op = nextOp;
        } else {
          newOp.display = false;
          acc.push(newOp);
        }
        return acc;
      },
      [{ ...operationalPoints[0], display: true, styles: {} } as StyledOperationalPointType]
    );

    const lastElement = operationalPoints[operationalPoints.length - 1];
    if (result[result.length - 1] !== lastElement) {
      result.push(lastElement);
    }

    const secondLastIndex = result.length - 2;
    if (secondLastIndex >= 0) {
      const secondLastElement = result[secondLastIndex];
      const lastDiff = positionMmToKm(lastElement.position - secondLastElement.position);
      if (lastDiff * 8 * zoom < BASE_OP_HEIGHT) {
        result.splice(secondLastIndex, 1);
      }
    }
    result.shift();
    return result;
  } else {
    return operationalPoints as StyledOperationalPointType[];
  }
};

export const operationalPointsHeight = (
  operationalPoints: StyledOperationalPointType[],
  zoom: number,
  isProportionnal: boolean
) => {
  return operationalPoints.map((op, index) => {
    const nextOp = operationalPoints[index + 1];
    if (!nextOp) {
      op.styles = { height: `${BASE_OP_HEIGHT}px` };
      return op;
    }
    if (isProportionnal) {
      op.styles = {
        height: `${positionMmToKm(nextOp.position - op.position) * zoom * 8}px`,
      };
      return op;
    } else {
      op.styles = { height: `${BASE_OP_HEIGHT * zoom}px` };
      return op;
    }
  });
};

export const getOperationalPointsWithPosition = (
  operationalPoints: StyledOperationalPointType[]
): OperationalPoint[] => {
  return operationalPoints.map((point) => ({
    id: point.id,
    label: point.id,
    position: point.position,
    importanceLevel: 1,
  }));
};

export const getScales = (ops: OperationalPoint[], isProportionnal: boolean, zoomY: number) => {
  const scales = ops.slice(0, -1).map((point, i) => {
    return {
      from: point.position,
      to: ops[i + 1].position,
      ...(!isProportionnal
        ? { size: BASE_OP_HEIGHT * zoomY }
        : { coefficient: ((1000 / BASE_KM_HEIGHT) * 1000) / zoomY }),
    };
  });
  return scales;
};
