import { Point, drawPointRect, clearCanvas } from "./utils";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 800;
document.body.appendChild(canvas);

// ---------------------------------------------------------------
const animate = false;
const nPoints = 40000;

// deJong attractor parameters
let a = -3.32;
let b = 1;
let c = 1.38;
let d = -1.5;

const scale = 200;
const thickness = 0.5;

canvas.style.background = "black";
ctx.fillStyle = "#EFEFEF";
ctx.strokeStyle = "#EFEFEF";

// ---------------------------------------------------------------

ctx.translate(canvas.width / 2, canvas.height / 2);

if (!animate) {
  drawAttractor();
} else {
  function step(timestamp: number) {
    clearCanvas(ctx, canvas);
    drawAttractor();

    b -= 0.0035;

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function drawAttractor() {
  let previousPoint = { x: 1, y: 1 } as Point;

  for (let n = 0; n < nPoints; n++) {
    const point = {
      x: Math.sin(a * previousPoint.y) - Math.cos(b * previousPoint.x),
      y: Math.sin(c * previousPoint.x) - Math.cos(d * previousPoint.y),
    } as Point;

    ctx.moveTo(point.x * scale, point.y * scale);

    drawPointRect(ctx, point, scale, thickness);

    previousPoint = point;
  }
}
