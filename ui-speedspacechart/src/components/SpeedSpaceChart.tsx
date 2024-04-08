import React, { useState } from 'react';

import CurveLayer from './layers/CurveLayer';
import FrontInteractivityLayer from './layers/FrontInteractivityLayer';
import { type ConsolidatedPositionSpeedTime, OsrdSimulationState } from '../types/simulationTypes';
import type { Store } from '../types/chartTypes';
import AxisLayerX from './layers/AxisLayerX';
import AxisLayerY from './layers/AxisLayerY';

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  data: OsrdSimulationState;
};

export const SpeedSpaceChart = ({ width, height, data }: SpeedSpaceChartProps) => {
  const [store, setStore] = useState<Store>({
    speed: data.consolidatedSimulation[0].speed as ConsolidatedPositionSpeedTime[],
    ratio: 1,
    leftOffset: 0,
  });

  return (
    <div className="bg-white" style={{ width: `${width}px`, height: `${height}px` }} tabIndex={0}>
      <CurveLayer width={width - 60} height={height - 35} store={store} />
      <AxisLayerY width={width} height={height} store={store} />
      <AxisLayerX width={width} height={height} store={store} />
      <FrontInteractivityLayer
        width={width - 60}
        height={height - 35}
        store={store}
        setStore={setStore}
      />
    </div>
  );
};
