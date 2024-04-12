import * as d3 from "d3";
import { clearCanvas, maxPositionValues, speedRangeValues } from "../utils";
import type { Store } from "../../types/chartTypes";
import { zoomX } from "./layersManager";

// * each draw method begins with clearing the canvas (and the translation when needed) in order to avoid overlapping
// * store.ratio is used to scale the canvas horizontally with zoom method from d3.js (curves and X grid only)
// * store.leftOffset is used to translate the canvas horizontally while zooming on pointer position
// * store.speed is used to draw the curve and the grid
// ! never implement interractivity methods in this file
// * cf ./layersManager.ts to see d3.js interractivity methods

const marginLeft = 48;
const marginRight = 12;
const marginTop = 27;
const marginBottom = 52.5;

// ********** CURVE **********

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);
  ctx.translate(store.leftOffset, 0);

  const { minSpeed, speedRange } = speedRangeValues(store);
  const { maxPosition } = maxPositionValues(store);

  ctx.fillStyle = "rgba(17, 101, 180, 0.02)";
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 0.5;

  ctx.beginPath();
  store.speed.forEach((data) => {
    // normalize speed based on range of values
    const normalizedSpeed = (data.speed - minSpeed) / speedRange;
    const x = data.position * ((width - 16) / maxPosition) * store.ratio + 8;
    const y = height - normalizedSpeed * (height - marginTop - 40);
    ctx.lineTo(x, y);
  });

  ctx.translate(-store.leftOffset, 0);

  // add fill() before stroke() to avoid overlapping while filling the area
  ctx.fill();

  ctx.stroke();
};

// ********** STEP **********

// ********** GRID-X **********

export const drawGridX = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);
  ctx.translate(store.leftOffset, 0);

  ctx.strokeStyle = "rgb(121, 118, 113)";
  ctx.lineWidth = 0.5;
  ctx.setLineDash([2, 4]);

  const { maxPosition, RoundMaxPosition } = maxPositionValues(store);

  // vertical lines based on ratio and round max position

  const xPosition =
    ((width - 16 - marginLeft - marginRight) / maxPosition) *
    RoundMaxPosition *
    store.ratio;

  ctx.beginPath();
  store.speed.forEach((_, i) => {
    if (i <= Math.ceil(store.ratio) * 20 && i % 2 === 0) {
      ctx.moveTo(marginLeft + xPosition * i + 8, marginTop);
      ctx.lineTo(marginLeft + xPosition * i + 8, height - marginBottom);
    }
  });
  ctx.closePath();

  ctx.stroke();

  ctx.translate(-store.leftOffset, 0);

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, marginLeft, height);
  ctx.clearRect(width - marginRight, 0, width, height);
};

// ********** TICK-X **********

export const drawTickX = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);
  ctx.translate(store.leftOffset, 0);

  ctx.strokeStyle = "rgb(121, 118, 113)";
  ctx.lineWidth = 0.5;
  ctx.font = "normal 12px IBMPlexSans";
  ctx.fillStyle = "rgb(182, 179, 175)";

  const { maxPosition, RoundMaxPosition, intermediateTicksPosition } =
    maxPositionValues(store);

  // vertical ticks based on ratio and round max position

  const xPosition =
    ((width - 16 - marginLeft - marginRight) / maxPosition) *
    RoundMaxPosition *
    store.ratio;

  const intermediateXPosition =
    ((width - 16 - marginLeft - marginRight) / maxPosition) *
    intermediateTicksPosition *
    store.ratio;

  ctx.beginPath();

  store.speed.forEach((_, i) => {
    if (i <= Math.ceil(store.ratio) * 40) {
      ctx.moveTo(
        marginLeft + intermediateXPosition * i + 8,
        height - marginBottom
      );
      ctx.lineTo(
        marginLeft + intermediateXPosition * i + 8,
        height - marginBottom + 4
      );
    }
  });

  store.speed.forEach((_, i) => {
    if (i <= Math.ceil(store.ratio) * 20) {
      ctx.moveTo(marginLeft + xPosition * i + 8, height - marginBottom);
      ctx.lineTo(marginLeft + xPosition * i + 8, height - marginBottom + 8);

      if (i % 2 === 0) {
        ctx.textAlign = "center";
        const text = (i * RoundMaxPosition).toLocaleString();
        ctx.fillText(
          text,
          marginLeft + xPosition * i + 8,
          height - marginBottom + 27.5
        );
      }
    }
  });

  ctx.closePath();

  ctx.stroke();

  ctx.translate(-store.leftOffset, 0);

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, marginLeft, height);
  ctx.clearRect(width - marginRight, 0, width, height);
};

