import type { Store } from "../types/chartTypes";

type SpeedRangeValues = {
  minSpeed: number;
  maxSpeed: number;
  speedRange: number;
};

type MaxPositionValues = {
  maxPosition: number;
  RoundMaxPosition: number;
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
 * given a  store including a list of speed data and a ratio value, return the max position and the rounded max position
 * @param store
 */
export const maxPositionValues = (store: Store): MaxPositionValues => {
  const maxPosition = store.speed[store.speed.length - 1].position;
  const RoundMaxPosition = Math.floor(
    maxPosition / (Math.ceil(store.ratio) * 10)
  );

  return { maxPosition, RoundMaxPosition };
};

export const clearCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
};
