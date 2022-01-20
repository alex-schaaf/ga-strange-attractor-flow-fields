import { drawPointRect, clearCanvas, deJongAttractor } from "./utils";
import { DeJongParameters, Point } from "./types";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 800;
document.body.appendChild(canvas);

// ---------------------------------------------------------------
const animate = false;
const nPoints = 150000;

// deJong attractor parameters
const parameters: DeJongParameters = {
  a: -3.6,
  b: 1.34,
  c: 1.38,
  d: -1.5,
};

const scale = 200;
const thickness = 0.5;

canvas.style.background = "white";
ctx.fillStyle = "black";
ctx.strokeStyle = "black";

// ---------------------------------------------------------------

ctx.translate(canvas.width / 2, canvas.height / 2);

if (!animate) {
  drawAttractor();
} else {
  function step() {
    clearCanvas(ctx, canvas);
    drawAttractor();

    parameters.b -= 0.0035;

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

function drawAttractor() {
  // starting point position is basically irrelevant
  let previousPoint = { x: 0, y: 0 } as Point;

  for (let n = 0; n < nPoints; n++) {
    const nextPoint = deJongAttractor(previousPoint, parameters);

    ctx.moveTo(nextPoint.x * scale, nextPoint.y * scale);

    drawPointRect(ctx, nextPoint, scale, thickness);

    previousPoint = nextPoint;
  }
}