// ********** MINOR-GRID-Y **********

// TODO : merge with drawMajorGridY with baseUnit parameter

export const drawGridY = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);

  const { maxSpeed } = speedRangeValues(store);

  ctx.strokeStyle = "rgba(33, 112, 185, 0.25)";
  ctx.lineWidth = 0.5;

  // horizontal lines based on 10 units of round max speed

  const yPosition = (height - marginBottom - marginTop - 70) / maxSpeed;

  ctx.beginPath();
  store.speed.forEach((_, i) => {
    if (i >= 1) {
      ctx.moveTo(marginLeft, height - marginBottom - yPosition * i * 10);
      ctx.lineTo(
        width - marginRight,
        height - marginBottom - yPosition * i * 10
      );
    }
  });
  ctx.closePath();

  ctx.stroke();

  // prevent overlapping with margin top
  ctx.clearRect(0, 0, width, marginTop);
};

// ********** MAJOR-GRID-Y **********

// TODO : merge with drawMinorGridY with baseUnit parameter

export const drawMajorGridY = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);

  const { maxSpeed } = speedRangeValues(store);

  ctx.strokeStyle = "rgba(33, 112, 185, 0.6)";
  ctx.lineWidth = 0.5;

  // horizontal lines based on 30 units of round max speed

  const yPosition = (height - marginBottom - marginTop - 70) / maxSpeed;

  ctx.beginPath();
  store.speed.forEach((_, i) => {
    if (i >= 1) {
      ctx.moveTo(marginLeft, height - marginBottom - yPosition * i * 30);
      ctx.lineTo(
        width - marginRight,
        height - marginBottom - yPosition * i * 30
      );
    }
  });
  ctx.closePath();

  ctx.stroke();

  // prevent overlapping with margin top
  ctx.clearRect(0, 0, width, marginTop);
};

// ********** TICK-Y **********

export const drawTickY = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);

  const { maxSpeed } = speedRangeValues(store);

  ctx.strokeStyle = "rgb(121, 118, 113)";
  ctx.lineWidth = 0.5;
  ctx.font = "normal 12px IBMPlexSans";
  ctx.fillStyle = "rgb(182, 179, 175)";
  const textOffsetX = 36;
  const textOffsetY = 24;

  // horizontal ticks based on 10 units of round max speed

  const yPosition = (height - marginBottom - marginTop - 70) / maxSpeed;

  ctx.beginPath();
  store.speed.forEach((_, i) => {
    ctx.moveTo(43, height - marginBottom - yPosition * i * 10);
    ctx.lineTo(marginLeft, height - marginBottom - yPosition * i * 10);
    ctx.textAlign = "right";
    const text = (i * 10).toString();
    ctx.fillText(
      text,
      textOffsetX,
      height - marginTop + 3 - textOffsetY - yPosition * i * 10
    );
  });
  ctx.closePath();

  ctx.stroke();

  // prevent overlapping with margin top
  ctx.clearRect(0, 0, width, marginTop);
};

// ********** FRONT FRAME **********

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store,
  setStore?: React.Dispatch<React.SetStateAction<Store>>
) => {
  clearCanvas(ctx, width, height);

  const canvas = d3.select("#front-interactivity-layer") as d3.Selection<
    Element,
    unknown,
    HTMLCanvasElement,
    unknown
  >;

  // zoom interaction
  if (setStore)
    canvas
      .on("wheel", (event) => {
        if (event.ctrlKey || event.shiftKey) {
          event.preventDefault();
        }
      })
      .call(zoomX(store, setStore));
};
