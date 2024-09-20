import { describe, expect, it, vi } from 'vitest';

import { MARGINS } from '../components/const';
import {
  clearCanvas,
  getAdaptiveHeight,
  getGraphOffsets,
  getLinearLayerMarginTop,
  getLinearLayersDisplayedHeight,
  maxPositionValue,
  positionOnGraphScale,
  maxSpeedValue,
  slopesValues,
  binarySearch,
  positionToPosX,
  interpolate,
  clamp,
  getSnappedStop,
} from '../components/utils';
import type { LayerData, Store } from '../types/chartTypes';

const speeds: LayerData<number>[] = [
  { value: 10, position: { start: 200 } },
  { value: 20, position: { start: 350 } },
  { value: 30, position: { start: 600 } },
];

const store: Store = {
  speeds,
  ecoSpeeds: [],
  stops: [],
  electrifications: [],
  slopes: [],
  powerRestrictions: [],
  electricalProfiles: [],
  speedLimitTags: [],
  ratioX: 1,
  leftOffset: 0,
  cursor: {
    x: null,
    y: null,
  },
  // TODO: Create test for detailsBoxDisplay, linearDisplay and electricalProfiles
  detailsBoxDisplay: {
    energySource: true,
    tractionStatus: true,
    electricalProfiles: true,
    powerRestrictions: true,
    declivities: true,
  },
  layersDisplay: {
    speedLimits: false,
    electricalProfiles: false,
    powerRestrictions: true,
    declivities: false,
    speedLimitTags: false,
    steps: true,
    temporarySpeedLimits: false,
  },
  isSettingsPanelOpened: false,
};

describe('getGraphOffsets', () => {
  const width = 200;
  const height = 150;

  it('should return correct width and height offsets when declivities is true', () => {
    const result = getGraphOffsets(width, height, true);

    expect(result).toEqual({
      WIDTH_OFFSET: 98,
      HEIGHT_OFFSET: 70,
    });
  });

  it('should return correct width and height offsets when declivities is false', () => {
    const result = getGraphOffsets(width, height, false);

    expect(result).toEqual({
      WIDTH_OFFSET: 140,
      HEIGHT_OFFSET: 70,
    });
  });

  it('should return correct width and height offsets when declivities is undefined', () => {
    const result = getGraphOffsets(width, height);

    expect(result).toEqual({
      WIDTH_OFFSET: 140,
      HEIGHT_OFFSET: 70,
    });
  });
});

describe('maxSpeedValue', () => {
  it('should return the correct maxSpeed', () => {
    const maxSpeed = maxSpeedValue(store);
    expect(maxSpeed).toBe(30);
  });
});

describe('maxPositionValue', () => {
  it('should return the correct maxPosition', () => {
    const maxPosition = maxPositionValue(store);
    expect(maxPosition).toBe(600);
  });

  it('should return 0 for maxPosition if speed array is empty', () => {
    const maxPosition = maxPositionValue({
      ...store,
      speeds: [],
    });
    expect(maxPosition).toBe(0);
  });
});

describe('slopesValues', () => {
  it('should return correct minGradient, maxGradient, slopesRange, and maxPosition', () => {
    const storeWithSlopes: Store = {
      ...store,
      slopes: [
        { value: 1, position: { start: 10 } },
        { value: 3, position: { start: 20 } },
        { value: 2, position: { start: 15 } },
        { value: 5, position: { start: 25 } },
      ],
    };
    const result = slopesValues(storeWithSlopes);
    expect(result).toEqual({
      minGradient: 1,
      maxGradient: 5,
      slopesRange: 4,
      maxPosition: 25,
    });
  });
  it('should handle empty slopes array', () => {
    const storeWithoutSlopes: Store = {
      ...store,
      slopes: [],
    };
    const result = slopesValues(storeWithoutSlopes);
    expect(result).toEqual({
      minGradient: Infinity,
      maxGradient: -Infinity,
      slopesRange: -Infinity,
      maxPosition: -Infinity,
    });
  });
});

describe('clearCanvas', () => {
  it('should clear the canvas', () => {
    const fn = () => vi.fn();
    const ctx = {
      clearRect: fn(),
    } as unknown as CanvasRenderingContext2D;
    clearCanvas(ctx, 100, 200);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 100, 200);
  });
});

describe('getAdaptiveHeight', () => {
  it('should return the correct adaptive height with one linear layer', () => {
    const height = 100;
    const layersDisplay = {
      fastestDrive: false,
      speedLimits: false,
      speedAnomalies: false,
      electricalProfiles: true,
      powerRestrictions: false,
      declivities: false,
      speedLimitTags: false,
      signals: false,
      steps: false,
      temporarySpeedLimits: false,
    };
    const adaptiveHeight = getAdaptiveHeight(height, layersDisplay);
    expect(adaptiveHeight).toBe(156);
  });

  it('should return the correct adaptive height with multiple linear layers', () => {
    const height = 100;
    const layersDisplay = {
      fastestDrive: false,
      speedLimits: false,
      speedAnomalies: false,
      electricalProfiles: true,
      powerRestrictions: true,
      declivities: false,
      speedLimitTags: true,
      signals: false,
      steps: false,
      temporarySpeedLimits: false,
    };
    const adaptiveHeight = getAdaptiveHeight(height, layersDisplay);
    expect(adaptiveHeight).toBe(236);
  });

  it('should return the correct adaptive height with one linear layer removed', () => {
    const height = 100;
    const layersDisplay = {
      fastestDrive: false,
      speedLimits: false,
      speedAnomalies: false,
      electricalProfiles: true,
      powerRestrictions: false,
      declivities: false,
      speedLimitTags: false,
      signals: false,
      steps: false,
      temporarySpeedLimits: false,
    };
    const adaptiveHeight = getAdaptiveHeight(height, layersDisplay, false);
    expect(adaptiveHeight).toBe(44);
  });
});

