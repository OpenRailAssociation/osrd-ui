import { ConsolidatedPositionSpeedTime } from "../types/simulationTypes";

/**
 * Given a list of speed data, return the minSpeed, maxSpeed and speedRange
 * @param speed
 * @returns { minSpeed: number, maxSpeed: number, speedRange: number}
 */
export const speedRangeValues = (speed: ConsolidatedPositionSpeedTime[]) => {
  const minSpeed = Math.min(...speed.map((data) => data.speed));
  const maxSpeed = Math.max(...speed.map((data) => data.speed));
  const speedRange = maxSpeed - minSpeed;
  return { minSpeed, maxSpeed, speedRange };
};
