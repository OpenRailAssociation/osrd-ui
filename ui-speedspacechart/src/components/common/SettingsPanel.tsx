import React, { useEffect, useState } from 'react';

import { Checkbox } from '@osrd-project/ui-core';
import { X } from '@osrd-project/ui-icons';

import type { Store } from '../../types/chartTypes';
import { DETAILS_BOX_SELECTION, LAYERS_SELECTION } from '../const';
import type { SpeedSpaceChartProps } from '../SpeedSpaceChart';
import { isLayerActive, getAdaptiveHeight } from '../utils';

const SETTINGS_PANEL_BASE_HEIGHT = 442;
const SPEEDSPACECHART_BASE_HEIGHT = 521.5;

type SettingsPanelProps = {
  globalHeight: number;
  color: string;
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  setIsMouseHoveringSettingsPanel: React.Dispatch<React.SetStateAction<boolean>>;
  translations?: SpeedSpaceChartProps['translations'];
};

const SettingsPanel = ({
  globalHeight,
  color,
  store,
  setStore,
  setIsMouseHoveringSettingsPanel,
  translations,
}: SettingsPanelProps) => {
  const [height, setHeight] = useState(`${SETTINGS_PANEL_BASE_HEIGHT}px`);
  const closeSettingsPanel = () => {
    setIsMouseHoveringSettingsPanel(false);
    setStore((prev) => ({
      ...prev,
      isSettingsPanelOpened: false,
    }));
  };

  useEffect(() => {
    const linearLayersHeight = getAdaptiveHeight(0, store.layersDisplay);

    if (globalHeight < SPEEDSPACECHART_BASE_HEIGHT + linearLayersHeight) {
      setHeight(
        `${globalHeight - linearLayersHeight - (SPEEDSPACECHART_BASE_HEIGHT - SETTINGS_PANEL_BASE_HEIGHT)}px`
      );
    }
  }, [globalHeight, store.layersDisplay]);

  return (
    <div
      id="settings-panel"
      style={{ background: `rgba(${color.substring(4, color.length - 1)}, 0.4)`, height }}
      className="font-sans"
      onMouseEnter={() => setIsMouseHoveringSettingsPanel(true)}
      onMouseLeave={() => setIsMouseHoveringSettingsPanel(false)}
    >
      <div className="settings-panel-section">
        <div className="settings-panel-section-title">
          <span>{translations?.layersDisplay.context || 'Context'}</span>
        </div>
        {LAYERS_SELECTION.map((selection) => (
          <div key={selection} className="selection">
            <Checkbox
              label={translations?.layersDisplay[selection] || selection}
              checked={store.layersDisplay[selection]}
              disabled={!isLayerActive(store, selection)}
              onChange={() => {
                setStore((prev) => ({
                  ...prev,
                  layersDisplay: {
                    ...prev.layersDisplay,
                    [selection]: !prev.layersDisplay[selection],
                  },
                }));
              }}
            />
          </div>
        ))}
      </div>
      <div className="settings-panel-section right">
        <div className="settings-panel-section-title">
          <span>{translations?.detailsBoxDisplay.reticleInfos || 'Reticle infos'}</span>
        </div>
        {DETAILS_BOX_SELECTION.map((selection) => (
          <div key={selection} className="selection">
            <Checkbox
              label={translations?.detailsBoxDisplay[selection] || selection}
              checked={store.detailsBoxDisplay[selection]}
              onChange={() => {
                setStore((prev) => ({
                  ...prev,
                  detailsBoxDisplay: {
                    ...prev.detailsBoxDisplay,
                    [selection]: !prev.detailsBoxDisplay[selection],
                  },
                }));
              }}
            />
          </div>
        ))}
      </div>
      <button id="close-settings-panel" onClick={() => closeSettingsPanel()}>
        <span>
          <X />
        </span>
      </button>
    </div>
  );
};

export default SettingsPanel;
