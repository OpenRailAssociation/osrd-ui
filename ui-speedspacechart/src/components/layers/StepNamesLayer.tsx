import React from 'react';

import { type Store } from '../../types/chartTypes';
import { drawStepText } from '../helpers/drawElements/step';
import { useCanvas } from '../hooks';

type StepNamesLayerProps = {
  width: number;
  height: number;
  store: Store;
};

const StepNamesLayer = ({ width, height, store }: StepNamesLayerProps) => {
  const canvas = useCanvas(drawStepText, { width, height, store });

  return <canvas id="step-layer" className="absolute" ref={canvas} width={width} height={height} />;
};

export default StepNamesLayer;
