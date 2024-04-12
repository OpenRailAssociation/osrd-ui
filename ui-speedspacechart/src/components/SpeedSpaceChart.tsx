import CurveLayer from "./layers/CurveLayer";
import FrontInteractivityLayer from "./layers/FrontInteractivityLayer";
import {
  type ConsolidatedPositionSpeedTime,
  OsrdSimulationState,
} from "../types/simulationTypes";
import { useState } from "react";
import type { Store } from "../types/chartTypes";
import AxisLayerX from "./layers/AxisLayerX";
import AxisLayerY from "./layers/AxisLayerY";
import TickLayerX from "./layers/TickLayerX";
import TickLayerY from "./layers/TickLayerY";
import MajorGridY from "./layers/MajorGridY";

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  data: OsrdSimulationState;
};

const SpeedSpaceChart = ({ width, height, data }: SpeedSpaceChartProps) => {
  const [store, setStore] = useState<Store>({
    speed: data.consolidatedSimulation[0]
      .speed as ConsolidatedPositionSpeedTime[],
    stops: data.simulation.present.trains[0].base.stops,
    ratio: 1,
    leftOffset: 0,
  });

  return (
    <div
      className="bg-white"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "rgb(247, 246, 238)",
      }}
      tabIndex={0}>
      <CurveLayer width={width - 60} height={height - 80} store={store} />
      <AxisLayerY width={width} height={height} store={store} />
      <MajorGridY width={width} height={height} store={store} />
      <AxisLayerX width={width} height={height} store={store} />
      <TickLayerY width={width} height={height} store={store} />
      <TickLayerX width={width} height={height} store={store} />
      <FrontInteractivityLayer
        width={width - 60}
        height={height - 80}
        store={store}
        setStore={setStore}
      />
    </div>
  );
};

export default SpeedSpaceChart;
