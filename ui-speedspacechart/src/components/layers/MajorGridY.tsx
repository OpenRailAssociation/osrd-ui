import React from 'react';
import type { Store } from '../../types/chartTypes';
import { drawMajorGridY } from '../helpers/drawElements/gridY';
import { useCanvas } from '../hooks';

type MajorGridYProps = {
  width: number;
  height: number;
  store: Store;
};

const MajorGridY = ({ width, height, store }: MajorGridYProps) => {
  const canvas = useCanvas(drawMajorGridY, { width, height, store });

  return (
    <canvas
      id="major-grid-y"
      className="absolute rounded-t-xl"
      ref={canvas}
      width={width}
      height={height}
    />
  );
};

export default MajorGridY;
