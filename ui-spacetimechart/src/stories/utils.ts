import { type SpaceTimeChartProps } from '../lib/types';

const EXTREME_ZOOM = 200;
export const MIN_X_ZOOM = 1 / EXTREME_ZOOM;
export const MAX_X_ZOOM = EXTREME_ZOOM;
export const MIN_Y_ZOOM = 1 / EXTREME_ZOOM;
export const MAX_Y_ZOOM = EXTREME_ZOOM;

export const X_ZOOM_LEVEL = 6;
export const Y_ZOOM_LEVEL = 3;

type ZoomState = {
  xZoomLevel: number;
  yZoomLevel: number;
  xOffset: number;
  yOffset: number;
};

/**
 * This function helps to have a zoom that is centered on the mouse position.=
 */
export function zoom(
  state: ZoomState,
  { delta, position: { x, y } }: Parameters<NonNullable<SpaceTimeChartProps['onZoom']>>[0]
): ZoomState {
  const xZoomLevel = Math.min(
    Math.max(state.xZoomLevel * (1 + delta / 10), MIN_X_ZOOM),
    MAX_X_ZOOM
  );
  const yZoomLevel = Math.min(
    Math.max(state.yZoomLevel * (1 + delta / 10), MIN_Y_ZOOM),
    MAX_Y_ZOOM
  );
  return {
    xZoomLevel,
    yZoomLevel,
    // Adjust zoom level relatively to the input delta value:
    // These lines are here to center the zoom on the mouse position:
    xOffset: x - ((x - state.xOffset) / state.xZoomLevel) * xZoomLevel,
    yOffset: y - ((y - state.yOffset) / state.yZoomLevel) * yZoomLevel,
  };
}
