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
const LEFT_MARGIN = 52;
const RIGHT_MARGIN = 16;
const TOOLTIP_WIDTH = 238;

const constrainTooltipPosition = (cursorX: number, width: number, tooltipWidth: number) => {
  if (cursorX - tooltipWidth / 2 < LEFT_MARGIN) {
    return LEFT_MARGIN + tooltipWidth / 2;
  }
  if (cursorX + tooltipWidth / 2 > width - RIGHT_MARGIN) {
    return width - RIGHT_MARGIN - tooltipWidth / 2;
  }
  return cursorX;
};

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
          cursorX={constrainTooltipPosition(tooltip.current.cursorX, width, TOOLTIP_WIDTH)}
          cursorY={tooltip.current.cursorY - TOOLTIP_HEIGHT}
          height={TOOLTIP_HEIGHT}
          text={tooltip.current.text}
        />
      )}
    </>
  );
};

export default SpeedLimitTagsLayer;
