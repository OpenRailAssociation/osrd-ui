import type { Store } from "../../types/chartTypes";
import { drawFrame } from "../helpers/drawElements";
import { resetZoom } from "../helpers/layersManager";
import { useCanvas } from "../hooks";

type FrontInteractivityLayerProps = {
  width: number;
  height: number;
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
};

const FrontInteractivityLayer = ({
  width,
  height,
  store,
  setStore,
}: FrontInteractivityLayerProps) => {
  const canvas = useCanvas(drawFrame, width, height, store, setStore);

  const reset = () => {
    setStore((prev) => ({
      ...prev,
      ratio: 1,
      leftOffset: 0,
    }));
    resetZoom();
  };

  return (
    <>
      <canvas
        id="front-interactivity-layer"
        className="absolute ml-10 mt-2"
        ref={canvas}
        width={width}
        height={height}
      />
      <div
        className="flex justify-end absolute ml-10 mt-4"
        style={{ width: width }}>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-1 mr-2 z-10 rounded-full w-8 h-8"
          onClick={() => reset()}>
          &#8617;
        </button>
      </div>
    </>
  );
};

export default FrontInteractivityLayer;
