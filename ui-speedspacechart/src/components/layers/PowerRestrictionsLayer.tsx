import React from 'react';
import type { Store } from '../../types/chartTypes';
import { useCanvas } from '../hooks';
import { drawPowerRestrictions } from '../helpers/drawElements/powerRestrictions';
import { LINEAR_LAYERS_HEIGHTS } from '../const';

type PowerRestrictionsLayerProps = {
  width: number;
  marginTop: number;
  store: Store;
};

const PowerRestrictionsLayer = ({ width, marginTop, store }: PowerRestrictionsLayerProps) => {
  const canvas = useCanvas(drawPowerRestrictions, {
    width,
    height: LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS_HEIGHT,
    store,
  });

  return (
    <canvas
      id="power-restrictions-layer"
      className="absolute"
      ref={canvas}
      width={width}
      height={LINEAR_LAYERS_HEIGHTS.POWER_RESTRICTIONS_HEIGHT}
      style={{ marginTop }}
    />
  );
};

export default PowerRestrictionsLayer;
