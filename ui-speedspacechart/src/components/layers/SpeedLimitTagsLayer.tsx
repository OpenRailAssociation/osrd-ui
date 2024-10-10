import React, { useEffect, useRef } from 'react';

import type { Store, tooltipInfos } from '../../types/chartTypes';
import Tooltip from '../common/Tooltip';
import { LINEAR_LAYERS_HEIGHTS } from '../const';
import { drawSpeedLimitTags, computeTooltip } from '../helpers/drawElements/speedLimitTags';

type SpeedLimitTagsLayerProps = {
  width: number;
  marginTop: number;
  store: Store;
};
const TOOLTIP_HEIGHT = 40;
const MARGIN_ADJUSTMENT = 2;

const SpeedLimitTagsLayer = ({ width, marginTop, store }: SpeedLimitTagsLayerProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const tooltip = useRef<tooltipInfos | null>();

  useEffect(() => {
    const updateCanvas = async () => {
      const currentCanvas = canvas.current as HTMLCanvasElement;
      const ctx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
      const restrictedStore = {
        speedLimitTags: store.speedLimitTags,
        ratioX: store.ratioX,
        leftOffset: store.leftOffset,
        layersDisplay: {
          electricalProfiles: store.layersDisplay.electricalProfiles,
          powerRestrictions: store.layersDisplay.powerRestrictions,
        },
        speeds: store.speeds,
      };
      await drawSpeedLimitTags({
        ctx,
        width,
        height: marginTop,
        store: restrictedStore,
      });
    };
    updateCanvas();
  }, [
    width,
    marginTop,
    store.speedLimitTags,
    store.ratioX,
    store.leftOffset,
    store.layersDisplay.electricalProfiles,
    store.layersDisplay.powerRestrictions,
    store.speeds,
  ]);

  useEffect(() => {
    const updateTooltip = async () => {
      const currentCanvas = canvas.current as HTMLCanvasElement;
      const ctx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
      tooltip.current = await computeTooltip({ ctx, width, height: marginTop, store });
    };
    updateTooltip();
  }, [width, marginTop, store]);

  return (
    <>
      <canvas
        id="speed-limit-tags-layer"
        className="absolute"
        ref={canvas}
        width={width}
        height={LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT}
        style={{ marginTop }}
      />
      {tooltip.current && (
        <Tooltip
          cursorX={tooltip.current.cursorX}
          cursorY={marginTop - TOOLTIP_HEIGHT - MARGIN_ADJUSTMENT}
          height={TOOLTIP_HEIGHT}
          text={tooltip.current.text}
        />
      )}
    </>
  );
};

export default SpeedLimitTagsLayer;
