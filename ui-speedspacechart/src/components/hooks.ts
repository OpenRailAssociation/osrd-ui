import { useEffect, useRef } from "react";
import { ConsolidatedPositionSpeedTime } from "../types/simulationTypes";

export const useCanvas = (
  draw: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    speed: ConsolidatedPositionSpeedTime[]
  ) => void,
  width: number,
  height: number,
  speed: ConsolidatedPositionSpeedTime[]
) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentCanvas = canvas.current as HTMLCanvasElement;
    const ctx = currentCanvas.getContext("2d") as CanvasRenderingContext2D;
    draw(ctx, width, height, speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, speed]);

  return canvas;
};
