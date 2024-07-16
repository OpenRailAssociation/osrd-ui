import {
  clearCanvas,
  createSvgBlobUrl,
  drawLinearLayerBackground,
  drawRoundedRect,
  drawSeparatorLinearLayer,
  loadSvgImage,
  maxPositionValues,
  positionOnGraphScale,
} from '../../utils';
import {
  LINEAR_LAYERS_HEIGHTS,
  LINEAR_LAYERS_BACKGROUND_COLOR,
  MARGINS,
  COLOR_DICTIONARY,
  LINEAR_LAYER_SEPARATOR_HEIGHT,
} from '../../const';
import { drawSvgImageWithColor } from '../../utils';
import type { DrawFunctionParams, tooltipInfos } from '../../../types/chartTypes';

const questionSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M6.92 6.085h.001a.75.75 0 1 1-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.76 2.76 0 0 1 1.637.525c.503.377.863.965.863 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6 6 0 0 0-.26.16 1 1 0 0 0-.276.245.75.75 0 0 1-1.248-.832c.184-.264.42-.489.692-.661q.154-.1.313-.195l.007-.004c.1-.061.182-.11.258-.161a1 1 0 0 0 .277-.245C8.96 6.514 9 6.427 9 6.25a.61.61 0 0 0-.262-.525A1.27 1.27 0 0 0 8 5.5c-.369 0-.595.09-.74.187-.146.1-.263.238-.34.398M9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>';
const alertFillSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 16 16" > <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575zM8 5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8 5m1 6a1 1 0 1 0-2 0 1 1 0 0 0 2 0" /> </svg>';
const questionBlobUrl = createSvgBlobUrl(questionSvg);
const alertFillBlobUrl = createSvgBlobUrl(alertFillSvg);

const RECT_HEIGHT = 17;
const Y_POSITION = 12;
const RECTANGLE_SPACING = 1;
const TEXT_LEFT_PADDING = 4;
const TEXT_RIGHT_PADDING = 8;
const FIRST_TAG_LEFT_PADDING = 8;
const ICON_WIDTH = 16;
const ICON_HEIGHT = 16;
const ICON_OFFSET = 4;
const TEXT_PADDING_TOP = 1;
const ICON_BACKGROUND_WIDTH = 24;
const ICON_BACKGROUND_HEIGHT = 24;

