import React from 'react';
import type { Store } from '../../types/chartTypes';
import { drawCurve } from '../helpers/drawElements/curve';
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
      className="absolute rounded-t-xl"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default CurveLayer;
