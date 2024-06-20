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
import { getGraphOffsets, getAdaptiveHeight, getLinearLayerMarginTop } from './utils';
import ElectricalProfileLayer from './layers/ElectricalProfileLayer';
import PowerRestrictionsLayer from './layers/PowerRestrictionsLayer';
import SettingsPanel from './common/SettingsPanel';
import InteractionButtons from './common/InteractionButtons';
import { LINEAR_LAYERS_HEIGHTS } from './const';

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  backgroundColor: string;
  data: OsrdSimulationState;
  translations?: {
    detailsBoxDisplay: {
      reticleInfos: string;
      energySource: string;
      tractionStatus: string;
      declivities: string;
      electricalProfiles: string;
      powerRestrictions: string;
    };
    layersDisplay: {
      context: string;
      steps: string;
      declivities: string;
      speedLimits: string;
      temporarySpeedLimits: string;
      electricalProfiles: string;
      powerRestrictions: string;
      speedLimitTags: string;
    };
  };
};

const SpeedSpaceChart = ({
  width,
  height,
  backgroundColor,
  data,
  translations,
}: SpeedSpaceChartProps) => {
  const [store, setStore] = useState<Store>({
    speed: [],
    stops: [],
    electrification: [],
    powerRestrictions: undefined,
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
      electricalProfiles: false,
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

  const openSettingsPanel = () => {
    setStore((prev) => ({
      ...prev,
      isSettingsPanelOpened: true,
    }));
  };

  useEffect(() => {
    const storeData = {
      speed: (data.consolidatedSimulation[0].speed as ConsolidatedPositionSpeedTime[]) || [],
      stops: data.simulation.present.trains[0].base.stops || [],
      electrification: data.simulation.present.trains[0].electrification_ranges || [],
      slopes: data.simulation.present.trains[0].slopes || [],
      electricalProfiles: data.electricalProfiles,
      powerRestrictions: data.powerRestrictions,
    };

    const { speed, stops, electrification, slopes } = storeData;

    if (speed && stops && electrification && slopes) {
      setStore((prev) => ({
        ...prev,
        ...storeData,
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
      <div className="flex justify-end absolute base-margin-top" style={{ width: width }}>
        <InteractionButtons reset={reset} openSettingsPanel={openSettingsPanel} store={store} />
      </div>
      {store.isSettingsPanelOpened && (
        <div className="flex justify-end absolute ml-2 base-margin-top" style={{ width: width }}>
          <SettingsPanel
            color={backgroundColor}
            store={store}
            setStore={setStore}
            translations={translations}
          />
        </div>
      )}
      <CurveLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <AxisLayerY width={width} height={height} store={store} />
      <MajorGridY width={width} height={height} store={store} />
      <AxisLayerX width={width} height={height} store={store} />
      {store.layersDisplay.steps && (
        <>
          <StepLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
          <StepNamesLayer
            key={stop.name}
            width={WIDTH_OFFSET}
            height={HEIGHT_OFFSET}
            store={store}
          />
        </>
      )}
      <TickLayerY width={width} height={height} store={store} />
      {store.layersDisplay.electricalProfiles && (
        <ElectricalProfileLayer
          width={width}
          height={height + LINEAR_LAYERS_HEIGHTS.ELECTRICAL_PROFILES_HEIGHT}
          store={store}
        />
      )}
      {store.layersDisplay.powerRestrictions && (
        <PowerRestrictionsLayer
          width={width}
          marginTop={getLinearLayerMarginTop(height, store.layersDisplay)}
          store={store}
        />
      )}
      <TickLayerX width={width} height={dynamicHeight} store={store} />
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
