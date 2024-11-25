import { drawTrack } from './drawTrack';
import { timeScaleSample } from '../../../sample/timeScale';
import { type Track } from '../../types';

export function getTimeToPixel(
  timeOrigin: number,
  pixelOffset: number,
  timeScale: number
): (time: number) => number {
  return (time: number) => pixelOffset + (time - timeOrigin) / timeScale;
}

const drawBackground = ({
  ctx,
  xStart,
  width,
  height,
  switchBackground,
}: {
  ctx: CanvasRenderingContext2D;
  xStart: number;
  width: number;
  height: number;
  switchBackground: boolean;
}) => {
  if (xStart >= 0) {
    ctx.clearRect(xStart, 0, width, height);
    ctx.fillStyle = switchBackground ? 'rgba(243, 248, 253, 0.5)' : 'rgb(255, 255, 255)';
    ctx.fillRect(xStart, 0, width, height);
  }
};

type DrawTracksProps = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  tracks: Track[] | undefined;
  getTimePixel: (time: number) => number;
};

export const drawTracks = ({ ctx, width, height, tracks, getTimePixel }: DrawTracksProps) => {
  ctx.clearRect(0, 0, width, height);

  let switchBackground = false;
  timeScaleSample.forEach((time) => {
    const date = new Date(+time);
    const minutes = date.getMinutes().toString().padStart(2, '0');

    switch (minutes) {
      case '00':
        switchBackground = !switchBackground;
        drawBackground({ ctx, xStart: getTimePixel(+time), width, height, switchBackground });
        break;
      default:
        return;
    }
  });

  tracks?.forEach((_, index) => {
    const trackTranslate = index === 0 ? 8 : 73;
    ctx.translate(0, trackTranslate);
    drawTrack({ ctx, width, getTimePixel });
  });
};
