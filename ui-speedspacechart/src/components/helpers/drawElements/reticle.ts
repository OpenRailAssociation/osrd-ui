import type { DrawFunctionParams, LayerData } from '../../../types/chartTypes';
import { BLACK, MARGINS } from '../../const';
import {
  clearCanvas,
  binarySearch,
  getAdaptiveHeight,
  maxPositionValue,
  speedRangeValues,
  interpolate,
  positionToPosX,
  getCursorPosition,
  getSnappedStop,
} from '../../utils';

const {
  MARGIN_LEFT,
  MARGIN_RIGHT,
  MARGIN_TOP,
  MARGIN_BOTTOM,
  CURVE_MARGIN_TOP,
  CURVE_MARGIN_SIDES,
} = MARGINS;

const RETICLE_LINE = 12.75;
const SNAPPED_STOP_TEXT_OFFSET = 36;
const CURSOR_HEIGHT = 6;
const SNAPPED_CURSOR_HEIGHT = 24;

export const drawCursor = ({ ctx, width, height, store }: DrawFunctionParams) => {
  clearCanvas(ctx, width, height);

  const {
    cursor,
    layersDisplay,
    ratioX,
    leftOffset,
    speeds,
    ecoSpeeds,
    electrifications,
    slopes,
    electricalProfiles,
    powerRestrictions,
  } = store;

  ctx.strokeStyle = BLACK.hex();
  ctx.lineWidth = 1;
  ctx.font = 'normal 12px IBM Plex Sans';
  ctx.fillStyle = BLACK.hex();
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;

  let speedText = '';
  let ecoSpeedText = '';
  let stopText = '';
  let effortText = 'coasting';
  let electricalModeText = '';
  let electricalProfileText = '';
  let powerRestrictionText = '';
  let previousGradientText = 0;
  let modeText = '';
  let reticleY = 0;

  const { maxSpeed } = speedRangeValues(store);
  const maxPosition = maxPositionValue(store);

  const heightWithoutLayers = getAdaptiveHeight(height, layersDisplay, false);
  const cursorBoxHeight = heightWithoutLayers - MARGIN_BOTTOM - MARGIN_TOP;
  const cursorBoxWidth = width - MARGIN_LEFT - MARGIN_RIGHT;

  const xPositionReference = (ref: number) =>
    ref * ((cursorBoxWidth - CURVE_MARGIN_SIDES) / maxPosition) * ratioX +
    leftOffset +
    CURVE_MARGIN_SIDES / 2;

  // Skip drawing the reticle if the cursor is outside the graph
  if (cursor.x === null || cursor.y === null) {
    return;
  }

  let reticleX = cursor.x + MARGIN_LEFT;

  let cursorPosition = getCursorPosition(cursor.x, width, store);
  if (cursorPosition < 0 || cursorPosition > maxPosition) {
    return;
  }

  // Check if cursor is snapping to stop
  let snapToStop = false;
  if (layersDisplay.steps) {
    const snappedStop = getSnappedStop(cursor.x, width, store);
    if (snappedStop !== null) {
      snapToStop = true;
      cursorPosition = snappedStop.position.start;
      reticleX = positionToPosX(cursorPosition, maxPosition, width, ratioX, leftOffset);
      stopText = snappedStop.value;
    }
  }

  // Get the electrical profile name based on the position of the cursor
  if (electricalProfiles) {
    const electricalProfileValue = electricalProfiles.find(
      ({ position }) =>
        xPositionReference(position.start) <= cursor.x! &&
        xPositionReference(position.end!) >= cursor.x!
    )?.value.electricalProfile;

    if (electricalProfileValue) {
      electricalProfileText = electricalProfileValue;
    }
  }

  // Get the power restriction code based on the position of the cursor
  if (powerRestrictions) {
    const currentPowerRestriction = powerRestrictions.find(
      ({ position }) =>
        cursor.x! >= xPositionReference(position.start) &&
        cursor.x! <= xPositionReference(position.end!)
    );
    powerRestrictionText = currentPowerRestriction?.value.powerRestriction || '';
  }

  const previousElectrification = electrifications.findLast(
    ({ position }) => position.start <= cursorPosition
  );

  const electrificationUsage = previousElectrification?.value;
  if (electrificationUsage) {
    const isElectrified = electrificationUsage.type === 'electrification';
    modeText = isElectrified ? 'electric' : '--';
    electricalModeText = electrificationUsage.voltage!;
  }

  let predecessorSpeedIndex = binarySearch(
    speeds,
    cursorPosition,
    (element: LayerData<number>) => element.position.start
  );
  if (predecessorSpeedIndex === speeds.length - 1) predecessorSpeedIndex--;

  let predecessorEcoSpeedIndex = binarySearch(
    ecoSpeeds,
    cursorPosition,
    (element: LayerData<number>) => element.position.start
  );
  if (predecessorEcoSpeedIndex === ecoSpeeds.length - 1) predecessorEcoSpeedIndex--;

  const prevSpeed = speeds[predecessorSpeedIndex];
  const nextSpeed = speeds[predecessorSpeedIndex + 1];
  const speedValue = interpolate(
    prevSpeed.position.start,
    prevSpeed.value,
    nextSpeed.position.start,
    nextSpeed.value,
    cursorPosition
  );
  speedText = speedValue.toFixed(1);
  const baseReticleY =
    cursorBoxHeight - (speedValue / maxSpeed) * (cursorBoxHeight - CURVE_MARGIN_TOP) + MARGIN_TOP;

  const prevEcoSpeed = ecoSpeeds[predecessorEcoSpeedIndex];
  const nextEcoSpeed = ecoSpeeds[predecessorEcoSpeedIndex + 1];
  const ecoSpeedValue = interpolate(
    prevEcoSpeed.position.start,
    prevEcoSpeed.value,
    nextEcoSpeed.position.start,
    nextEcoSpeed.value,
    cursorPosition
  );
  ecoSpeedText = ecoSpeedValue.toFixed(1);
  if (prevEcoSpeed.value < nextEcoSpeed.value) {
    effortText = 'accelerating';
  } else if (prevEcoSpeed.value > nextEcoSpeed.value) {
    effortText = 'decelerating';
  }

  reticleY =
    cursorBoxHeight -
    (ecoSpeedValue / maxSpeed) * (cursorBoxHeight - CURVE_MARGIN_TOP) +
    MARGIN_TOP;

  previousGradientText = slopes.findLast(({ position }) => position.start <= cursorPosition)!.value;

  // DRAWING

  // Crosshair
  ctx.beginPath();
  ctx.moveTo(reticleX - RETICLE_LINE, reticleY);
  ctx.lineTo(reticleX + RETICLE_LINE, reticleY);
  ctx.moveTo(reticleX, reticleY - RETICLE_LINE);
  ctx.lineTo(reticleX, reticleY + RETICLE_LINE);
  ctx.stroke();

  // V & H lines
  ctx.beginPath();
  ctx.strokeStyle = BLACK.alpha(0.4).hex();
  ctx.lineWidth = 0.5;
  ctx.moveTo(reticleX, baseReticleY);
  ctx.lineTo(reticleX, height - MARGIN_BOTTOM);

  ctx.moveTo(reticleX, reticleY);
  ctx.lineTo(MARGIN_LEFT, reticleY);
  if (Math.abs(baseReticleY - reticleY) > 2) {
    ctx.moveTo(reticleX, baseReticleY);
    ctx.lineTo(MARGIN_LEFT, baseReticleY);
  }
  ctx.stroke();

  // lines along the axis
  // horizontal
  ctx.beginPath();
  ctx.strokeStyle = BLACK.hex();
  ctx.lineWidth = 1;
  ctx.moveTo(MARGIN_LEFT, reticleY);
  ctx.lineTo(MARGIN_LEFT, reticleY);
  ctx.stroke();

  // we need to draw the vertical line along the axis after all the other lines to clear them without this one
  const roundedCursorPosition = Math.round(cursorPosition * 10) / 10;
  const textPosition = roundedCursorPosition.toFixed(1).toString();

  ctx.textAlign = 'center';
  if (snapToStop) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.roundRect(
      reticleX - 0.5,
      height - MARGIN_BOTTOM - SNAPPED_CURSOR_HEIGHT * 0.6,
      1,
      SNAPPED_CURSOR_HEIGHT,
      [1, 1, 1, 1]
    );
    ctx.fill();
    ctx.stroke();
    ctx.fillText(textPosition, reticleX, height - MARGIN_BOTTOM + CURVE_MARGIN_SIDES * 1.33);
  } else {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(reticleX, height - MARGIN_BOTTOM);
    ctx.lineTo(reticleX, height - MARGIN_BOTTOM + CURSOR_HEIGHT);
    ctx.stroke();
    ctx.fillText(textPosition, reticleX, height - MARGIN_BOTTOM + CURVE_MARGIN_SIDES * 1.33);
  }

  if (reticleX - MARGIN_LEFT < ctx.measureText(stopText).width / 2) {
    ctx.textAlign = 'start';
  } else if (reticleX - MARGIN_LEFT > cursorBoxWidth - ctx.measureText(stopText).width / 2) {
    ctx.textAlign = 'end';
  }
  ctx.fillText(stopText, reticleX, height - MARGIN_BOTTOM + SNAPPED_STOP_TEXT_OFFSET);

  ctx.clearRect(0, 0, width, MARGIN_TOP);

  return {
    curveX: reticleX,
    curveY: reticleY,
    speedText,
    ecoSpeedText,
    effortText,
    electricalModeText,
    electricalProfileText,
    powerRestrictionText,
    previousGradientText,
    modeText,
  };
};
