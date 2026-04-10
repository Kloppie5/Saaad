import { Grid } from "./Model.js";

const spacingX = 80;
const spacingY = 50;

const originX = 60;
const originY = 40;

export function render(svg: SVGSVGElement, grid: Grid) {
  svg.innerHTML = "";

  for (let r = 0; r < grid.rows; r++) {
    const y = originY + r * spacingY;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "0");
    line.setAttribute("x2", "2000");
    line.setAttribute("y1", y.toString());
    line.setAttribute("y2", y.toString());
    line.setAttribute("stroke", "#999");

    svg.appendChild(line);
  }

  for (const b of grid.boxes) {
    const x = originX + b.col * spacingX;
    const y = originY + b.row * spacingY;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", (x - 15).toString());
    rect.setAttribute("y", (y - 15).toString());
    rect.setAttribute("width", "30");
    rect.setAttribute("height", "30");
    rect.setAttribute("fill", "white");
    rect.setAttribute("stroke", "black");

    rect.dataset.id = b.id;

    svg.appendChild(rect);
  }
}