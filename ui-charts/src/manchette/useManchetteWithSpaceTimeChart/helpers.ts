import { clamp } from 'lodash';

import {
  BASE_WAYPOINT_HEIGHT,
  MAX_ZOOM_MS_PER_PX,
  MAX_ZOOM_X,
  MIN_ZOOM_MS_PER_PX,
  MIN_ZOOM_X,
} from './consts';
import { calcTotalDistance, getHeightWithoutLastWaypoint } from './utils';
import type { InteractiveWaypoint, Waypoint } from '../Manchette';

type WaypointsOptions = { isProportional: boolean; yZoom: number; height: number };

export const filterVisibleElements = (
  elements: Waypoint[],
  totalDistance: number,
  heightWithoutFinalWaypoint: number,
  minSpace: number
): Waypoint[] => {
  const getPosition = (waypoint: Waypoint) =>
    (waypoint.position / totalDistance) * heightWithoutFinalWaypoint;

  const firstElement = elements.at(0);
  const lastElement = elements.at(-1);
  if (!firstElement || !lastElement) return elements;

  const sortedElements = [...elements].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0));
  const displayedElements: Waypoint[] = [firstElement, lastElement];

  for (const element of sortedElements) {
    const hasSpace = !displayedElements.some(
      (displayed) => Math.abs(getPosition(element) - getPosition(displayed)) < minSpace
    );

    if (hasSpace) {
      displayedElements.push(element);
    }
  }

  return displayedElements.sort((a, b) => a.position - b.position);
};

export const isInteractiveWaypoint = (
  item: InteractiveWaypoint | React.ReactNode
): item is InteractiveWaypoint =>
  item != null && typeof item === 'object' && 'id' in item && 'position' in item;

export const computeWaypointsToDisplay = (
  waypoints: Waypoint[],
  { height, isProportional, yZoom }: WaypointsOptions
): InteractiveWaypoint[] => {
  if (waypoints.length < 2) return [];

  const totalDistance = calcTotalDistance(waypoints);
  const heightWithoutFinalWaypoint = getHeightWithoutLastWaypoint(height);

  // display all waypoints in linear mode
  if (!isProportional) {
    return waypoints.map((waypoint, index) => {
      const nextWaypoint = waypoints.at(index + 1);
      return {
        ...waypoint,
        styles: { height: `${BASE_WAYPOINT_HEIGHT * (nextWaypoint ? yZoom : 1)}px` },
      };
    });
  }

  // in proportional mode, hide some waypoints to avoid collisions
  const minSpace = BASE_WAYPOINT_HEIGHT / yZoom;

  const filteredWaypoints = filterVisibleElements(
    waypoints,
    totalDistance,
    heightWithoutFinalWaypoint,
    minSpace
  );

  return filteredWaypoints.map((waypoint, index) => {
    const nextWaypoint = filteredWaypoints.at(index + 1);
    return {
      ...waypoint,
      styles: {
        height: !nextWaypoint
          ? `${BASE_WAYPOINT_HEIGHT}px`
          : `${
              ((nextWaypoint.position - waypoint.position) / totalDistance) *
              heightWithoutFinalWaypoint *
              yZoom
            }px`,
      },
    };
  });
};

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