describe('positionOnGraphScale', () => {
  it('should return the correct position on the graph scale', () => {
    const position = 300;
    const maxPosition = 600;
    const width = 1000;
    const ratioX = 1;

    const positionOnScale = positionOnGraphScale(position, maxPosition, width, ratioX, MARGINS);
    expect(positionOnScale).toBe(518);
  });

  it('should return the correct position on the graph scale with ratioX = 2', () => {
    const position = 300;
    const maxPosition = 600;
    const width = 1000;
    const ratioX = 2;

    const positionOnScale = positionOnGraphScale(position, maxPosition, width, ratioX, MARGINS);
    expect(positionOnScale).toBe(980);
  });
});

describe('getLinearLayerMarginTop', () => {
  const height = 100;
  const layersDisplay = {
    speedLimits: false,
    electricalProfiles: false,
    powerRestrictions: false,
    declivities: false,
    speedLimitTags: false,
    steps: false,
    temporarySpeedLimits: false,
  };
  it('should return the height of the chart', () => {
    expect(getLinearLayerMarginTop(height, layersDisplay)).toBe(47.5);
  });
  it('should return the height of the chart if only power restrictions layer is displayed', () => {
    expect(getLinearLayerMarginTop(height, { ...layersDisplay, powerRestrictions: true })).toBe(
      47.5
    );
  });
  it('should return the height of the chart including electrical profiles layers height if both electrical profiles and power restrictions layer are displayed', () => {
    expect(
      getLinearLayerMarginTop(height, {
        ...layersDisplay,
        electricalProfiles: true,
        powerRestrictions: true,
      })
    ).toBe(103.5);
  });
});

describe('getLinearLayersDisplayedHeight', () => {
  let layersDisplay = {
    steps: false,
    declivities: false,
    speedLimits: false,
    temporarySpeedLimits: false,
    electricalProfiles: false,
    powerRestrictions: false,
    speedLimitTags: false,
  };

  it('should return the sum of the heights of the linear layers that are displayed', () => {
    layersDisplay = {
      ...layersDisplay,
      electricalProfiles: true,
      powerRestrictions: true,
      speedLimitTags: true,
    };
    expect(getLinearLayersDisplayedHeight(layersDisplay)).toBe(136);
  });

  it('should return one linear layer height', () => {
    layersDisplay = {
      ...layersDisplay,
      electricalProfiles: true,
      powerRestrictions: false,
      speedLimitTags: false,
    };

    expect(getLinearLayersDisplayedHeight(layersDisplay)).toBe(56);
  });

  it('should return 0 if no linear layers are displayed', () => {
    layersDisplay = {
      ...layersDisplay,
      electricalProfiles: false,
    };

    expect(getLinearLayersDisplayedHeight(layersDisplay)).toBe(0);
  });
});

describe('binarySearch', () => {
  it.each([
    [-200, 0],
    [200, 0],
    [300, 0],
    [350, 1],
    [400, 1],
    [600, 2],
    [900, 2],
  ])('should return the correct index (%i)', (pos, expected) => {
    const cursor = { x: pos, y: 0 };
    const prev = binarySearch(
      speeds,
      cursor.x!,
      (element: LayerData<number>) => element.position.start
    );
    expect(prev).toEqual(expected);
  });
});

describe('interpolate', () => {
  it.each([
    [0, 0, 1, 1, 0.5, 0.5],
    [1, 0, 2, 2, 1.5, 1],
    [0, 0, 0, 4, -42, 0], // x1 === x2 => y1
  ])('should interpolate correctly', (x1, y1, x2, y2, x, yExpected) => {
    const y = interpolate(x1, y1, x2, y2, x);
    expect(y).toEqual(yExpected);
  });
});

describe('positionToPosX', () => {
  it('should return the correct stop position', () => {
    const position = { start: 200 };
    const width = 1000;
    const ratioX = 1;
    const maxPosition = 600;
    const posX = positionToPosX(position.start, maxPosition, width, ratioX);
    expect(posX).toBe(364);
  });
});

describe('clamp', () => {
  it.each([
    [4, 0, 10, 4],
    [0, 0, 10, 0],
    [10, 0, 10, 10],
    [11, 0, 10, 10],
    [-1, 0, 10, 0],
  ])('should clamp correctly', (value, min, max, expected) => {
    expect(clamp(value, min, max)).toEqual(expected);
  });
});

describe('getSnappedStop', () => {
  const width = 200;
  it.each([
    [[], 70, null],
    [[300], 20, null],
    [[300], 100, null],
    [[300], 70, 300],
    [[300], 71, 300],
    [[200, 300], 71, 300],
    [[300, 320], 71, 300],
  ])('should find the correct snapped stop', (stopPositions, cursorX, expectedPos) => {
    const stops = stopPositions.map((pos) => ({
      position: { start: pos },
      value: 'MyTestStop',
    }));
    const storeWithStops: Store = {
      ...store,
      stops,
    };

    const snappedStop = getSnappedStop(cursorX, width, storeWithStops);
    if (expectedPos === null) {
      expect(snappedStop).toBeNull();
    } else {
      expect(snappedStop!.position.start).toEqual(expectedPos);
    }
  });
});

// TODO Test drawLinearLayerBackground
