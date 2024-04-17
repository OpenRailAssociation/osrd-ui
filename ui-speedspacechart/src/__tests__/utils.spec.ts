import { describe, expect, it, vi } from 'vitest';
import {
  getGraphOffsets,
  speedRangeValues,
  maxPositionValues,
  clearCanvas,
} from '../components/utils';
import type { Store } from '../types/chartTypes';
import type { ConsolidatedPositionSpeedTime } from '../types/simulationTypes';

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
  ratioX: 1,
  leftOffset: 0,
  cursor: {
    x: null,
    y: null,
  },
};

describe('getGraphOffsets', () => {
  it('should return the correct width and height offsets', () => {
    const width = 100;
    const height = 200;
    const { WIDTH_OFFSET, HEIGHT_OFFSET } = getGraphOffsets(width, height);
    expect(WIDTH_OFFSET).toBe(40);
    expect(HEIGHT_OFFSET).toBe(120);
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
