import { drawFrame } from "../helpers/drawElements";
import { useCanvas } from "../hooks";

type FrontInteractivityLayerProps = {
  width: number;
  height: number;
};

const FrontInteractivityLayer = ({
  width,
  height,
}: FrontInteractivityLayerProps) => {
  const canvas = useCanvas(drawFrame, width, height, []);

  return (
    <canvas
      id="front-interactivity-layer"
      className="absolute"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default FrontInteractivityLayer;
