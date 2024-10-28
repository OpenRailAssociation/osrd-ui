import { describe, it, expect } from 'vitest';

import { BASE_WAYPOINT_HEIGHT, MAX_TIME_WINDOW } from '../consts';
import {
  calcWaypointsToDisplay,
  calcWaypointsHeight,
  computeTimeWindow,
  getWaypointsWithPosition,
  getScales,
} from '../helpers';

// Assuming these types from your code

// Mock data for the tests
const mockedWaypoints = [
  { position: 0, id: 'waypoint-1' },
  { position: 10, id: 'waypoint-2' },
  { position: 20, id: 'waypoint-3' },
];

describe('calcWaypointsToDisplay', () => {
  it('should display all points for non-proportional display', () => {
    const result = calcWaypointsToDisplay(mockedWaypoints, {
      height: 500,
      isProportional: false,
      yZoom: 1,
    });
    expect(result).toHaveLength(mockedWaypoints.length);
    result.forEach((waypoint) => {
      expect(waypoint.display).toBe(true);
    });
  });

  it('should calculate proportional display correctly', () => {
    const result = calcWaypointsToDisplay(mockedWaypoints, {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result).toHaveLength(mockedWaypoints.length);
    expect(result[0].display).toBe(true);
    expect(result[1].display).toBe(true);
  });

  it('should ensure the last point is always displayed', () => {
    const result = calcWaypointsToDisplay(mockedWaypoints, {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result[result.length - 1].display).toBe(true);
  });
});

describe('calcWaypointsHeight', () => {
  const mockStyledWaypoints = mockedWaypoints.map((waypoint) => ({
    ...waypoint,
    styles: {},
    display: true,
  }));
  it('Should ensure that a empty array is return when there is only 1 waypoint', () => {
    const result = calcWaypointsHeight([mockedWaypoints[0]], {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result.length).toBe(0);
  });
  it('should return correct heights for proportional display', () => {
    const result = calcWaypointsHeight(mockStyledWaypoints, {
      height: 500,
      isProportional: true,
      yZoom: 2,
    });
    expect(result).toHaveLength(mockStyledWaypoints.length);
    expect(result[0].styles?.height).toBe(`428px`);
    expect(result[1].styles?.height).toBe(`428px`);
    expect(result[2].styles?.height).toBe(`${BASE_WAYPOINT_HEIGHT}px`);
  });

  it('should return correct heights for non-proportional display', () => {
    const result = calcWaypointsHeight(mockStyledWaypoints, {
      height: 500,
      isProportional: false,
      yZoom: 1,
    });
    expect(result[0].styles?.height).toBe(`${BASE_WAYPOINT_HEIGHT}px`);
    expect(result[1].styles?.height).toBe(`${BASE_WAYPOINT_HEIGHT}px`);
  });
});

// Tests for computeTimeWindow
describe('computeTimeWindow', () => {
  const mockTrains = [
    {
      departureTime: new Date('2023-01-01T00:00:00Z'),
      spaceTimeCurves: [
        {
          times: [0, 10000],
          positions: [],
        },
      ],
      name: '',
      id: 0,
    },
    {
      departureTime: new Date('2023-01-01T01:00:00Z'),
      spaceTimeCurves: [
        {
          times: [0, 20000],
          positions: [],
        },
      ],
      name: '',
      id: 0,
    },
  ];

  it('should calculate the correct time window', () => {
    const timeWindow = computeTimeWindow(mockTrains);
    expect(timeWindow).toBeLessThanOrEqual(MAX_TIME_WINDOW);
  });

  it('should return MAX_TIME_WINDOW if calculated time is too large', () => {
    const mockLongTrains = [
      {
        departureTime: new Date('2023-01-01T00:00:00Z'),
        spaceTimeCurves: [
          {
            times: [0, 100000000],
            positions: [],
          },
        ],
        name: '',
        id: 0,
      },
    ];
    const timeWindow: number = computeTimeWindow(mockLongTrains);
    expect(timeWindow).toBe(MAX_TIME_WINDOW);
  });
});

describe('getWaypointsWithPosition', () => {
  it('should return waypoints with position and label', () => {
    const result = getWaypointsWithPosition(mockedWaypoints);
    expect(result).toHaveLength(mockedWaypoints.length);
    result.forEach((waypoint, index) => {
      expect(waypoint.id).toBe(mockedWaypoints[index].id);
      expect(waypoint.position).toBe(mockedWaypoints[index].position);
    });
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
