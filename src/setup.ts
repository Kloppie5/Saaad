import { Grid } from "./Model.js";

const spacingX = 80;
const spacingY = 50;

const originX = 60;
const originY = 40;

export function setup(svg: SVGSVGElement, grid: Grid, rerender: () => void) {
  let draggingId: string | null = null;

  function getPoint(e: MouseEvent) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM()!.inverse());
  }

  function hitTest(e: MouseEvent) {
    const p = getPoint(e);

    for (const b of grid.boxes) {
      const x = originX + b.col * spacingX;
      const y = originY + b.row * spacingY;

      if (Math.abs(p.x - x) < 20 && Math.abs(p.y - y) < 20) {
        return b;
      }
    }

    return null;
  }

  svg.addEventListener("mousedown", (e) => {
    const hit = hitTest(e);

    if (hit) {
      draggingId = hit.id;
      return;
    }

    const p = getPoint(e);

    const col = Math.round((p.x - originX) / spacingX);
    const row = Math.round((p.y - originY) / spacingY);

    grid.boxes.push({
      id: crypto.randomUUID(),
      col: Math.max(0, col),
      row: Math.max(0, row),
    });

    rerender();
  });

  svg.addEventListener("mousemove", (e) => {
    if (!draggingId) return;

    const p = getPoint(e);

    const col = Math.round((p.x - originX) / spacingX);
    const row = Math.round((p.y - originY) / spacingY);

    const box = grid.boxes.find(b => b.id === draggingId);
    if (!box) return;

    box.col = Math.max(0, col);
    box.row = Math.max(0, row);

    rerender();
  });

  svg.addEventListener("mouseup", () => {
    draggingId = null;
  });

  svg.addEventListener("mouseleave", () => {
    draggingId = null;
  });
}