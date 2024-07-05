import React from 'react';
import type { Store } from '../../types/chartTypes';
import { drawDeclivity } from '../helpers/drawElements/declivity';
import { useCanvas } from '../hooks';
import cx from 'classnames';

type DeclivityLayerProps = {
  width: number;
  height: number;
  store: Store;
};

const DeclivityLayer = ({ width, height, store }: DeclivityLayerProps) => {
  const canvas = useCanvas(drawDeclivity, width, height, store);

  return (
    <canvas
      id="declivity-layer"
      className={cx('absolute rounded-t-xl', { 'bg-white-25': store.layersDisplay.declivities })}
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default DeclivityLayer;
