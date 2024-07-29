import React from 'react';

import type { Store } from '../../types/chartTypes';
import { drawGridX } from '../helpers/drawElements/gridX';
import { useCanvas } from '../hooks';

type AxisLayerXProps = {
  width: number;
  height: number;
  store: Store;
};

const AxisLayerX = ({ width, height, store }: AxisLayerXProps) => {
  const canvas = useCanvas(drawGridX, { width, height, store });

  return (
    <canvas
      id="axis-layer-x"
      className="absolute rounded-t-xl"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default AxisLayerX;
