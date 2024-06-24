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
import { getGraphOffsets, getAdaptiveHeight } from './utils';
import ElectricalProfileLayer from './layers/ElectricalProfileLayer';

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  backgroundColor: string;
  data: OsrdSimulationState;
};

const SpeedSpaceChart = ({ width, height, backgroundColor, data }: SpeedSpaceChartProps) => {
  const [store, setStore] = useState<Store>({
    speed: [],
    stops: [],
    electrification: [],
    slopes: [],
    electricalProfiles: undefined,
    ratioX: 1,
    leftOffset: 0,
    cursor: {
      x: null,
      y: null,
    },
    detailsBoxDisplay: {
      energySource: true,
      tractionStatus: true,
      declivities: true,
      electricalProfiles: true,
      powerRestrictions: true,
    },
    layersDisplay: {
      steps: true,
      declivities: false,
      speedLimits: false,
      temporarySpeedLimits: false,
      electricalProfiles: true,
      powerRestrictions: false,
      speedLimitTags: false,
    },
    isSettingsPanelOpened: false,
  });

  const { WIDTH_OFFSET, HEIGHT_OFFSET } = getGraphOffsets(width, height);
  const dynamicHeight = getAdaptiveHeight(height, store.layersDisplay);
  const dynamicHeightOffset = getAdaptiveHeight(HEIGHT_OFFSET, store.layersDisplay);

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
      electricalProfiles: data.electricalProfiles,
    };

    const { speed, stops, electrification, slopes, electricalProfiles } = storeData;

    if (speed && stops && electrification && slopes) {
      setStore((prev) => ({
        ...prev,
        speed: speed,
        stops: stops,
        electrification: electrification,
        slopes: slopes,
        electricalProfiles: electricalProfiles,
      }));
    }
  }, [data]);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${dynamicHeight}px`,
        backgroundColor: `${backgroundColor}`,
      }}
      tabIndex={0}
    >
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
      <TickLayerX width={width} height={dynamicHeight} store={store} />
      {store.layersDisplay.electricalProfiles && (
        <ElectricalProfileLayer width={width} height={height + 56} store={store} />
      )}
      <ReticleLayer
        width={width}
        height={dynamicHeight}
        heightOffset={dynamicHeightOffset}
        store={store}
        showDetailsBox={showDetailsBox}
        setShowDetailsBox={setShowDetailsBox}
      />
      <FrontInteractivityLayer
        width={WIDTH_OFFSET}
        height={dynamicHeightOffset}
        store={store}
        setStore={setStore}
        setShowDetailsBox={setShowDetailsBox}
      />
    </div>
  );
};

export default SpeedSpaceChart;
