import {Injectable} from '@angular/core';
import {Piece} from './models/Piece';
import {Coordinate} from './models/Coordinate';
import {Game} from './models/Game';
import {Error, getErrorValues} from './models/Error';
import {MySquare} from './models/mySquare';
import {Pawn} from './models/Pawn';
import {Color, colorValues} from './models/Color';
import {Draught} from './models/Draught';
import {DirectionClass} from './models/DirectionClass';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private piece: Piece;
  private turn: Color;
  private coordinate: Coordinate;
  private game: Game;
  private boardView: MySquare[][];
  private pieceIsSelected: boolean;
  private multiJump: boolean;

  constructor() {
    this.game = new Game();
    this.piece = null;
    this.coordinate = null;
    this.pieceIsSelected = false;
    this.turn = this.game.getTurnColor();
    this.multiJump = false;
    this.initBoard();
  }

  public getBoardView(): MySquare[][] {
    return this.boardView;
  }

  public initBoard() {
    this.boardView = [];
    for (let i = 0; i < Coordinate.getDimension(); i++) {
      this.boardView[i] = [];
      for (let j = 0; j < Coordinate.getDimension(); j++) {
        if (i % 2 !== j % 2) {
          this.initialize(i, j);
        } else {
          this.boardView[i][j] = new MySquare(null, i, j);
        }
      }
    }
  }

  private initialize(row: number, column: number) {
    if (row < 3) {
      this.boardView[row][column] = new MySquare(new Pawn(Color.BLACK), row, column);
    } else if (row > 4) {
      this.boardView[row][column] = new MySquare(new Pawn(Color.RED), row, column);
    } else {
      this.boardView[row][column] = new MySquare(null, row, column);
    }
  }

  private clearHighlightedPiece() {
    if (this.coordinate !== null && !this.multiJump) {
      this.boardView[this.coordinate.getRow()][this.coordinate.getColumn()].setSelected(false);
    }
  }

  public userClicks(piece: Piece, row: number, column: number): Error {
    this.clearHighlightedPiece();
    if (piece !== null && !this.multiJump) {
      this.boardView[row][column].setSelected(true);
      this.piece = piece;
      this.coordinate = new Coordinate(row, column);
      this.pieceIsSelected = true;
    } else if (piece === null && this.pieceIsSelected) {
      return this.movePiece(new Coordinate(row, column));
    } else if (this.multiJump) {
      this.boardView[this.coordinate.getRow()][this.coordinate.getColumn()].setSelected(true);
    } else {
      this.pieceIsSelected = false;
    }
    return null;
  }

  private getSquarePiece(): MySquare {
    let mySquare: MySquare = null;

    this.boardView.forEach(row => row.forEach(square => {
      if (square.getPiece() === this.piece) {
        mySquare = square;
      }
    }));

    return mySquare;
  }

  private putPiece(coordinate: Coordinate) {
    this.boardView[coordinate.getRow()][coordinate.getColumn()].put(this.piece);
  }

  private movePiece(target: Coordinate): Error {
    let error: Error = this.game.move([this.coordinate, target]);
    if (error === null) {
      this.getSquarePiece().clearPiece();
      this.putPiece(target);
      let direction: DirectionClass = this.coordinate.getDirection(target);
      if (this.coordinate.getDiagonalCoordinate(direction, 2).equals(target)) {
        this.clearJumpedPiece(this.coordinate.getDiagonalCoordinate(direction, 1));
      }
      this.multiJump = this.game.isMultiJumpPossible(target) && this.coordinate.getDiagonalDistance(target) === 2;
      if (this.multiJump) {
        this.boardView[this.coordinate.getRow()][this.coordinate.getColumn()].setSelected(false);
        this.boardView[target.getRow()][target.getColumn()].setSelected(true);
        this.game.changeTurnToAllowMultiJump();
        this.coordinate = target;
        return;
      } else {
        this.transformPawnToDraught(target);
        this.pieceIsSelected = false;
        this.boardView[this.coordinate.getRow()][this.coordinate.getColumn()].setSelected(false);
        this.turn = this.game.getTurnColor();
      }
    } else {
      alert(getErrorValues()[error]);
    }
    if (this.game.isBlocked()) {
      alert('Fin del juego, el ganador es: ' + colorValues()[this.game.getOppositeTurnColor()]);
    }
    return error;
  }

  private transformPawnToDraught(coordinate: Coordinate) {
    if (this.game.getPiece(coordinate).getCode() === 'N' && coordinate.isLast()) {
      this.boardView[coordinate.getRow()][coordinate.getColumn()].put(new Draught(Color.BLACK));
    } else if (this.game.getPiece(coordinate).getCode() === 'B' && coordinate.isFirst()) {
      this.boardView[coordinate.getRow()][coordinate.getColumn()].put(new Draught(Color.RED));
    }
  }

  private clearJumpedPiece(coordinate: Coordinate) {
    this.boardView[coordinate.getRow()][coordinate.getColumn()].put(null);
  }

  public getTurnColor(): Color {
    return this.turn;
  }

  public getPiece(): Piece {
    return this.piece;
  }

  public isPieceSelected(): boolean {
    return this.pieceIsSelected;
  }

  public isMultiJump(): boolean {
    return this.multiJump;
  }

  public setPiece(piece: Piece, row: number, column: number) {
    this.boardView[row][column].setPiece(piece);
    this.game.changePiece(piece, row, column);
  }

  public getNumberOfPieces(color: Color): number{
    return this.game.getNumberOfPieces(color);
  }

  public toStringBoard(): string{
    let string: string = '';
    for (let i = 0; i < Coordinate.getDimension(); i++)
      for (let j = 0; j <Coordinate.getDimension(); j++){
        if(this.boardView[i][j].getPiece() === null)
          string += '_';
        else
          string += this.boardView[i][j].getPiece().getCode();
      }
    return string;
  }

}
