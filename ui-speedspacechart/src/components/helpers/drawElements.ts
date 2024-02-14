import { ConsolidatedPositionSpeedTime } from "../../types/simulationTypes";
import { speedRangeValues } from "../utils";

// ********** CURVE **********

export const drawCurve = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  speed: ConsolidatedPositionSpeedTime[]
) => {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#595b9c";
  ctx.lineWidth = 1;
  ctx.fillStyle = "#d5d6e6";

  const { minSpeed, speedRange } = speedRangeValues(speed);

  ctx.beginPath();
  speed.forEach((data) => {
    //normalize speed based on range of values
    const normalizedSpeed = (data.speed - minSpeed) / speedRange;
    const x = data.position * (width / speed[speed.length - 1].position);
    const y = height - normalizedSpeed * height;
    ctx.lineTo(x, y);
  });
  // add fill() before stroke() to avoid overlapping while filling the area
  ctx.fill();
  ctx.stroke();
};

// ********** GRID **********

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  speed: ConsolidatedPositionSpeedTime[]
) => {
  ctx.clearRect(0, 0, width, height);

  const { maxSpeed } = speedRangeValues(speed);

  ctx.strokeStyle = "#555";
  ctx.setLineDash([1, 4]);
  ctx.beginPath();

  // horizontal lines based on max speed with round number based on 10
  // TODO: adapt base on max speed value
  speed.forEach((_, i) => {
    ctx.moveTo(0, height - (height / maxSpeed) * i * 10);
    ctx.lineTo(width, height - (height / maxSpeed) * i * 10);
  });

  // vertical lines based on max position with round number based on 10000
  // TODO adapt base on max position value
  speed.forEach((_, i) => {
    ctx.moveTo((width / speed[speed.length - 1].position) * i * 20000, 0);
    ctx.lineTo((width / speed[speed.length - 1].position) * i * 20000, height);
  });
  ctx.stroke();
};

// ********** FRONT FRAME **********

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#373987";
  ctx.strokeRect(1, 1, width - 1, height - 1);
};
