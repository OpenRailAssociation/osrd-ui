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
