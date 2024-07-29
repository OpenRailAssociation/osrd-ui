import React from 'react';

import type { Store } from '../../types/chartTypes';
import { drawGridY } from '../helpers/drawElements/gridY';
import { useCanvas } from '../hooks';

type AxisLayerYProps = {
  width: number;
  height: number;
  store: Store;
};

const AxisLayerY = ({ width, height, store }: AxisLayerYProps) => {
  const canvas = useCanvas(drawGridY, { width, height, store });

  return (
    <canvas
      id="axis-layer-y"
      className="absolute rounded-t-xl"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default AxisLayerY;
