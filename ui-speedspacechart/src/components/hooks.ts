import { useEffect, useRef } from 'react';
import type { Store } from '../types/chartTypes';

type DrawFunction = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store,
  setStore?: React.Dispatch<React.SetStateAction<Store>>
) => void;

export const useCanvas = (
  draw: DrawFunction,
  width: number,
  height: number,
  store: Store,
  setStore?: React.Dispatch<React.SetStateAction<Store>>
) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentCanvas = canvas.current as HTMLCanvasElement;
    const ctx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
    draw(ctx, width, height, store, setStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, store]);

  return canvas;
};
