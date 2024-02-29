import { useEffect, useRef, useState } from "react";
import { OsrdSimulationState } from "../types/simulationTypes";
import type { Store } from "../types/chartTypes";
import {
  drawCurve,
  drawFrame,
  drawGridX,
  drawGridY,
} from "./helpers/drawElements";
import { resetZoom } from "./helpers/layersManager";

export type SpeedSpaceChartProps = {
  width: number;
  height: number;
  data: OsrdSimulationState;
};

const SpeedSpaceChart = ({ width, height, data }: SpeedSpaceChartProps) => {
  const [store, setStore] = useState<Store>({
    speed: data.consolidatedSimulation[0].speed,
    ratio: 1,
    leftOffset: 0,
  });

  const curveLayer = useRef<HTMLCanvasElement>(null);
  const AxisLayerX = useRef<HTMLCanvasElement>(null);
  const AxisLayerY = useRef<HTMLCanvasElement>(null);
  const InterractivityLayer = useRef<HTMLCanvasElement>(null);

  const reset = () => {
    setStore({
      ...store,
      ratio: 1,
      leftOffset: 0,
    });
    resetZoom();
  };

  useEffect(() => {
    const ctxCurve = curveLayer.current?.getContext("2d");
    if (ctxCurve) {
      drawCurve(ctxCurve, width - 60, height - 35, store);
    }
    const ctxAxisX = AxisLayerX.current?.getContext("2d");
    if (ctxAxisX) {
      drawGridX(ctxAxisX, width, height, store);
    }
    const ctxAxisY = AxisLayerY.current?.getContext("2d");
    if (ctxAxisY) {
      drawGridY(ctxAxisY, width, height, store);
    }
    const ctxInterractivy = InterractivityLayer.current?.getContext("2d");
    if (ctxInterractivy) {
      drawFrame(ctxInterractivy, width - 60, height - 35, store, setStore);
    }
  }, [width, height, store]);

  return (
    <div
      className="bg-white"
      style={{ width: `${width}px`, height: `${height}px` }}
      tabIndex={0}>
      <canvas
        id="curve-layer"
        className="absolute ml-10 mt-2"
        ref={curveLayer}
        width={width - 60}
        height={height - 35}
      />
      <canvas
        id="axis-layer-x"
        className="absolute"
        ref={AxisLayerX}
        width={width}
        height={height}
      />
      <canvas
        id="axis-layer-y"
        className="absolute"
        ref={AxisLayerY}
        width={width}
        height={height}
      />
      <canvas
        id="front-interactivity-layer"
        className="absolute ml-10 mt-2"
        ref={InterractivityLayer}
        width={width - 60}
        height={height - 35}
      />
      <div
        className="flex justify-end absolute ml-10 mt-4"
        style={{ width: width - 60 }}>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-1 mr-2 z-10 rounded-full w-8 h-8"
          onClick={() => reset()}>
          &#8617;
        </button>
      </div>
    </div>
  );
};

export default SpeedSpaceChart;
