import * as d3 from 'd3';
import { clearCanvas } from '../utils';
import type { Store } from '../../types/chartTypes';
import { zoom } from './layersManager';
import { FRONT_INTERACTIVITY_LAYER_ID } from '../const';

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store,
  setStore?: React.Dispatch<React.SetStateAction<Store>>
) => {
  clearCanvas(ctx, width, height);

  const canvas = d3.select(FRONT_INTERACTIVITY_LAYER_ID) as d3.Selection<
    Element,
    unknown,
    HTMLCanvasElement,
    unknown
  >;

  // zoom interaction
  if (setStore) canvas.call(zoom(setStore));

  // cursor interaction
  canvas.on('mousemove', (event) => {
    const cursor = d3.pointer(event);

    if (setStore) {
      setStore(() => ({
        ...store,
        cursor: {
          x: cursor[0],
          y: cursor[1],
        },
      }));
    }
  });

  canvas.on('mouseleave', () => {
    if (setStore) {
      setStore(() => ({
        ...store,
        cursor: {
          x: null,
          y: null,
        },
      }));
    }
  });
};
