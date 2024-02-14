import { ConsolidatedPositionSpeedTime } from "../../types/simulationTypes";
import { drawGrid } from "../helpers/drawElements";
import { useCanvas } from "../hooks";

type GridLayerProps = {
  width: number;
  height: number;
  speed: ConsolidatedPositionSpeedTime[];
};

const GridLayer = ({ width, height, speed }: GridLayerProps) => {
  const canvas = useCanvas(drawGrid, width, height, speed);

  return (
    <canvas
      id="grid-layer"
      className="absolute"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default GridLayer;
