import React from 'react';
import type { Store } from '../../types/chartTypes';
import { drawFrame } from '../helpers/frontFrame';
import { useCanvas } from '../hooks';

type FrontInteractivityLayerProps = {
  width: number;
  height: number;
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
  setShowDetailsBox: React.Dispatch<React.SetStateAction<boolean>>;
};

const FrontInteractivityLayer = ({
  width,
  height,
  store,
  setStore,
  setShowDetailsBox,
}: FrontInteractivityLayerProps) => {
  const canvas = useCanvas(drawFrame, { width, height, store, setStore });

  return (
    <canvas
      id="front-interactivity-layer"
      className="absolute"
      ref={canvas}
      width={width}
      height={height}
      onMouseMove={() => setShowDetailsBox(false)}
    />
  );
};

export default FrontInteractivityLayer;
