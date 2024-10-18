import type {
  OperationalPointType,
  ProjectPathTrainResult,
  StyledOperationalPointType,
} from '@osrd-project/ui-manchette/dist/types';
import type {
  OperationalPoint,
  SpaceTimeChartProps,
} from '@osrd-project/ui-spacetimechart/dist/lib/types';

import { BASE_OP_HEIGHT, MAX_TIME_WINDOW, MAX_ZOOM_X, MIN_ZOOM_X } from './consts';
import { calcTotalDistance, getHeightWithoutLastWaypoint, msToS } from './utils';
export type OperationalPointsOptions = { isProportional: boolean; yZoom: number; height: number };

export const calcOperationalPointsToDisplay = (
  operationalPoints: OperationalPointType[],
  { height, isProportional, yZoom }: OperationalPointsOptions
): StyledOperationalPointType[] => {
  if (!isProportional || operationalPoints.length === 0) {
    // For non-proportional display, we always display all the operational points:
    return operationalPoints.map((op) => ({ ...op, display: true }));
  }

  // For proportional display, we only display points that do not overlap with
  // the last displayed point:
  const result: StyledOperationalPointType[] = [{ ...operationalPoints[0], display: true }];
  const totalDistance = calcTotalDistance(operationalPoints);
  const heightWithoutFinalOp = getHeightWithoutLastWaypoint(height);
  let lastDisplayedOP = result[0];

  // We iterate through all points, and only add them if they don't collide
  // with the last visible point:
  for (let i = 1; i < operationalPoints.length; i++) {
    const op = operationalPoints[i];
    const diff = op.position - lastDisplayedOP.position;
    const display = (diff / totalDistance) * heightWithoutFinalOp * yZoom >= BASE_OP_HEIGHT;

    if (display) {
      result.push({ ...op, display });
      lastDisplayedOP = op;
    }
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
};

export const calcOperationalPointsHeight = (
  operationalPoints: StyledOperationalPointType[],
  { height, isProportional, yZoom }: OperationalPointsOptions
) => {
  if (operationalPoints.length < 2) return [];
  const totalDistance = calcTotalDistance(operationalPoints);
  const heightWithoutFinalOp = getHeightWithoutLastWaypoint(height);

  return operationalPoints.map((op, index) => {
    const nextOp = operationalPoints.at(index + 1);
    if (!nextOp) {
      return { ...op, styles: { height: `${BASE_OP_HEIGHT}px` } };
    }
    if (isProportional) {
      return {
        ...op,
        styles: {
          height: `${((nextOp.position - op.position) / totalDistance) * heightWithoutFinalOp * yZoom}px`,
        },
      };
    } else {
      return { ...op, styles: { height: `${BASE_OP_HEIGHT * yZoom}px` } };
    }
  });
};

export const computeTimeWindow = (trains: ProjectPathTrainResult[]) => {
  const { minTime, maxTime } = trains.reduce(
    (times, train) => {
      if (train.space_time_curves.length === 0) return times;

      const lastCurve = train.space_time_curves.at(-1);
      if (!lastCurve || lastCurve.times.length < 2) return times;

      const firstPoint = Number(new Date(train.departure_time));
      const lastPoint = Number(new Date(train.departure_time)) + lastCurve.times.at(-1)!;
      return {
        minTime: times.minTime === -1 || times.minTime > firstPoint ? firstPoint : times.minTime,
        maxTime: times.maxTime === -1 || times.maxTime < lastPoint ? lastPoint : times.maxTime,
      };
    },
    { minTime: -1, maxTime: -1 }
  );

  const timeWindow = msToS(maxTime - minTime);
  return timeWindow > MAX_TIME_WINDOW ? MAX_TIME_WINDOW : timeWindow;
};

export const getOperationalPointsWithPosition = (
  operationalPoints: StyledOperationalPointType[]
): OperationalPoint[] =>
  operationalPoints.map((point) => ({
    id: point.id,
    label: point.id,
    position: point.position,
    importanceLevel: 1,
  }));

export const getScales = (
  ops: OperationalPoint[],
  { height, isProportional, yZoom }: OperationalPointsOptions
) => {
  if (ops.length < 2) return [];

  if (!isProportional) {
    return ops.slice(0, -1).map((from, index) => {
      const to = ops[index + 1];

      return {
        from: from.position,
        to: to.position,
        size: BASE_OP_HEIGHT * yZoom,
      };
    });
  }

  const from = ops.at(0)!.position;
  const to = ops.at(-1)!.position;

  const totalDistance = calcTotalDistance(ops);
  const heightWithoutFinalOp = getHeightWithoutLastWaypoint(height);

  const scaleCoeff = isProportional
    ? { coefficient: totalDistance / heightWithoutFinalOp / yZoom }
    : { size: BASE_OP_HEIGHT * (ops.length - 1) * yZoom };

  return [
    {
      from,
      to,
      ...scaleCoeff,
    },
  ];
};

/** Zoom on X axis and center on the mouse position */
export const zoomX = (
  currentXZoom: number,
  currentXOffset: number,
  { delta, position: { x } }: Parameters<NonNullable<SpaceTimeChartProps['onZoom']>>[0]
) => {
  const xZoom = Math.min(Math.max(currentXZoom * (1 + delta / 10), MIN_ZOOM_X), MAX_ZOOM_X);
  return {
    xZoom,
    // Adjust zoom level relatively to the input delta value:
    // These lines are here to center the zoom on the mouse position:
    xOffset: x - ((x - currentXOffset) / currentXZoom) * xZoom,
  };
};
