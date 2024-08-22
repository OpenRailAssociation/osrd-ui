import type {
  OperationalPoint,
  SpaceTimeChartProps,
} from '@osrd-project/ui-spacetimechart/dist/lib/types';

import {
  BASE_OP_HEIGHT,
  FOOTER_HEIGHT,
  OP_LINE_HEIGHT,
  MAX_TIME_WINDOW,
  MAX_ZOOM_X,
  MIN_ZOOM_X,
} from './consts';
import type {
  OperationalPointType,
  ProjectPathTrainResult,
  StyledOperationalPointType,
} from '../types';
import { getHeightWithoutFooter, msToS } from '../utils';

export const calcOperationalPointsToDisplay = (
  operationalPoints: OperationalPointType[],
  height: number,
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
    const from = operationalPoints.at(0)!.position;
    const to = operationalPoints.at(-1)!.position;
    const totalDistance = to - from;
    const heightWithoutFinalOp = getHeightWithoutFooter(height) - BASE_OP_HEIGHT;
    let lastDisplayedOP = result[0];

    // We iterate through all points, and only add them if they don't collide
    // with the last visible point:
    for (let i = 1, l = operationalPoints.length; i < l; i++) {
      const op = operationalPoints[i];
      const diff = op.position - lastDisplayedOP.position;
      const display = (diff / totalDistance) * heightWithoutFinalOp * zoom >= BASE_OP_HEIGHT;
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
  height: number,
  zoom: number,
  isProportional: boolean
) => {
  if (operationalPoints.length < 2) return [];
  const from = operationalPoints.at(0)!.position;
  const to = operationalPoints.at(-1)!.position;
  const totalDistance = to - from;
  const heightWithoutFinalOp = getHeightWithoutFooter(height) - BASE_OP_HEIGHT;

  return operationalPoints.map((op, index) => {
    const nextOp = operationalPoints.at(index + 1);
    if (!nextOp) {
      return { ...op, styles: { height: `${BASE_OP_HEIGHT}px` } };
    }
    if (isProportional) {
      return {
        ...op,
        styles: {
          height: `${((nextOp.position - op.position) / totalDistance) * heightWithoutFinalOp * zoom}px`,
        },
      };
    } else {
      return { ...op, styles: { height: `${BASE_OP_HEIGHT * zoom}px` } };
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
  height: number,
  isProportional: boolean,
  zoomY: number
) => {
  if (ops.length < 2) return [];
  const from = ops.at(0)!.position;
  const to = ops.at(-1)!.position;

  const totalDistance = to - from;
  const heightWithoutFinalOp = height - FOOTER_HEIGHT - OP_LINE_HEIGHT / 2;

  const scaleCoeff = isProportional
    ? { coefficient: totalDistance / heightWithoutFinalOp / zoomY }
    : { size: BASE_OP_HEIGHT * (ops.length - 1) * zoomY };

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
