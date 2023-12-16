export type ScoringEvent = "update" | "reset" | "end" | "add";
export type ScoringFunc = (
  scoringEvent: ScoringEvent,
  score: number,
) => void;
export type GameSettings = {
  fps: number;
  boardColor: Color;
  cellSize: number;
  boardRowCount: number;
  boardColCount: number;
  boardDepCount: number;
  timerId: number;
};

export type RGB = `rgb(${number},${number},${number})`;
export type HEX = `#${string}`;
export type Color = RGB | HEX | string;

export type AssetPosition = { x: number; y: number; z: number };
export type AssetDimension = { w: number; h: number; d: number };
