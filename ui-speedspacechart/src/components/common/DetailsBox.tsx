import React from 'react';
import { MARGINS } from '../const';

type DetailsBoxProps = {
  width: number;
  height: number;
  curveX: number;
  curveY: number;
  marecoSpeedText: string;
  effortText: string;
  electricalProfileText: string;
  previousGradientText: number;
  modeText: string;
};

const DetailsBox = ({
  width,
  height,
  curveX,
  curveY,
  marecoSpeedText,
  effortText,
  electricalProfileText,
  previousGradientText,
  modeText,
}: DetailsBoxProps) => {
  const { MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT } = MARGINS;

  let rightOffset = 0;
  let bottomOffset = 0;

  // find out if the box is going out off the right side of the canvas
  if (curveX + MARGIN_LEFT + 115 > width - MARGIN_RIGHT - 10) {
    rightOffset = 127;
  }
  // find out if the box is going out off the bottom side of the canvas
  if (curveY + MARGIN_TOP + 180 > height - MARGIN_BOTTOM - 10) {
    bottomOffset = 192;
  }

  const boxX = curveX + MARGIN_LEFT + 6 - rightOffset;
  const boxY = curveY + MARGIN_TOP + 6 - bottomOffset;

  return (
    <div
      id="details-box"
      className={`absolute flex flex-col ${curveY ? 'block' : 'hidden'}`}
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
      {(modeText || effortText) && <hr />}
      {modeText && <span id="mode-text">{modeText}</span>}
      {effortText && <span id="effort-text">{effortText}</span>}
      {electricalProfileText && <span id="electrical-profile-text">{electricalProfileText}</span>}
      <span id="power-restriction">--</span>
      <hr />
      <span id="previous-gradient-text">{`${previousGradientText} ‰`}</span>
    </div>
  );
};

export default DetailsBox;
