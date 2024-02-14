import { ConsolidatedPositionSpeedTime } from "../../types/simulationTypes";
import { drawCurve } from "../helpers/drawElements";
import { useCanvas } from "../hooks";

type CurveLayerProps = {
  width: number;
  height: number;
  speed: ConsolidatedPositionSpeedTime[];
};

const CurveLayer = ({ width, height, speed }: CurveLayerProps) => {
  const canvas = useCanvas(drawCurve, width, height, speed);

  return (
    <canvas
      id="curve-layer"
      className="absolute"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default CurveLayer;
