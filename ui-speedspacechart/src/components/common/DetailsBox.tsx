import React from 'react';
import { MARGINS } from '../const';
import type { Store } from '../../types/chartTypes';
import cx from 'classnames';

type DetailsBoxProps = {
  width: number;
  height: number;
  store: Store;
  curveX: number;
  curveY: number;
  speedText: string;
  ecoSpeedText: string;
  effortText: string;
  electricalModeText: string;
  electricalProfileText: string;
  powerRestrictionText: string;
  previousGradientText: number;
  modeText: string;
};

const DetailsBox = ({
  width,
  height,
  store,
  curveX,
  curveY,
  speedText,
  ecoSpeedText,
  effortText,
  electricalModeText,
  electricalProfileText,
  powerRestrictionText,
  previousGradientText,
  modeText,
}: DetailsBoxProps) => {
  const { MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT } = MARGINS;
  const { energySource, tractionStatus, declivities, electricalProfiles, powerRestrictions } =
    store.detailsBoxDisplay;

  let rightOffset = 0;
  let bottomOffset = 0;

  const adaptedOffset = store.isSettingsPanelOpened ? 641 : 115;

  // find out if the box is going out off the right side of the canvas
  if (curveX + MARGIN_LEFT + adaptedOffset > width - MARGIN_RIGHT - 10) rightOffset = 127;
  // find out if the box is going out off the bottom side of the canvas
  if (curveY + MARGIN_TOP + 180 > height - MARGIN_BOTTOM - 10) bottomOffset = 192;

  const boxX = curveX + MARGIN_LEFT + 6 - rightOffset;
  const boxY = curveY + MARGIN_TOP + 6 - bottomOffset;

  const speedDifference = Number(speedText) - Number(ecoSpeedText);
  const speedDifferenceText =
    speedDifference < 0 ? speedDifference.toFixed(1) : `-${speedDifference.toFixed(1)}`;

  return (
    <div
      id="details-box"
      className={cx('absolute flex flex-col', { block: curveY, hidden: !curveY })}
      style={{
        marginTop: boxY,
        marginLeft: boxX,
      }}
    >
      {speedText && <span id="details-box-text base-speed-text">{speedText}</span>}
      <div>
        <span id="mareco-speed-text">{ecoSpeedText}</span>
        <span id="speed-difference-text">{speedDifferenceText}</span>
      </div>
      {(energySource || tractionStatus) && (modeText || effortText) && <hr />}
      {energySource && modeText && <span id="mode-text">{modeText}</span>}
      {tractionStatus && effortText && <span id="effort-text">{effortText}</span>}
      {electricalModeText && (
        <div id="electrical-mode-text">
          <span>{electricalModeText}</span>
          {electricalProfiles && <span className="ml-2">{electricalProfileText}</span>}
        </div>
      )}
      {powerRestrictions && <span id="power-restriction">{powerRestrictionText}</span>}
      {declivities && (
        <>
          <hr />
          <span id="previous-gradient-text">{`${previousGradientText} ‰`}</span>
        </>
      )}
    </div>
  );
};

export default DetailsBox;
