import CurveLayer from './layers/CurveLayer';
import FrontInteractivityLayer from './layers/FrontInteractivityLayer';
import { type ConsolidatedPositionSpeedTime, OsrdSimulationState } from '../types/simulationTypes';
import React, { useEffect, useState } from 'react';
import type { Store } from '../types/chartTypes';
import AxisLayerX from './layers/AxisLayerX';
import AxisLayerY from './layers/AxisLayerY';
import TickLayerX from './layers/TickLayerX';
import TickLayerY from './layers/TickLayerY';
import MajorGridY from './layers/MajorGridY';
import StepLayer from './layers/StepLayer';
import ReticleLayer from './layers/ReticleLayer';
import { resetZoom } from './helpers/layersManager';
import StepNamesLayer from './layers/StepNamesLayer';
import { getGraphOffsets } from './utils';
import { useTranslation } from 'react-i18next';

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  backgroundColor: string;
  data: OsrdSimulationState;
};

const SpeedSpaceChart = ({ width, height, backgroundColor, data }: SpeedSpaceChartProps) => {
  const { t } = useTranslation();
  const [store, setStore] = useState<Store>({
    speed: [],
    stops: [],
    electrification: [],
    slopes: [],
    ratioX: 1,
    leftOffset: 0,
    cursor: {
      x: null,
      y: null,
    },
  });

  const { WIDTH_OFFSET, HEIGHT_OFFSET } = getGraphOffsets(width, height);

  const [showDetailsBox, setShowDetailsBox] = useState(false);

  const reset = () => {
    setStore((prev) => ({
      ...prev,
      ratioX: 1,
      leftOffset: 0,
    }));
    resetZoom();
  };

  useEffect(() => {
    const storeData = {
      speed: (data.consolidatedSimulation[0].speed as ConsolidatedPositionSpeedTime[]) || [],
      stops: data.simulation.present.trains[0].base.stops || [],
      electrification: data.simulation.present.trains[0].electrification_ranges || [],
      slopes: data.simulation.present.trains[0].slopes || [],
    };

    if (storeData.speed && storeData.stops && storeData.electrification && storeData.slopes) {
      setStore((prev) => ({
        ...prev,
        speed: storeData.speed,
        stops: storeData.stops,
        electrification: storeData.electrification,
        slopes: storeData.slopes,
      }));
    }
  }, [data]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
      }}
      tabIndex={0}
    >
      {t('speedSpaceChart.title')}
      <div className="flex justify-end absolute mt-8 ml-2" style={{ width: width }}>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white-100 p-1 mr-6 z-10 rounded-full w-8 h-8"
          onClick={() => reset()}
        >
          &#8617;
        </button>
      </div>
      <CurveLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <AxisLayerY width={width} height={height} store={store} />
      <MajorGridY width={width} height={height} store={store} />
      <AxisLayerX width={width} height={height} store={store} />
      <StepLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <StepNamesLayer key={stop.name} width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <TickLayerY width={width} height={height} store={store} />
      <TickLayerX width={width} height={height} store={store} />
      <ReticleLayer
        width={width}
        height={height}
        store={store}
        showDetailsBox={showDetailsBox}
        setShowDetailsBox={setShowDetailsBox}
      />
      <FrontInteractivityLayer
        width={WIDTH_OFFSET}
        height={HEIGHT_OFFSET}
        store={store}
        setStore={setStore}
        setShowDetailsBox={setShowDetailsBox}
      />
    </div>
  );
};

export default SpeedSpaceChart;
