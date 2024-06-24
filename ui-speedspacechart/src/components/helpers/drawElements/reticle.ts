import { clearCanvas, getAdaptiveHeight, maxPositionValues, speedRangeValues } from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { MARGINS } from '../../const';
import { ConsolidatedPositionSpeedTime, GradientPosition } from '../../../types/simulationTypes';

const {
  MARGIN_LEFT,
  MARGIN_RIGHT,
  MARGIN_TOP,
  MARGIN_BOTTOM,
  CURVE_MARGIN_TOP,
  CURVE_MARGIN_SIDES,
} = MARGINS;

export const drawCursor = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);

  const {
    cursor,
    layersDisplay,
    ratioX,
    leftOffset,
    speed,
    stops,
    electrification,
    slopes,
    electricalProfiles,
  } = store;

  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.lineWidth = 1;
  ctx.font = 'normal 12px IBM Plex Sans';
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;

  let marecoSpeedText = '';
  let effortText = 'coasting';
  let electricalProfileText = '';
  let previousGradientText = 0;
  let modeText = '';
  let curveX = cursor.x!;
  let curveY = 0;
  let x = {
    a: 0,
    b: 0,
  };
  let y = {
    a: 0,
    b: 0,
  };

  const { minSpeed, speedRange } = speedRangeValues(store);
  const { maxPosition } = maxPositionValues(store);

  const heightWithoutLayers = getAdaptiveHeight(height, layersDisplay, false);
  const cursorBoxHeight = heightWithoutLayers - MARGIN_BOTTOM - MARGIN_TOP;
  const cursorBoxWidth = width - MARGIN_LEFT - MARGIN_RIGHT;

  const xPositionReference = (ref: number) =>
    ref * ((cursorBoxWidth - CURVE_MARGIN_SIDES) / maxPosition) * ratioX +
    leftOffset +
    CURVE_MARGIN_SIDES / 2;

  if (cursor.x && cursor.y) {
    // get the nearest previous and next speed values of the curve based on pointer position
    const previousCurvePosition = speed.findLast(
      (speed: ConsolidatedPositionSpeedTime) => xPositionReference(speed.position) <= cursor.x!
    );
    const nextCurvePosition = speed.find(
      (speed: ConsolidatedPositionSpeedTime) => xPositionReference(speed.position) >= cursor.x!
    );

    // get the nearest previous and next stop values of the curve based on pointer position
    const previousStop = stops.findLast((stop) => xPositionReference(stop.position) <= cursor.x!);
    const nextStop = stops.find((stop) => xPositionReference(stop.position) >= cursor.x!);

    // Get the electrical profile name based on the position of the cursor
    let electricalProfileName = '--';
    if (electricalProfiles) {
      const { values, boundaries } = electricalProfiles;
      const currentBoundaryProfileIndex = boundaries.findIndex(
        (boundary) => cursor.x! <= xPositionReference(boundary)
      );
      const electricalProfileValue = values[currentBoundaryProfileIndex];
      if (
        electricalProfileValue &&
        'profile' in electricalProfileValue &&
        electricalProfileValue.profile !== 'incompatible'
      ) {
        electricalProfileName = electricalProfileValue.profile;
      }
    }

    // calculate the y position of the curve based on pointer position beetwen two points
    // adapt texts based on the position of the cursor
    if (
      previousCurvePosition !== undefined &&
      nextCurvePosition !== undefined &&
      previousStop !== undefined &&
      nextStop !== undefined
    ) {
      const normalizedPreviousSpeed = (previousCurvePosition!.speed - minSpeed) / speedRange;
      const normalizedNextSpeed = (nextCurvePosition!.speed - minSpeed) / speedRange;
      x = {
        a: xPositionReference(previousCurvePosition!.position),
        b: xPositionReference(nextCurvePosition!.position),
      };
      y = {
        a: cursorBoxHeight - normalizedPreviousSpeed * (cursorBoxHeight - CURVE_MARGIN_TOP),
        b: cursorBoxHeight - normalizedNextSpeed * (cursorBoxHeight - CURVE_MARGIN_TOP),
      };

      const previousElectrification = electrification.findLast(
        (data) => data.start <= previousCurvePosition.position
      );

      const electrificationUsage = previousElectrification?.electrificationUsage;
      if (electrificationUsage) {
        const isElectrified = electrificationUsage.object_type === 'Electrified';
        modeText = isElectrified ? 'electric' : '--';
        electricalProfileText = `${isElectrified ? electrificationUsage.mode : electrificationUsage.object_type} ${electricalProfileName}`;
      }

      // find out if the cursor isn't close to the previous stop or the next stop based on 20px
      if (
        curveX - xPositionReference(previousStop.position) > 20 &&
        xPositionReference(nextStop.position) - curveX > 20
      ) {
        const drop = (y.b! - y.a!) / (x.b! - x.a!);
        const deltaX = curveX - x.a;
        const deltaY = drop * deltaX;
        curveY = y.a! + deltaY;

        marecoSpeedText = (
          previousCurvePosition.speed +
            ((nextCurvePosition.speed - previousCurvePosition.speed) * (curveX - x.a)) /
              (x.b - x.a) || 0
        ).toFixed(1);

        if (previousCurvePosition.speed < nextCurvePosition.speed) {
          effortText = 'accelerating';
        }
        if (previousCurvePosition.speed > nextCurvePosition.speed) {
          effortText = 'decelerating';
        }

        previousGradientText = slopes.findLast(
          (data: GradientPosition) => xPositionReference(data.position) <= curveX!
        )!.gradient;
      } else {
        // find out from wich side the cursor is closer to the stop
        if (
          curveX - xPositionReference(previousStop.position) <=
          xPositionReference(nextStop.position) - curveX
        ) {
          curveX = xPositionReference(previousStop.position);
        } else {
          curveX = xPositionReference(nextStop.position);
        }

        const nextSpeed = speed.findLast(
          (speed: ConsolidatedPositionSpeedTime) => xPositionReference(speed.position) <= curveX
        )!.speed;
        const previousSpeed = speed.find(
          (speed: ConsolidatedPositionSpeedTime) => xPositionReference(speed.position) >= curveX
        )!.speed;

        // find curveY based on the average speed between the previous and next speed values
        curveY =
          cursorBoxHeight -
          (((previousSpeed + nextSpeed) / 2 - minSpeed) / speedRange) *
            (cursorBoxHeight - CURVE_MARGIN_TOP);

        marecoSpeedText = ((previousSpeed + nextSpeed) / 2).toFixed(1);

        if (nextSpeed < previousSpeed) {
          effortText = 'accelerating';
        }
        if (nextSpeed > previousSpeed) {
          effortText = 'decelerating';
        }

        previousGradientText = slopes.findLast(
          (data: GradientPosition) => xPositionReference(data.position) <= curveX!
        )!.gradient;
      }

      ctx.beginPath();
      // lines along the curve
      // horizontal
      // TODO: add const for 12.75
      ctx.moveTo(curveX + MARGIN_LEFT - 12.75, curveY + MARGIN_TOP);
      ctx.lineTo(curveX + MARGIN_LEFT + 12.75, curveY + MARGIN_TOP);
      ctx.stroke();
      // vertical
      ctx.moveTo(curveX + MARGIN_LEFT, curveY + MARGIN_TOP - 12.75);
      ctx.lineTo(curveX + MARGIN_LEFT, curveY + MARGIN_TOP + 12.75);

      // lines along the axis
      // horizontal
      ctx.moveTo(MARGIN_LEFT, curveY + MARGIN_TOP);
      ctx.lineTo(MARGIN_LEFT - 24, curveY + MARGIN_TOP);
      ctx.closePath();
      ctx.stroke();

      ctx.clearRect(0, height - MARGIN_BOTTOM, width, MARGIN_BOTTOM);

      // we need to draw the vertical line along the axis after all the other lines to clear them without this one
      ctx.beginPath();
      // vertical
      ctx.moveTo(curveX + MARGIN_LEFT, height - MARGIN_BOTTOM);
      ctx.lineTo(curveX + MARGIN_LEFT, height - MARGIN_BOTTOM + 6);

      // calculate the position value between x.a and x.b
      const position = Math.round(
        ((curveX - x.a) / (x.b - x.a)) *
          (nextCurvePosition!.position - previousCurvePosition!.position) +
          previousCurvePosition!.position
      );
      let textPosition = '';
      if (previousCurvePosition.position === 0 && nextCurvePosition.position === 0) {
        textPosition = '0';
      } else if (
        previousCurvePosition.position === maxPosition &&
        nextCurvePosition.position === maxPosition
      ) {
        textPosition = (maxPosition / 1000).toFixed(1).toString();
      } else {
        textPosition = (position / 1000).toFixed(1).toString();
      }

      ctx.textAlign = 'center';
      ctx.fillText(textPosition, curveX + MARGIN_LEFT, height - MARGIN_BOTTOM + 20);

      ctx.closePath();
      ctx.stroke();
    }

    ctx.clearRect(0, 0, width, MARGIN_TOP);
  }

  return {
    curveX,
    curveY,
    marecoSpeedText,
    effortText,
    electricalProfileText,
    previousGradientText,
    modeText,
  };
};
