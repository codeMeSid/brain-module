export type Assets = Array<string>;

export type ScoringEvent = "update" | "reset" | "end";
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

export type GameAssetPosition = { x: number; y: number };
export type GameAssetVelocity = { xv: number; yv: number };
export type GameAssetDimension = { w: number; h: number };

export type GameAssetProperties = {
  init_position: GameAssetPosition;
  init_velocity: GameAssetVelocity;
  color: Color;
  position: GameAssetPosition;
  velocity: GameAssetVelocity;
  metaData: Record<string, unknown>;
  reset: () => void;
};

export type GameAssets<AssetNameList extends Array<string>> = {
  [K in (AssetNameList extends ReadonlyArray<infer U> ? U : never)]:
    GameAssetProperties;
};

export type GameStartFunc = (settings?: Partial<GameSettings>) => void;
