import type { ConsolidatedPositionSpeedTime, Stop } from "./simulationTypes";

export type Store = {
  speed: ConsolidatedPositionSpeedTime[];
  stops: Stop[];
  ratio: number;
  leftOffset: number;
};
