import type { InteractiveWaypoint, Waypoint } from '@osrd-project/ui-manchette/dist/types';
import type { OperationalPoint } from '@osrd-project/ui-spacetimechart/dist/lib/types';
import { clamp } from 'lodash';

import {
  BASE_WAYPOINT_HEIGHT,
  MAX_ZOOM_MS_PER_PX,
  MAX_ZOOM_X,
  MIN_ZOOM_MS_PER_PX,
  MIN_ZOOM_X,
} from './consts';
import { calcTotalDistance, getHeightWithoutLastWaypoint } from './utils';

type WaypointsOptions = { isProportional: boolean; yZoom: number; height: number };

type VisibilityFilterOptions<T> = {
  elements: T[];
  getPosition: (element: T) => number;
  getWeight: (element: T) => number | undefined;
  minSpace: number;
};

export const filterVisibleElements = <T>({
  elements,
  getPosition,
  getWeight,
  minSpace,
}: VisibilityFilterOptions<T>): T[] => {
  const firstElement = elements.at(0);
  const lastElement = elements.at(-1);
  if (!firstElement || !lastElement) return elements;

  const sortedElements = [...elements].sort((a, b) => (getWeight(b) ?? 0) - (getWeight(a) ?? 0));
  const displayedElements: { element: T; position: number }[] = [
    { element: firstElement, position: getPosition(firstElement) },
    { element: lastElement, position: getPosition(lastElement) },
  ];

  for (const element of sortedElements) {
    const position = getPosition(element);

    const hasSpace = !displayedElements.some(
      (displayed) => Math.abs(position - displayed.position) < minSpace
    );

    if (hasSpace) {
      displayedElements.push({ element, position });
    }
  }

  return displayedElements
    .sort((a, b) => getPosition(a.element) - getPosition(b.element))
    .map(({ element }) => element);
};

export const getDisplayedWaypoints = (
  waypoints: Waypoint[],
  { height, isProportional, yZoom }: WaypointsOptions
): InteractiveWaypoint[] => {
  if (!isProportional || waypoints.length === 0) {
    return waypoints.map((waypoint) => ({ ...waypoint, display: true }));
  }

  const totalDistance = calcTotalDistance(waypoints);
  const heightWithoutFinalWaypoint = getHeightWithoutLastWaypoint(height);
  const minSpace = BASE_WAYPOINT_HEIGHT / yZoom;

  const displayedWaypoints = filterVisibleElements({
    elements: waypoints,
    getPosition: (waypoint) => (waypoint.position / totalDistance) * heightWithoutFinalWaypoint,
    getWeight: (waypoint) => waypoint.weight,
    minSpace,
  });

  return displayedWaypoints.map((waypoint) => ({ ...waypoint, display: true }));
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
