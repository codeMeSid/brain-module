import {
  Color,
  GameAssetDimension,
  GameAssetPosition,
  GameAssets,
  GameSettings,
  ScoringFunc,
} from "../types";

export abstract class GameDirector2<
  AssetNameList extends Array<string>,
  GameMetaDataList extends Array<string>,
> {
  // game control
  protected abstract _game_settings: GameSettings;
  // board
  protected abstract _board: CanvasRenderingContext2D;
  // assets
  protected abstract _game_asset: GameAssets<AssetNameList, GameMetaDataList>;
  // constructor
  constructor() {
    this._init_ = this._init_.bind(this);
    this._start_ = this._start_.bind(this);
    this._handleInput_ = this._handleInput_.bind(this);
    this._checkGameOver_ = this._checkGameOver_.bind(this);
    this._drawBoard_ = this._drawBoard_.bind(this);
    this.generateRandomPosition = this.generateRandomPosition.bind(this);
    this.renderOnBoard = this.renderOnBoard.bind(this);
  }
  // game methods
  public abstract _init_(
    boardRef: HTMLCanvasElement,
    scorer: ScoringFunc,
  ): void; //: GameInitFunc;
  public abstract _start_(settings?: Partial<GameSettings>): void;
  protected abstract _handleInput_(ev: KeyboardEvent): void;
  protected abstract _checkGameOver_(): void;
  protected abstract _drawBoard_(): void;
  protected abstract _checkGameStatus_(): void;
  protected generateRandomPosition = (): GameAssetPosition => ({
    x: Math.floor(Math.random() * this._game_settings.boardColCount) *
      this._game_settings.cellSize,
    y: Math.floor(Math.random() * this._game_settings.boardRowCount) *
      this._game_settings.cellSize,
  });
  protected renderOnBoard = (
    color: Color,
    position: GameAssetPosition,
    dimension: GameAssetDimension,
    radius: number = 16,
  ) => {
    if (!this._board) {
      console.error("Board Not Recognised");
      return;
    }
    this._board.fillStyle = color;
    this._board.beginPath();
    this._board.roundRect(
      position.x,
      position.y,
      dimension.w,
      dimension.h,
      radius,
    );
    this._board.stroke();
    this._board.fill();
  };
}
