import CurveLayer from "./layers/CurveLayer";
import FrontInteractivityLayer from "./layers/FrontInteractivityLayer";
import GridLayer from "./layers/GridLayer";
import {
  ConsolidatedPositionSpeedTime,
  OsrdSimulationState,
} from "../types/simulationTypes";

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  sample: OsrdSimulationState;
};

const SpeedSpaceChart = ({ width, height, sample }: SpeedSpaceChartProps) => {
  const speed = sample.consolidatedSimulation[0]
    .speed as ConsolidatedPositionSpeedTime[];

  return (
    <div
      className="bg-white"
      style={{ width: `${width}px`, height: `${height}px` }}>
      <CurveLayer width={width} height={height} speed={speed} />
      <GridLayer width={width} height={height} speed={speed} />
      <FrontInteractivityLayer width={width} height={height} />
    </div>
  );
};

export default SpeedSpaceChart;
