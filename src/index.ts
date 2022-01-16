import { Point, drawPointRect, clearCanvas } from "./utils";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 800;
document.body.appendChild(canvas);

// ---------------------------------------------------------------
const animate = false;
const nPoints = 100000;

// deJong attractor parameters
const parameters = {
  a: -3.6,
  b: 1.3,
  c: 1.38,
  d: -1.5,
};

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

    parameters.b -= 0.0035;

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function drawAttractor() {
  let previousPoint = { x: 1, y: 1 } as Point;

  for (let n = 0; n < nPoints; n++) {
    const nextPoint = deJongAttractor(previousPoint, parameters);

    ctx.moveTo(nextPoint.x * scale, nextPoint.y * scale);

    drawPointRect(ctx, nextPoint, scale, thickness);

    previousPoint = nextPoint;
  }
}

interface DeJongParameters {
  a: number;
  b: number;
  c: number;
  d: number;
}

function deJongAttractor(p: Point, parameters: DeJongParameters): Point {
  return {
    x: Math.sin(parameters.a * p.y) - Math.cos(parameters.b * p.x),
    y: Math.sin(parameters.c * p.x) - Math.cos(parameters.d * p.y),
  };
}
