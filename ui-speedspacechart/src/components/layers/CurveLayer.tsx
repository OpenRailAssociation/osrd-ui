import React from 'react';
import type { Store } from '../../types/chartTypes';
import { drawCurve } from '../helpers/drawElements/curve';
import { useCanvas } from '../hooks';
import cx from 'classnames';

type CurveLayerProps = {
  width: number;
  height: number;
  store: Store;
};

const CurveLayer = ({ width, height, store }: CurveLayerProps) => {
  const canvas = useCanvas(drawCurve, {
    width,
    height,
    store,
    isEco: false,
  });

  return (
    <canvas
      id="curve-layer"
      className={cx('absolute rounded-t-xl', { 'bg-white-25': !store.layersDisplay.declivities })}
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default CurveLayer;
