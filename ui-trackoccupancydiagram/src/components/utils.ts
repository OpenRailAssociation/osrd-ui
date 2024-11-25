import { type TickPattern } from './types';

type DrawTextType = {
  ctx: CanvasRenderingContext2D;
  text: string;
  x: number;
  y: number;
  color: string;
  xPosition?: 'left' | 'center' | 'right';
  yPosition?: 'top' | 'middle' | 'bottom';
  font?: string;
  rotateAngle?: number;
  stroke?: {
    color: string;
    width: number;
  };
};

export const drawText = ({
  ctx,
  text,
  x,
  y,
  color,
  xPosition = 'left',
  yPosition = 'bottom',
  font = '400 12px IBM Plex Sans',
  rotateAngle,
  stroke,
}: DrawTextType) => {
  ctx.save();
  ctx.translate(x, y);
  if (rotateAngle) ctx.rotate((rotateAngle * Math.PI) / 180);

  ctx.font = font;
  ctx.textAlign = xPosition;
  ctx.textBaseline = yPosition;
  ctx.fillStyle = color;
  if (stroke) {
    ctx.lineWidth = stroke.width;
    ctx.strokeStyle = stroke.color;
    ctx.strokeText(text, 0, 0);
  }
  ctx.fillText(text, 0, 0);

  ctx.restore();
};

export const getTickPattern = (minutes: string) => {
  let tickPattern: TickPattern = 'MINUTE';
  switch (minutes) {
    case '00':
      tickPattern = 'HOUR';
      break;
    case '30':
      tickPattern = 'HALF_HOUR';
      break;
    case '15':
    case '45':
      tickPattern = 'QUARTER_HOUR';
      break;
    case '05':
    case '10':
    case '20':
    case '25':
    case '35':
    case '40':
    case '50':
    case '55':
      tickPattern = 'FIVE_MINUTES';
      break;
    default:
      tickPattern = 'MINUTE';
      break;
  }

  return tickPattern;
};
