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
import TickLayerYRight from './layers/TickLayerYRight';
import DeclivityLayer from './layers/DeclivityLayer';
import { MARGINS } from './const';

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

  const { WIDTH_OFFSET, HEIGHT_OFFSET } = getGraphOffsets(
    width,
    height,
    store.layersDisplay.declivities
  );
  const dynamicHeight = getAdaptiveHeight(height, store.layersDisplay);
  const dynamicHeightOffset = getAdaptiveHeight(HEIGHT_OFFSET, store.layersDisplay);
  const { OFFSET_RIGHT_AXIS } = MARGINS;
  const adjustedWidthRightAxis = store.layersDisplay.declivities
    ? width - OFFSET_RIGHT_AXIS
    : width;

  const [showDetailsBox, setShowDetailsBox] = useState(false);
  const [isMouseHoveringSettingsPanel, setIsMouseHoveringSettingsPanel] = useState(false);

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
      <div
        className="flex justify-end absolute base-margin-top"
        style={{ width: adjustedWidthRightAxis }}
      >
        <InteractionButtons reset={reset} openSettingsPanel={openSettingsPanel} store={store} />
      </div>
      {store.isSettingsPanelOpened && (
        <div
          className="flex justify-end absolute ml-2 base-margin-top"
          style={{ width: adjustedWidthRightAxis }}
        >
          <SettingsPanel
            color={backgroundColor}
            store={store}
            setStore={setStore}
            setIsMouseHoveringSettingsPanel={setIsMouseHoveringSettingsPanel}
            translations={translations}
          />
        </div>
      )}
      {store.layersDisplay.declivities && (
        <DeclivityLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      )}
      <CurveLayer width={WIDTH_OFFSET} height={HEIGHT_OFFSET} store={store} />
      <AxisLayerY width={adjustedWidthRightAxis} height={height} store={store} />
      <MajorGridY width={adjustedWidthRightAxis} height={height} store={store} />
      <AxisLayerX width={adjustedWidthRightAxis} height={height} store={store} />
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
          width={adjustedWidthRightAxis}
          height={height + LINEAR_LAYERS_HEIGHTS.ELECTRICAL_PROFILES_HEIGHT}
          store={store}
        />
      )}
      {store.layersDisplay.powerRestrictions && (
        <PowerRestrictionsLayer
          width={adjustedWidthRightAxis}
          marginTop={getLinearLayerMarginTop(height, store.layersDisplay)}
          store={store}
        />
      )}
      <TickLayerX width={adjustedWidthRightAxis} height={dynamicHeight} store={store} />

      {store.layersDisplay.declivities && (
        <TickLayerYRight width={width} height={height} store={store} />
      )}
      {!isMouseHoveringSettingsPanel && (
        <ReticleLayer
          width={adjustedWidthRightAxis}
          height={dynamicHeight}
          heightOffset={dynamicHeightOffset}
          store={store}
          showDetailsBox={showDetailsBox}
          setShowDetailsBox={setShowDetailsBox}
        />
      )}
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
