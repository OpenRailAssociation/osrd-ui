import React, { useEffect, useRef } from 'react';

import { type Store, type tooltipInfos } from '../../types/chartTypes';
import Tooltip from '../common/Tooltip';
import { LINEAR_LAYERS_HEIGHTS } from '../const';
import { drawSpeedLimitTags } from '../helpers/drawElements/speedLimitTags';

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
    const updateTooltip = async () => {
      const currentCanvas = canvas.current as HTMLCanvasElement;
      const ctx = currentCanvas.getContext('2d') as CanvasRenderingContext2D;
      tooltip.current = await drawSpeedLimitTags({ ctx, width, height: marginTop, store });
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
