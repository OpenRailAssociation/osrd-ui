import React from 'react';

import type { Store } from '../../types/chartTypes';
import { drawCurve } from '../helpers/drawElements';
import { useCanvas } from '../hooks';

type CurveLayerProps = {
  width: number;
  height: number;
  store: Store;
};

const CurveLayer = ({ width, height, store }: CurveLayerProps) => {
  const canvas = useCanvas(drawCurve, width, height, store);

  return (
    <canvas
      id="curve-layer"
      className="absolute ml-10 mt-2"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default CurveLayer;
