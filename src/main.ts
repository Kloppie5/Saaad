import { render } from "./render.js";
import { setup } from "./setup.js";

function getSvg(id: string): SVGSVGElement {
  const el = document.getElementById(id);
  if (!(el instanceof SVGSVGElement)) {
    throw new Error(`Element #${id} is not an SVG`);
  }
  return el;
}

const svg = getSvg("circuit");

const grid = {
  rows: 5,
  cols: 10,
  boxes: [],
};

function rerender() {
  render(svg, grid);
}

setup(svg, grid, rerender);

rerender();