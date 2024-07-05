import { describe, expect, it, vi } from 'vitest';
import {
  getGraphOffsets,
  speedRangeValues,
  maxPositionValues,
  clearCanvas,
  getAdaptiveHeight,
  positionOnGraphScale,
  getLinearLayerMarginTop,
  slopesValues,
} from '../components/utils';
import type { Store } from '../types/chartTypes';
import type { ConsolidatedPositionSpeedTime } from '../types/simulationTypes';
import { MARGINS } from '../components/const';

const time = new Date();

const speed: ConsolidatedPositionSpeedTime[] = [
  { speed: 10, position: 200, time },
  { speed: 20, position: 350, time },
  { speed: 30, position: 600, time },
];

const store: Store = {
  speed,
  stops: [],
  electrification: [],
  slopes: [],
  powerRestrictions: [],
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
  electricalProfiles: {
    boundaries: [],
    values: [],
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

describe('speedRangeValues', () => {
  it('should return the correct minSpeed, maxSpeed and speedRange', () => {
    const { minSpeed, maxSpeed, speedRange } = speedRangeValues(store);
    expect(minSpeed).toBe(10);
    expect(maxSpeed).toBe(30);
    expect(speedRange).toBe(20);
  });
});

describe('maxPositionValues', () => {
  it('should return the correct maxPosition, RoundMaxPosition and intermediateTicksPosition', () => {
    const { maxPosition, RoundMaxPosition, intermediateTicksPosition } = maxPositionValues(store);
    expect(maxPosition).toBe(600);
    expect(RoundMaxPosition).toBe(30);
    expect(intermediateTicksPosition).toBe(15);
  });

  it('should return 0 for maxPosition, RoundMaxPosition and intermediateTicksPosition when speed array is empty', () => {
    const { maxPosition, RoundMaxPosition, intermediateTicksPosition } = maxPositionValues({
      ...store,
      speed: [],
    });
    expect(maxPosition).toBe(0);
    expect(RoundMaxPosition).toBe(0);
    expect(intermediateTicksPosition).toBe(0);
  });
});

describe('slopesValues', () => {
  it('should return correct minGradient, maxGradient, slopesRange, and maxPosition', () => {
    const storeWithSlopes: Store = {
      ...store,
      slopes: [
        { gradient: 1, position: 10 },
        { gradient: 3, position: 20 },
        { gradient: 2, position: 15 },
        { gradient: 5, position: 25 },
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

// TODO Test drawLinearLayerBackground
