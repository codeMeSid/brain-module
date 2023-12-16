type ScoringEvent = "update" | "reset" | "end";
type ScoringFunc = (
  scoringEvent: ScoringEvent,
  score: number,
) => void;
type GameSettings = {
  fps: number;
  boardColor: Color;
  cellSize: number;
  boardRowCount: number;
  boardColCount: number;
  boardDepCount: number;
  timerId: number;
};

type RGB = `rgb(${number},${number},${number})`;
type HEX = `#${string}`;
type Color = RGB | HEX | string;

export type AssetPosition = { x: number; y: number; z: number };
export type AssetDimension = { w: number; h: number; d: number };

export abstract class GameDirector {
  // game
  protected abstract _game_settings: GameSettings;
  // asset
  protected abstract _game_asset_init_data: Record<string, AssetPosition>;
  protected abstract _game_asset_postion: Record<string, AssetPosition>;
  protected abstract _game_asset_velocity: Record<string, AssetPosition>;
  // board
  protected abstract _board: CanvasRenderingContext2D;
  // game physics
  protected abstract _scoring_func: ScoringFunc;
  // cosntructor
  constructor() {
    window.addEventListener("keydown", this._handleInput_, false);
  }
  // game methods

  // to initialize the game defaults
  public abstract _init_(
    boardRef: HTMLCanvasElement,
    scorer?: ScoringFunc,
    settings?: Partial<GameSettings>,
  ): void;
  // to start the game
  public abstract _start_(updatedSettings?: Partial<GameSettings>): void;
  // to reset the game
  public abstract _reset_(): void;
  // game over
  protected abstract _gameOver_(): void;
  // to draw the board
  protected abstract drawBoard(boardColor: Color): void;
  // handle Movement
  protected abstract _handleInput_(ev: KeyboardEvent): void;
  // to remove all event listeners
  protected _remove_eventListeners = () => {
    window.removeEventListener("keydown", this._handleInput_, false);
    if (this._game_settings.timerId) clearInterval(this._game_settings.timerId);
  };
  // to generate random number within confines of board
  protected randomAssetPosition(): AssetPosition {
    return {
      x: Math.floor(Math.random() * this._game_settings.boardColCount) *
        this._game_settings.cellSize,
      y: Math.floor(Math.random() * this._game_settings.boardRowCount) *
        this._game_settings.cellSize,
      z: Math.floor(Math.random() * this._game_settings.boardDepCount) *
        this._game_settings.cellSize,
    };
  }
  // to generate random number
  protected random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  // draw asset
  protected drawAsset = (
    assetFillColor: Color,
    assetPosition: AssetPosition,
    assetDimension: AssetDimension,
    radius = 16,
  ) => {
    if (!this._board) {
      console.error("Board Not Recognised");
      return;
    }
    this._board.fillStyle = assetFillColor;
    this._board.beginPath();
    this._board.roundRect(
      assetPosition.x,
      assetPosition.y,
      assetDimension.w,
      assetDimension.h,
      radius,
    );
    this._board.stroke();
    this._board.fill();
  };
}
