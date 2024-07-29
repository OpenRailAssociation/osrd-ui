import React from 'react';

import type { Store } from '../../types/chartTypes';
import { drawTickY } from '../helpers/drawElements/tickY';
import { useCanvas } from '../hooks';

type TickLayerYProps = {
  width: number;
  height: number;
  store: Store;
};

const TickLayerY = ({ width, height, store }: TickLayerYProps) => {
  const canvas = useCanvas(drawTickY, { width, height, store });

  return (
    <canvas
      id="tick-layer-y"
      className="absolute rounded-t-xl"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default TickLayerY;