export const drawSpeedLimitTags = async ({
  ctx,
  width,
  height: marginTop,
  store,
}: DrawFunctionParams): Promise<tooltipInfos | null> => {
  const {
    speedLimitTags,
    ratioX,
    leftOffset,
    layersDisplay: { electricalProfiles, powerRestrictions },
    cursor,
  } = store;

  const { MARGIN_TOP, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT } = MARGINS;

  clearCanvas(ctx, width, LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT);

  ctx.save();
  ctx.translate(leftOffset, 0);

  const { maxPosition } = maxPositionValues(store);

  const questionImage = await loadSvgImage(questionBlobUrl);
  const alertFillImage = await loadSvgImage(alertFillBlobUrl);

  let speedLimitTagsBackgroundColor = LINEAR_LAYERS_BACKGROUND_COLOR.FIRST;

  if (electricalProfiles && powerRestrictions) {
    speedLimitTagsBackgroundColor = LINEAR_LAYERS_BACKGROUND_COLOR.THIRD;
  } else if (electricalProfiles || powerRestrictions) {
    speedLimitTagsBackgroundColor = LINEAR_LAYERS_BACKGROUND_COLOR.SECOND;
  }

  drawSeparatorLinearLayer(ctx, 'rgba(0,0,0,0.1)', MARGINS, width, LINEAR_LAYER_SEPARATOR_HEIGHT);
  drawLinearLayerBackground(
    ctx,
    speedLimitTagsBackgroundColor,
    MARGINS,
    width,
    MARGIN_BOTTOM,
    LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT - LINEAR_LAYER_SEPARATOR_HEIGHT
  );

  let tooltip: tooltipInfos | null = null;

  if (speedLimitTags) {
    speedLimitTags.forEach(({ position, value }, index) => {
      const { tag, color } = value;
      const x = positionOnGraphScale(position.start, maxPosition, width, ratioX, MARGINS);
      const nextBoundary = positionOnGraphScale(position.end!, maxPosition, width, ratioX, MARGINS);

      if (nextBoundary !== undefined) {
        const tagWidth = nextBoundary - x - RECTANGLE_SPACING;

        const secondaryColor = COLOR_DICTIONARY[color] || color;

        ctx.fillStyle = color;
        ctx.strokeStyle = tag === 'UU' ? '#494641' : color;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.fillRect(x, Y_POSITION, tagWidth - RECTANGLE_SPACING, RECT_HEIGHT);

        ctx.fillStyle = secondaryColor;

        const textWidth =
          ctx.measureText(tag).width +
          TEXT_RIGHT_PADDING +
          (index === 0 ? FIRST_TAG_LEFT_PADDING : 0);

        ctx.fillRect(x + 1 + textWidth, Y_POSITION, tagWidth - textWidth - 2, RECT_HEIGHT);
        ctx.rect(x + textWidth, Y_POSITION, tagWidth - RECTANGLE_SPACING - textWidth, RECT_HEIGHT);
        ctx.strokeRect(x + 1, Y_POSITION, tagWidth - RECTANGLE_SPACING, RECT_HEIGHT);
        ctx.closePath();

        if (tag === 'UU') {
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x + textWidth + 2, Y_POSITION);
          ctx.lineTo(x + textWidth + 2, Y_POSITION + RECT_HEIGHT);
          ctx.closePath();
          ctx.stroke();
        }

        if (tag === 'incompatible' || tag === 'missing_from_train') {
          const image = tag === 'incompatible' ? alertFillImage : questionImage;

          ctx.fillStyle = color;

          const iconXPosition = x + (tagWidth - ICON_BACKGROUND_WIDTH) / 2;
          const iconYPosition = Y_POSITION - ICON_OFFSET;
          const cornerRadius = 4;

          drawRoundedRect(
            ctx,
            iconXPosition,
            iconYPosition,
            ICON_BACKGROUND_WIDTH,
            ICON_BACKGROUND_HEIGHT,
            cornerRadius
          );

          drawSvgImageWithColor(
            ctx,
            image,
            iconXPosition + ICON_OFFSET,
            iconYPosition + ICON_OFFSET,
            ICON_WIDTH,
            ICON_HEIGHT,
            '#FFFFFF'
          );

          if (tag === 'incompatible' && cursor.x && cursor.y) {
            if (
              cursor.x >= x - MARGIN_LEFT + leftOffset &&
              cursor.x <= x - MARGIN_LEFT + leftOffset + tagWidth &&
              cursor.y >= marginTop - MARGIN_TOP + Y_POSITION - 2 &&
              cursor.y <= marginTop - MARGIN_TOP + Y_POSITION - 1 + RECT_HEIGHT
            ) {
              tooltip = {
                cursorX: cursor.x + MARGIN_LEFT,
                cursorY: Y_POSITION,
                text: 'Incompatible with the infrastructure',
              };
            }
          }
        } else {
          ctx.fillStyle = 'white';
          ctx.font = '600 12px "IBM Plex Sans"';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          const textPosition = x + TEXT_LEFT_PADDING;
          ctx.fillText(tag, textPosition, Y_POSITION + TEXT_PADDING_TOP + RECT_HEIGHT / 2);
        }
      }
    });

    drawSeparatorLinearLayer(ctx, 'rgba(0,0,0,0.1)', MARGINS, width, marginTop);
    ctx.restore();

    // prevent overlapping with margins left and right
    ctx.clearRect(0, 0, MARGIN_LEFT, LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT);
    ctx.clearRect(width - MARGIN_RIGHT, 0, width, LINEAR_LAYERS_HEIGHTS.SPEED_LIMIT_TAGS_HEIGHT);

    return tooltip;
  }
  return null;
};
