export type ScoringEvent = "update" | "reset" | "end";
export type GameStatus = "loading" | "start" | "inprogress" | "end";
export type ScoringFunc = (
  scoringEvent: ScoringEvent,
  score: number,
) => void;
export type GameSettings<AssetNameList extends Array<string>> = {
  fps: number;
  assetColor: GameAssetsColor<AssetNameList>;
  cellSize: number;
  boardRowCount: number;
  boardColCount: number;
  timerId: number;
  scoringFunc: ScoringFunc;
};

export type Color = string;

export type GameAssetPosition = { x: number; y: number };
export type GameAssetVelocity = { vx: number; vy: number };
export type GameAssetDimension = { w: number; h: number };

export type GameAssetProperties = {
  initialPosition: GameAssetPosition;
  initialvelocity: GameAssetVelocity;
  unitSize: GameAssetDimension;
  multiBodyPosition: Array<GameAssetPosition>;
  position: GameAssetPosition;
  velocity: GameAssetVelocity;
  metaData: Record<string, any>;
  reset: () => void;
};

export type GameAssetsColor<AssetNameList extends Array<string>> = {
  [K in (AssetNameList extends ReadonlyArray<infer U> ? U : never)]: Color;
};

export type GameAssets<AssetNameList extends Array<string>> = {
  [K in (AssetNameList extends ReadonlyArray<infer U> ? U : never)]:
    GameAssetProperties;
};

export type GameStartFunc = (settings?: Partial<GameSettings<any>>) => void;
