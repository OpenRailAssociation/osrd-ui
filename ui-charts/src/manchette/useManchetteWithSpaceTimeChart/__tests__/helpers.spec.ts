import { describe, it, expect } from 'vitest';

import { BASE_WAYPOINT_HEIGHT } from '../consts';
import { computeWaypointsToDisplay, getScales } from '../helpers';

// Assuming these types from your code

// Mock data for the tests
const mockedWaypoints = [
  { position: 0, id: 'waypoint-1' },
  { position: 10, id: 'waypoint-2' },
  { position: 20, id: 'waypoint-3' },
];

describe('computeWaypointsToDisplay', () => {
  it('should ensure that a empty array is returned when there is only 1 waypoint', () => {
    const result = computeWaypointsToDisplay([mockedWaypoints[0]], {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result.length).toBe(0);
  });

  it('should display all points for non-proportional display', () => {
    const result = computeWaypointsToDisplay(mockedWaypoints, {
      height: 100,
      isProportional: false,
      yZoom: 1,
    });
    expect(result).toHaveLength(mockedWaypoints.length);
    expect(result[0].styles?.height).toBe(`${BASE_WAYPOINT_HEIGHT}px`);
    expect(result[1].styles?.height).toBe(`${BASE_WAYPOINT_HEIGHT}px`);
  });

  it('should correctly filter waypoints', () => {
    const result = computeWaypointsToDisplay(mockedWaypoints, {
      height: 100,
      isProportional: true,
      yZoom: 1,
    });
    expect(result).toHaveLength(2);
  });

  it('should return correct heights for proportional display', () => {
    const result = computeWaypointsToDisplay(mockedWaypoints, {
      height: 500,
      isProportional: true,
      yZoom: 2,
    });
    expect(result).toHaveLength(mockedWaypoints.length);
    expect(result[0].styles?.height).toBe(`428px`);
    expect(result[1].styles?.height).toBe(`428px`);
    expect(result[2].styles?.height).toBe(`${BASE_WAYPOINT_HEIGHT}px`);
  });

  it('should ensure the last point is always displayed', () => {
    const result = computeWaypointsToDisplay(mockedWaypoints, {
      height: 100,
      isProportional: true,
      yZoom: 1,
    });
    expect(result.some((waypoint) => waypoint.id === 'waypoint-3')).toBe(true);
  });
});

describe('getScales', () => {
  const mockOpsWithPosition = mockedWaypoints.map((waypoint) => ({
    id: waypoint.id,
    label: waypoint.id,
    position: waypoint.position,
    importanceLevel: 1,
  }));

  it('Should ensure that a empty array is return when there is only 1 waypoint', () => {
    const ops = [mockOpsWithPosition[0]];
    const result = getScales(ops, {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result).toHaveLength(0);
  });

  it('should return correct scale coefficients for proportional display', () => {
    const result = getScales(mockOpsWithPosition, {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('coefficient');
    expect(result[0].size).not.toBeDefined();
  });

  it('should return correct size for non-proportional display', () => {
    const result = getScales(mockOpsWithPosition, {
      height: 500,
      isProportional: false,
      yZoom: 1,
    });

    expect(result).toHaveLength(2);
    expect(result[0].size).toBeDefined();
    expect(result[0]).not.toHaveProperty('coefficient');
  });
});
