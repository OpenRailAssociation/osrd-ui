import type {
  InteractiveWaypoint,
  ProjectPathTrainResult,
  Waypoint,
} from '@osrd-project/ui-manchette/dist/types';
import type { OperationalPoint } from '@osrd-project/ui-spacetimechart/dist/lib/types';
import { clamp } from 'lodash';

import {
  BASE_WAYPOINT_HEIGHT,
  MAX_TIME_WINDOW,
  MAX_ZOOM_MS_PER_PX,
  MAX_ZOOM_X,
  MIN_ZOOM_MS_PER_PX,
  MIN_ZOOM_X,
} from './consts';
import { calcTotalDistance, getHeightWithoutLastWaypoint, msToS } from './utils';

type WaypointsOptions = { isProportional: boolean; yZoom: number; height: number };

export const calcWaypointsToDisplay = (
  waypoints: Waypoint[],
  { height, isProportional, yZoom }: WaypointsOptions
): InteractiveWaypoint[] => {
  if (!isProportional || waypoints.length === 0) {
    // For non-proportional display, we always display all the waypoints:
    return waypoints.map((waypoint) => ({ ...waypoint, display: true }));
  }

  // For proportional display, we only display waypoints that do not overlap with
  // the last displayed point:
  const result: InteractiveWaypoint[] = [{ ...waypoints[0], display: true }];
  const totalDistance = calcTotalDistance(waypoints);
  const heightWithoutFinalWaypoint = getHeightWithoutLastWaypoint(height);
  let lastDisplayedWaypoint = result[0];

  // We iterate through all points, and only add them if they don't collide
  // with the last visible point:
  for (let i = 1; i < waypoints.length; i++) {
    const waypoint = waypoints[i];
    const diff = waypoint.position - lastDisplayedWaypoint.position;
    const display =
      (diff / totalDistance) * heightWithoutFinalWaypoint * yZoom >= BASE_WAYPOINT_HEIGHT;

    if (display) {
      result.push({ ...waypoint, display });
      lastDisplayedWaypoint = waypoint;
    }
  }

  // In the end, to make sure the last point is visible, if it's not, we swap
  // it with the last visible item:
  const lastItem = result[result.length - 1];
  if (!lastItem.display) {
    const lastVisibleItem = result.findLast((waypoint) => waypoint.display);
    if (lastVisibleItem) {
      lastVisibleItem.display = false;
      lastItem.display = true;
    }
  }

  return result;
};

export const calcWaypointsHeight = (
  waypoints: InteractiveWaypoint[],
  { height, isProportional, yZoom }: WaypointsOptions
) => {
  if (waypoints.length < 2) return [];
  const totalDistance = calcTotalDistance(waypoints);
  const heightWithoutFinalWaypoint = getHeightWithoutLastWaypoint(height);

  return waypoints.map((waypoint, index) => {
    const nextWaypoint = waypoints.at(index + 1);
    if (!nextWaypoint) {
      return { ...waypoint, styles: { height: `${BASE_WAYPOINT_HEIGHT}px` } };
    }
    if (isProportional) {
      return {
        ...waypoint,
        styles: {
          height: `${
            ((nextWaypoint.position - waypoint.position) / totalDistance) *
            heightWithoutFinalWaypoint *
            yZoom
          }px`,
        },
      };
    } else {
      return { ...waypoint, styles: { height: `${BASE_WAYPOINT_HEIGHT * yZoom}px` } };
    }
  });
};

export const computeTimeWindow = (trains: ProjectPathTrainResult[]) => {
  const { minTime, maxTime } = trains.reduce(
    (times, train) => {
      if (train.spaceTimeCurves.length === 0) return times;

      const lastCurve = train.spaceTimeCurves.at(-1);
      if (!lastCurve || lastCurve.times.length < 2) return times;

      const firstPoint = Number(train.departureTime);
      const lastPoint = Number(train.departureTime) + lastCurve.times.at(-1)!;
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

export const getWaypointsWithPosition = (waypoints: InteractiveWaypoint[]): OperationalPoint[] =>
  waypoints.map((point) => ({
    id: point.id,
    label: point.id,
    position: point.position,
    importanceLevel: 1,
  }));

export const getScales = (
  waypoints: Waypoint[],
  { height, isProportional, yZoom }: WaypointsOptions
) => {
  if (waypoints.length < 2) return [];

  if (!isProportional) {
    return waypoints.slice(0, -1).map((from, index) => {
      const to = waypoints[index + 1];

      return {
        from: from.position,
        to: to.position,
        size: BASE_WAYPOINT_HEIGHT * yZoom,
      };
    });
  }

  const from = waypoints.at(0)!.position;
  const to = waypoints.at(-1)!.position;

  const totalDistance = calcTotalDistance(waypoints);
  const heightWithoutFinalWaypoint = getHeightWithoutLastWaypoint(height);

  const scaleCoeff = isProportional
    ? { coefficient: totalDistance / heightWithoutFinalWaypoint / yZoom }
    : { size: BASE_WAYPOINT_HEIGHT * (waypoints.length - 1) * yZoom };

  return [
    {
      from,
      to,
      ...scaleCoeff,
    },
  ];
};

export const zoomValueToTimeScale = (slider: number) =>
  MIN_ZOOM_MS_PER_PX * Math.pow(MAX_ZOOM_MS_PER_PX / MIN_ZOOM_MS_PER_PX, slider / 100);

export const timeScaleToZoomValue = (timeScale: number) =>
  (100 * Math.log(timeScale / MIN_ZOOM_MS_PER_PX)) /
  Math.log(MAX_ZOOM_MS_PER_PX / MIN_ZOOM_MS_PER_PX);

/** Zoom on X axis and center on the mouse position */
export const zoomX = (
  currentZoom: number,
  currentOffset: number,
  newZoom: number,
  position: number
) => {
  const boundedZoom = clamp(newZoom, MIN_ZOOM_X, MAX_ZOOM_X);
  const oldTimeScale = zoomValueToTimeScale(currentZoom);
  const newTimeScale = zoomValueToTimeScale(boundedZoom);
  const newOffset = position - ((position - currentOffset) * oldTimeScale) / newTimeScale;
  return {
    xZoom: boundedZoom,
    xOffset: newOffset,
  };
};
