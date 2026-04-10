export type Box = {
  id: string;
  col: number;
  row: number;
};

export type Grid = {
  rows: number;
  cols: number;
  boxes: Box[];
};