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

const marginLeft = 40;
const marginRight = 20;
const marginTop = 10;
const marginBottom = 27;

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

  ctx.fillStyle = "#d5d6e6";
  ctx.strokeStyle = "#595b9c";
  ctx.lineWidth = 1;

  ctx.beginPath();
  store.speed.forEach((data) => {
    // normalize speed based on range of values
    const normalizedSpeed = (data.speed - minSpeed) / speedRange;
    const x = data.position * (width / maxPosition) * store.ratio;
    const y = height - normalizedSpeed * height;
    ctx.lineTo(x, y);
  });

  ctx.translate(-store.leftOffset, 0);

  // add fill() before stroke() to avoid overlapping while filling the area
  ctx.fill();

  ctx.stroke();
};

// ********** GRID-X **********

export const drawGridX = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);
  ctx.translate(store.leftOffset, 0);

  ctx.strokeStyle = "#999";
  ctx.font = "10px Arial";
  ctx.setLineDash([2, 2]);

  const { maxPosition, RoundMaxPosition } = maxPositionValues(store);

  // vertical ticks based on ratio and round max position
  ctx.beginPath();
  store.speed.forEach((_, i) => {
    if (i <= Math.ceil(store.ratio) * 10) {
      ctx.moveTo(
        marginLeft +
          ((width - marginLeft - marginRight) / maxPosition) *
            i *
            RoundMaxPosition *
            store.ratio,
        height - marginBottom
      );
      ctx.lineTo(
        marginLeft +
          ((width - marginLeft - marginRight) / maxPosition) *
            i *
            RoundMaxPosition *
            store.ratio,
        height - marginBottom + 5
      );

      ctx.textAlign = "center";
      if (i === 0) ctx.textAlign = "left";
      if (i === Math.ceil(store.ratio) * 10) ctx.textAlign = "right";
      const text = (i * RoundMaxPosition).toLocaleString();
      ctx.fillText(
        text,
        marginLeft +
          ((width - marginLeft - marginRight) / maxPosition) *
            i *
            RoundMaxPosition *
            store.ratio,
        height - marginBottom + 20
      );
    }
  });
  ctx.closePath();

  ctx.stroke();

  // vertical lines based on ratio and round max position
  ctx.beginPath();
  store.speed.forEach((_, i) => {
    if (i <= Math.ceil(store.ratio) * 10) {
      ctx.moveTo(
        marginLeft +
          ((width - marginLeft - marginRight) / maxPosition) *
            i *
            RoundMaxPosition *
            store.ratio,
        marginTop
      );
      ctx.lineTo(
        marginLeft +
          ((width - marginLeft - marginRight) / maxPosition) *
            i *
            RoundMaxPosition *
            store.ratio,
        height - marginBottom
      );
    }
  });
  ctx.closePath();

  ctx.stroke();

  ctx.translate(-store.leftOffset, 0);

  // prevent overlapping with margins left and right
  ctx.clearRect(0, 0, marginLeft, height);
  ctx.clearRect(width - marginRight, 0, width, height);
};

// ********** GRID-Y **********

export const drawGridY = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  clearCanvas(ctx, width, height);

  const { maxSpeed } = speedRangeValues(store);

  ctx.strokeStyle = "#999";
  ctx.font = "10px Arial";
  ctx.setLineDash([2, 2]);
  const textOffsetX = 28;
  const textOffsetY = 24;

  // horizontal ticks based on 10 units of round max speed
  ctx.beginPath();
  store.speed.forEach((_, i) => {
    ctx.moveTo(
      35,
      height -
        marginBottom -
        ((height - marginBottom - marginTop) / maxSpeed) * i * 10
    );
    ctx.lineTo(
      marginLeft,
      height -
        marginBottom -
        ((height - marginBottom - marginTop) / maxSpeed) * i * 10
    );
    ctx.textAlign = "right";
    const text = (i * 10).toString();
    ctx.fillText(
      text,
      textOffsetX,
      height -
        textOffsetY -
        ((height - marginBottom - marginTop) / maxSpeed) * i * 10
    );
  });
  ctx.closePath();

  ctx.stroke();

  // horizontal lines based on 10 units of round max speed
  ctx.beginPath();
  store.speed.forEach((_, i) => {
    if (i >= 1) {
      ctx.moveTo(
        marginLeft,
        height -
          marginBottom -
          ((height - marginBottom - marginTop) / maxSpeed) * i * 10
      );
      ctx.lineTo(
        width - marginRight,
        height -
          marginBottom -
          ((height - marginBottom - marginTop) / maxSpeed) * i * 10
      );
    }
  });
  ctx.closePath();

  ctx.stroke();
};

// ********** FRONT FRAME **********

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store,
  setStore: React.Dispatch<React.SetStateAction<Store>>
) => {
  clearCanvas(ctx, width, height);

  ctx.strokeStyle = "#373987";

  ctx.strokeRect(1, 1, width - 1, height - 1);

  const canvas = d3.select("#front-interactivity-layer") as d3.Selection<
    Element,
    unknown,
    HTMLCanvasElement,
    unknown
  >;

  // zoom interaction
  canvas.call(zoomX(store, setStore));
};
