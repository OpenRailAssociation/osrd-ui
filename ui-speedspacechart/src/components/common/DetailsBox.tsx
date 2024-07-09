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
  marecoSpeedText: string;
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
  marecoSpeedText,
  effortText,
  electricalModeText,
  electricalProfileText,
  powerRestrictionText,
  previousGradientText,
  modeText,
}: DetailsBoxProps) => {
  const { MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT } = MARGINS;
  const { detailsBoxDisplay } = store;

  let rightOffset = 0;
  let bottomOffset = 0;

  const adaptedOffset = store.isSettingsPanelOpened ? 641 : 115;

  // find out if the box is going out off the right side of the canvas
  if (curveX + MARGIN_LEFT + adaptedOffset > width - MARGIN_RIGHT - 10) rightOffset = 127;
  // find out if the box is going out off the bottom side of the canvas
  if (curveY + MARGIN_TOP + 180 > height - MARGIN_BOTTOM - 10) bottomOffset = 192;

  const boxX = curveX + MARGIN_LEFT + 6 - rightOffset;
  const boxY = curveY + MARGIN_TOP + 6 - bottomOffset;

  return (
    <div
      id="details-box"
      className={cx('absolute flex flex-col', { block: curveY, hidden: !curveY })}
      style={{
        marginTop: boxY,
        marginLeft: boxX,
      }}
    >
      {marecoSpeedText && <span id="details-box-text mareco-speed-text">{marecoSpeedText}</span>}
      <div id="base-speed-text">
        <span>--</span>
        <span>±--</span>
      </div>
      {(detailsBoxDisplay.energySource || detailsBoxDisplay.tractionStatus) &&
        (modeText || effortText) && <hr />}
      {detailsBoxDisplay.energySource && modeText && <span id="mode-text">{modeText}</span>}
      {detailsBoxDisplay.tractionStatus && effortText && <span id="effort-text">{effortText}</span>}
      {electricalModeText && (
        <div id="electrical-mode-text">
          <p>{electricalModeText}</p>
          {detailsBoxDisplay.electricalProfiles && <p>{electricalProfileText}</p>}
        </div>
      )}
      {detailsBoxDisplay.powerRestrictions && (
        <span id="power-restriction">{powerRestrictionText}</span>
      )}
      {detailsBoxDisplay.declivities && (
        <>
          <hr />
          <span id="previous-gradient-text">{`${previousGradientText} ‰`}</span>
        </>
      )}
    </div>
  );
};

export default DetailsBox;
