import type { ConsolidatedPositionSpeedTime } from "./simulationTypes";

export type Store = {
  speed: ConsolidatedPositionSpeedTime[];
  ratio: number;
  leftOffset: number;
};
