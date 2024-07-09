import type { OperationalPoint } from '@osrd-project/ui-spacetimechart/dist/lib/types';
import type { OperationalPointType, StyledOperationalPointType } from '../types';
import { BASE_KM_HEIGHT, BASE_OP_HEIGHT } from './consts';

export const positionMmToKm = (position: number) => {
  return Math.round((position / 1000000) * 10) / 10;
};

export const calcOperationalPointsToDisplay = (
  operationalPoints: OperationalPointType[],
  isProportional: boolean,
  zoom: number
): StyledOperationalPointType[] => {
  // For proportional display, we only display points that do not overlap with
  // the last displayed point:
  if (isProportional && operationalPoints.length >= 0) {
    // We start with the first operational point:
    const result: StyledOperationalPointType[] = [
      { ...operationalPoints[0], display: true, styles: {} },
    ];
    let lastDisplayedOP = result[0];

    // We iterate through all points, and only add them if they don't collide
    // with the last visible point:
    for (let i = 1, l = operationalPoints.length; i < l; i++) {
      const op = operationalPoints[i];
      const diff = positionMmToKm(op.position - lastDisplayedOP.position);
      const display = diff * 8 * zoom >= BASE_OP_HEIGHT;
      result.push({
        ...op,
        display,
        styles: {},
      });

      if (display) lastDisplayedOP = result[i];
    }

    // In the end, to make sure the last point is visible, if it's not, we swap
    // it with the last visible item:
    const lastItem = result[result.length - 1];
    if (!lastItem.display) {
      const lastVisibleItem = result.findLast((op) => op.display);
      if (lastVisibleItem) {
        lastVisibleItem.display = false;
        lastItem.display = true;
      }
    }

    return result;
  }
  // For non-proportional display, we always display all the operational points:
  else {
    return operationalPoints.map((op) => ({ ...op, styles: {}, display: true }));
  }
};

export const operationalPointsHeight = (
  operationalPoints: StyledOperationalPointType[],
  zoom: number,
  isProportional: boolean
) => {
  return operationalPoints.map((op, index) => {
    const nextOp = operationalPoints[index + 1];
    if (!nextOp) {
      return { ...op, styles: { height: `${BASE_OP_HEIGHT}px` } };
    }
    if (isProportional) {
      return {
        ...op,
        styles: { height: `${positionMmToKm(nextOp.position - op.position) * zoom * 8}px` },
      };
    } else {
      return { ...op, styles: { height: `${BASE_OP_HEIGHT * zoom}px` } };
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

export const getScales = (ops: OperationalPoint[], isProportional: boolean, zoomY: number) => {
  const scales = ops.slice(0, -1).map((point, i) => {
    return {
      from: point.position,
      to: ops[i + 1].position,
      ...(!isProportional
        ? { size: BASE_OP_HEIGHT * zoomY }
        : { coefficient: ((1000 / BASE_KM_HEIGHT) * 1000) / zoomY }),
    };
  });
  return scales;
};
