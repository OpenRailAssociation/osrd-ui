import type { Store } from '../types/chartTypes';

type SpeedRangeValues = {
  minSpeed: number;
  maxSpeed: number;
  speedRange: number;
};

type MaxPositionValues = {
  maxPosition: number;
  RoundMaxPosition: number;
  intermediateTicksPosition: number;
};

export const getGraphOffsets = (width: number, height: number) => {
  const WIDTH_OFFSET = width - 60;
  const HEIGHT_OFFSET = height - 80;
  return { WIDTH_OFFSET, HEIGHT_OFFSET };
};

/**
 * /**
 * Given a store including a list of speed data, return the minSpeed, maxSpeed and speedRange
 * @param store
 */
export const speedRangeValues = (store: Store): SpeedRangeValues => {
  const speed = store.speed;
  const minSpeed = Math.min(...speed.map((data) => data.speed));
  const maxSpeed = Math.max(...speed.map((data) => data.speed));
  const speedRange = maxSpeed - minSpeed;
  return { minSpeed, maxSpeed, speedRange };
};

/**
 * given a  store including a list of speed data and a ratio value, return the max position, the rounded max position and the intermediate ticks position
 * @param store
 */
export const maxPositionValues = (store: Store): MaxPositionValues => {
  if (store.speed.length === 0) {
    return { maxPosition: 0, RoundMaxPosition: 0, intermediateTicksPosition: 0 };
  }
  const maxPosition = store.speed[store.speed.length - 1].position;
  const RoundMaxPosition = Math.floor(maxPosition / (Math.ceil(store.ratioX) * 20));
  const intermediateTicksPosition = Math.floor(maxPosition / (Math.ceil(store.ratioX) * 40));

  return { maxPosition, RoundMaxPosition, intermediateTicksPosition };
};

export const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
};
