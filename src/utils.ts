export type Point = {
  x: number;
  y: number;
};

export function drawPointRect(
  ctx: CanvasRenderingContext2D,
  p: Point,
  scale: number,
  thickness: number
) {
  ctx.beginPath();
  ctx.fillRect(p.x * scale, p.y * scale, thickness, thickness);
  ctx.stroke();
}

export function drawPointLine(
  ctx: CanvasRenderingContext2D,
  p: Point,
  scale: number
) {
  ctx.beginPath();
  const x = p.x * scale;
  const y = p.y * scale;
  ctx.moveTo(x, y);
  ctx.lineTo(x + 1, y + 1);
  ctx.stroke();
}

export function drawPointCircle(
  ctx: CanvasRenderingContext2D,
  p: Point,
  scale: number,
  thickness: number
) {
  ctx.beginPath();
  ctx.arc(p.x * scale, p.y * scale, thickness, 0, 2 * Math.PI);
  ctx.stroke();
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
}
