import React, { useEffect, useState } from 'react';
import {
  AxisLayerX,
  AxisLayerY,
  CurveLayer,
  DeclivityLayer,
  ElectricalProfileLayer,
  FrontInteractivityLayer,
  MajorGridY,
  PowerRestrictionsLayer,
  ReticleLayer,
  SpeedLimitTagsLayer,
  StepLayer,
  StepNamesLayer,
  TickLayerX,
  TickLayerY,
  TickLayerYRight,
} from './layers/index';
import SettingsPanel from './common/SettingsPanel';
import InteractionButtons from './common/InteractionButtons';
import { resetZoom } from './helpers/layersManager';
import { getGraphOffsets, getAdaptiveHeight, getLinearLayerMarginTop } from './utils';
import { MARGINS } from './const';
import { LINEAR_LAYERS_HEIGHTS } from './const';
import type { Data, Store } from '../types/chartTypes';

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  backgroundColor: string;
  data: Data;
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
    speeds: [],
    ecoSpeeds: [],
    stops: [],
    electrifications: [],
    slopes: [],
    powerRestrictions: undefined,
    electricalProfiles: undefined,
    speedLimitTags: undefined,
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
      speeds: data.speeds || [],
      ecoSpeeds: data.ecoSpeeds || [],
      stops: data.stops || [],
      electrifications: data.electrifications || [],
      slopes: data.slopes || [],
      electricalProfiles: data.electricalProfiles,
      powerRestrictions: data.powerRestrictions,
      speedLimitTags: data.speedLimitTags,
    };

    const { speeds, ecoSpeeds, stops, electrifications, slopes } = storeData;

    if (speeds && ecoSpeeds && stops && electrifications && slopes) {
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
      {store.layersDisplay.speedLimitTags && (
        <SpeedLimitTagsLayer
          width={adjustedWidthRightAxis}
          marginTop={getLinearLayerMarginTop(
            height,
            store.layersDisplay,
            store.layersDisplay.speedLimitTags
          )}
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
