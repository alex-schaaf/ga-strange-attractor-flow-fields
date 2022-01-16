const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

type Point = {
  x: number;
  y: number;
};
// ---------------------------------------------------------------
const nPoints = 75000;

// deJong attractor parameters
const a = 0.97;
const b = -1.9;
const c = 1.38;
const d = -1.5;

const scale = 200;
const thickness = 0.4;

canvas.style.background = "black";
ctx.fillStyle = "white";
ctx.lineWidth = 0.4;
// ---------------------------------------------------------------
let previousPoint = { x: 1, y: 1 } as Point;
ctx.translate(canvas.width / 2, canvas.height / 2);

for (let n = 0; n < nPoints; n++) {
  const point = {
    x: Math.sin(a * previousPoint.y) - Math.cos(b * previousPoint.x),
    y: Math.sin(c * previousPoint.x) - Math.cos(d * previousPoint.y),
  } as Point;

  ctx.moveTo(point.x * scale, point.y * scale);

  drawPoint(point);

  previousPoint = point;
}

/** Draw a given Point onto the canvas.
 *
 * https://stackoverflow.com/a/19669380/8040299
 * Different ways to draw a point on a canvas:
 *  - fill a tiny rectangle
 *  - draw a short line
 *  - draw a tiny circle using arc, computationally expensive
 *
 * @param p Point to draw onto the canvas.
 */
function drawPoint(p: Point) {
  ctx.beginPath();
  ctx.fillRect(p.x * scale, p.y * scale, thickness, thickness);
  ctx.stroke();
}
