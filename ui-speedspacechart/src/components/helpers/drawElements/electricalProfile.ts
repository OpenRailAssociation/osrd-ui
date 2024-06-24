import {
  clearCanvas,
  drawLinearLayerBackground,
  drawSeparatorLinearLayer,
  maxPositionValues,
  positionOnGraphScale,
} from '../../utils';
import type { Store } from '../../../types/chartTypes';
import { LINEAR_LAYERS_BACKGROUND_COLOR, MARGINS, LAYERS_HEIGHTS } from '../../const';

const PROFILE_HEIGHT_MAX = 40;
const MARGIN_POSITION_TEXT = 12;
const SELECTION_BAR_HEIGHT_AJUSTEMENT = 30;

const maxHeightLevel = (heightLevel: number) => (heightLevel > 7 ? 7 : heightLevel);

export const drawElectricalProfile = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  store: Store
) => {
  const { electricalProfiles, ratioX, leftOffset, cursor } = store;
  const { ELECTRICAL_PROFILES_HEIGHT } = LAYERS_HEIGHTS;

  if (!electricalProfiles) return;
  clearCanvas(ctx, width, height);

  const topLayer = height - ELECTRICAL_PROFILES_HEIGHT;

  ctx.save();
  ctx.translate(leftOffset, 0);
  const { maxPosition } = maxPositionValues(store);
  const { values, boundaries } = electricalProfiles;
  const {
    MARGIN_TOP,
    MARGIN_BOTTOM,
    MARGIN_LEFT,
    MARGIN_RIGHT,
    CURVE_MARGIN_SIDES,
    ELECTRICAL_PROFILES_MARGIN_TOP,
  } = MARGINS;

  drawLinearLayerBackground(
    ctx,
    LINEAR_LAYERS_BACKGROUND_COLOR.FIRST,
    MARGINS,
    width,
    topLayer,
    ELECTRICAL_PROFILES_HEIGHT
  );

  values.forEach((data, index) => {
    const x =
      index === 0
        ? MARGIN_LEFT + CURVE_MARGIN_SIDES / 2
        : positionOnGraphScale(boundaries[index - 1], maxPosition, width, ratioX, MARGINS);

    let topRect = topLayer - MARGIN_BOTTOM + ELECTRICAL_PROFILES_MARGIN_TOP;

    const profileWidth =
      index === values.length - 1
        ? positionOnGraphScale(boundaries[index], maxPosition, width, ratioX, MARGINS) - x
        : positionOnGraphScale(boundaries[index], maxPosition, width, ratioX, MARGINS) - x;

    if ('profile' in data) {
      const { profile, profileColor, heightLevel } = data;
      const heightLevelMax = maxHeightLevel(heightLevel);
      ctx.fillStyle = profileColor;

      if (profile === 'incompatible') {
        // Incompatible profile
        ctx.beginPath();
        for (let i = 0; i < 9; i++) {
          ctx.fillRect(x, topRect + 15 + i * 3, profileWidth, 1);
        }
        ctx.stroke();
      } else {
        ctx.beginPath();

        topRect += heightLevelMax * 4;

        const profileHeight = PROFILE_HEIGHT_MAX - heightLevelMax * 4;

        ctx.fillRect(x, topRect, profileWidth, profileHeight);
        ctx.stroke();

        // Draw only if cursor hover a profile
        if (
          cursor.y &&
          cursor.x &&
          cursor.y <= topLayer - MARGIN_BOTTOM + MARGIN_TOP &&
          cursor.y >= topLayer - MARGIN_BOTTOM + MARGIN_TOP - ELECTRICAL_PROFILES_HEIGHT &&
          cursor.x - leftOffset >= x - MARGIN_LEFT &&
          cursor.x - leftOffset <= x + profileWidth - MARGIN_LEFT
        ) {
          // Draw selection bar
          ctx.beginPath();
          ctx.globalAlpha = 0.2;
          ctx.fillRect(x, MARGIN_TOP, profileWidth, topLayer - SELECTION_BAR_HEIGHT_AJUSTEMENT);
          ctx.globalAlpha = 1;
          ctx.stroke();

          const profilNameWidth = Math.floor(ctx.measureText(profile).width);
          const marginProfilName = 20;

          // Draw profile name
          if (profileWidth > profilNameWidth + marginProfilName) {
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.font = '600 14px IBM Plex Sans';
            ctx.textAlign = 'center';
            ctx.fillText(`${profile}`, x + profileWidth / 2, topLayer / 2);
            ctx.stroke();
          }

          // Draw begin and end position
          ctx.beginPath();
          ctx.fillStyle = 'rgb(49, 46, 43)';
          ctx.font = '400 14px IBM Plex Sans';
          ctx.textAlign = 'right';
          ctx.fillText(
            `${(boundaries[index - 1] / 1000 || 0).toFixed(1)}`,
            x - MARGIN_POSITION_TEXT,
            topLayer / 2
          );
          ctx.textAlign = 'left';
          ctx.fillText(
            `${(boundaries[index] / 1000).toFixed(1)}`,
            x + profileWidth + MARGIN_POSITION_TEXT,
            topLayer / 2
          );
          ctx.stroke();
        }
      }
    } else {
      ctx.beginPath();
      ctx.fillStyle = '#1F1B17';
      ctx.fillRect(x, topRect + 28, profileWidth, 9);
      ctx.clearRect(x, topRect + 31, profileWidth, 3);
      ctx.stroke();
    }
  });

  // Draw stroke around the selected profile
  const currentBoundaryProfileIndex = boundaries.findIndex(
    (boundary) =>
      cursor.x! - leftOffset <=
      positionOnGraphScale(boundary, maxPosition, width, ratioX, MARGINS) - MARGIN_LEFT
  );
  if (
    cursor.y &&
    cursor.y <= topLayer - MARGIN_BOTTOM + MARGIN_TOP &&
    cursor.y >= topLayer - MARGIN_BOTTOM + MARGIN_TOP - ELECTRICAL_PROFILES_HEIGHT
  ) {
    const electricalProfileValue = values[currentBoundaryProfileIndex];
    if (
      electricalProfileValue &&
      'profile' in electricalProfileValue &&
      electricalProfileValue.profile !== 'incompatible'
    ) {
      const { heightLevel } = electricalProfileValue;
      const heightLevelMax = maxHeightLevel(heightLevel);
      const startHoverStrokeHeight =
        topLayer - MARGIN_BOTTOM + ELECTRICAL_PROFILES_MARGIN_TOP + heightLevelMax * 4;

      const x =
        positionOnGraphScale(
          boundaries[currentBoundaryProfileIndex - 1],
          maxPosition,
          width,
          ratioX,
          MARGINS
        ) || MARGIN_LEFT + CURVE_MARGIN_SIDES / 2;

      const profileWidth =
        positionOnGraphScale(
          boundaries[currentBoundaryProfileIndex],
          maxPosition,
          width,
          ratioX,
          MARGINS
        ) - x;
      const profileHeight = PROFILE_HEIGHT_MAX - heightLevelMax * 4;

      ctx.shadowColor = 'rgba(0, 0, 0, 0.19)';
      ctx.shadowBlur = 5;

      ctx.beginPath();
      ctx.strokeStyle = '#FFF';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 1, startHoverStrokeHeight - 1, profileWidth + 2, profileHeight + 2);
      ctx.stroke();
    }
  }

  drawSeparatorLinearLayer(ctx, 'rgba(0,0,0,0.1)', MARGINS, width, topLayer + 1);

  ctx.restore();

  // Prevent overlapping with margins left and right
  ctx.clearRect(0, 0, MARGIN_LEFT, height);
  ctx.clearRect(width - MARGIN_RIGHT, 0, MARGIN_RIGHT, height);
};
