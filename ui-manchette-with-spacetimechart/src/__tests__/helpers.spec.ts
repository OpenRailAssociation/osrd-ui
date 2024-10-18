import { describe, it, expect } from 'vitest';

import { BASE_OP_HEIGHT, MAX_TIME_WINDOW } from '../consts';
import {
  calcOperationalPointsToDisplay,
  calcOperationalPointsHeight,
  computeTimeWindow,
  getOperationalPointsWithPosition,
  getScales,
} from '../helpers';

// Assuming these types from your code

// Mock data for the tests
const mockOperationalPoints = [
  { position: 0, id: 'op1' },
  { position: 10, id: 'op2' },
  { position: 20, id: 'op3' },
];

// Tests for calcOperationalPointsToDisplay
describe('calcOperationalPointsToDisplay', () => {
  it('should display all points for non-proportional display', () => {
    const result = calcOperationalPointsToDisplay(mockOperationalPoints, {
      height: 500,
      isProportional: false,
      yZoom: 1,
    });
    expect(result).toHaveLength(mockOperationalPoints.length);
    result.forEach((op) => {
      expect(op.display).toBe(true);
    });
  });

  it('should calculate proportional display correctly', () => {
    const result = calcOperationalPointsToDisplay(mockOperationalPoints, {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result).toHaveLength(mockOperationalPoints.length);
    expect(result[0].display).toBe(true);
    expect(result[1].display).toBe(true);
  });

  it('should ensure the last point is always displayed', () => {
    const result = calcOperationalPointsToDisplay(mockOperationalPoints, {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result[result.length - 1].display).toBe(true);
  });
});

// Tests for calcOperationalPointsHeight
describe('calcOperationalPointsHeight', () => {
  const mockStyledOperationalPoints = mockOperationalPoints.map((op) => ({
    ...op,
    styles: {},
    display: true,
  }));
  it('Should ensure that a empty array is return when there is only 1 operationalPoint', () => {
    const result = calcOperationalPointsHeight([mockOperationalPoints[0]], {
      height: 500,
      isProportional: true,
      yZoom: 1,
    });
    expect(result.length).toBe(0);
  });
  it('should return correct heights for proportional display', () => {
    const result = calcOperationalPointsHeight(mockStyledOperationalPoints, {
      height: 500,
      isProportional: true,
      yZoom: 2,
    });
    expect(result).toHaveLength(mockStyledOperationalPoints.length);
    expect(result[0].styles?.height).toBe(`428px`);
    expect(result[1].styles?.height).toBe(`428px`);
    expect(result[2].styles?.height).toBe(`${BASE_OP_HEIGHT}px`);
  });

  it('should return correct heights for non-proportional display', () => {
    const result = calcOperationalPointsHeight(mockStyledOperationalPoints, {
      height: 500,
      isProportional: false,
      yZoom: 1,
    });
    expect(result[0].styles?.height).toBe(`${BASE_OP_HEIGHT}px`);
    expect(result[1].styles?.height).toBe(`${BASE_OP_HEIGHT}px`);
  });
});

// Tests for computeTimeWindow
describe('computeTimeWindow', () => {
  const mockTrains = [
    {
      departure_time: '2023-01-01T00:00:00Z',
      space_time_curves: [
        {
          times: [0, 10000],
          positions: [],
        },
      ],
      name: '',
      id: 0,
      rolling_stock_length: 0,
    },
    {
      departure_time: '2023-01-01T01:00:00Z',
      space_time_curves: [
        {
          times: [0, 20000],
          positions: [],
        },
      ],
      name: '',
      id: 0,
      rolling_stock_length: 0,
    },
  ];

  it('should calculate the correct time window', () => {
    const timeWindow = computeTimeWindow(mockTrains);
    expect(timeWindow).toBeLessThanOrEqual(MAX_TIME_WINDOW);
  });

  it('should return MAX_TIME_WINDOW if calculated time is too large', () => {
    const mockLongTrains = [
      {
        departure_time: '2023-01-01T00:00:00Z',
        space_time_curves: [
          {
            times: [0, 100000000],
            positions: [],
          },
        ],
        name: '',
        id: 0,
        rolling_stock_length: 0,
      },
    ];
    const timeWindow: number = computeTimeWindow(mockLongTrains);
    expect(timeWindow).toBe(MAX_TIME_WINDOW);
  });
});

// Tests for getOperationalPointsWithPosition
describe('getOperationalPointsWithPosition', () => {
  it('should return operational points with position and label', () => {
    const result = getOperationalPointsWithPosition(mockOperationalPoints);
    expect(result).toHaveLength(mockOperationalPoints.length);
    result.forEach((op, index) => {
      expect(op.id).toBe(mockOperationalPoints[index].id);
      expect(op.position).toBe(mockOperationalPoints[index].position);
    });
  });
});

// Tests for getScales
describe('getScales', () => {
  const mockOpsWithPosition = mockOperationalPoints.map((op) => ({
    id: op.id,
    label: op.id,
    position: op.position,
    importanceLevel: 1,
  }));

  it('Should ensure that a empty array is return when there is only 1 operationalPoint', () => {
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
