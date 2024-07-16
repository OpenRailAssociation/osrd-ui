import React from 'react';
import type { Store } from '../../types/chartTypes';
import { drawStep } from '../helpers/drawElements/step';
import { useCanvas } from '../hooks';

type StepLayerProps = {
  width: number;
  height: number;
  store: Store;
};

const StepLayer = ({ width, height, store }: StepLayerProps) => {
  const canvas = useCanvas(drawStep, { width, height, store });

  return <canvas id="step-layer" className="absolute" ref={canvas} width={width} height={height} />;
};

export default StepLayer;
