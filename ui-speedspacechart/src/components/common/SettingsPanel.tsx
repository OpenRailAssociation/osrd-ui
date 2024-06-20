import React from 'react';
import type { Store } from '../../types/chartTypes';
import type { SpeedSpaceChartProps } from '../SpeedSpaceChart';
import { DETAILS_BOX_SELECTION, LAYERS_SELECTION } from '../const';
import { X } from '@osrd-project/ui-icons';
import { Checkbox } from '@osrd-project/ui-core';
import { checkLayerData } from '../utils';

type SettingsPanelProps = {
  color: string;
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  translations?: SpeedSpaceChartProps['translations'];
};

const SettingsPanel = ({ color, store, setStore, translations }: SettingsPanelProps) => {
  const closeSettingsPanel = () => {
    setStore((prev) => ({
      ...prev,
      isSettingsPanelOpened: false,
    }));
  };

  return (
    <div
      id="settings-panel"
      style={{ background: `rgba(${color.substring(4, color.length - 1)}, 0.4)` }}
      className="font-sans"
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
              disabled={checkLayerData(store, selection)}
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
