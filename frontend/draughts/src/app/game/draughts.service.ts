import {Injectable} from '@angular/core';
import {Piece} from './models/Piece';
import {Coordinate} from './models/Coordinate';
import {Game} from './models/Game';
import {Error, getError} from './models/Error';
import {MySquare} from './views/views/mySquare';
import {Pawn} from './models/Pawn';
import {Color, colorValues, getColorValue} from './models/Color';
import {Draught} from './models/Draught';
import {DirectionClass} from './models/DirectionClass';

@Injectable()
export class DraughtsService {

  private piece: Piece;
  private turn: Color;
  private coordinate: Coordinate;
  private game: Game;
  private boardView: MySquare[][];
  private pieceIsSelected: boolean;

  constructor() {
    this.game = new Game();
    this.piece = null;
    this.coordinate = null;
    this.pieceIsSelected = false;
    this.turn = this.game.getTurnColor();
    this.initBoard();
  }

  public getBoardView(): MySquare[][]{
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
      this.boardView[row][column] = new MySquare(new Pawn(Color.WHITE), row, column);
    } else {
      this.boardView[row][column] = new MySquare(null, row, column);
    }
  }

  public userClicks(piece: Piece, row: number, column: number) {
    if (piece !== null) {
      this.piece = piece;
      this.coordinate = new Coordinate(row, column);
      this.pieceIsSelected = true;
    } else if (piece === null && this.pieceIsSelected) {
      this.movePiece(new Coordinate(row, column));
    } else {
      this.pieceIsSelected = false;
    }
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

  public movePiece(target: Coordinate) {
    let error: Error = this.game.move([this.coordinate, target]);
    if (error === null) {
      this.getSquarePiece().clear();
      this.putPiece(target);
      let direction: DirectionClass = this.coordinate.getDirection(target);
      if (this.coordinate.getDiagonalCoordinate(direction, 2).equals(target)) {
        this.clearJumpedPiece(this.coordinate.getDiagonalCoordinate(direction, 1));
      }
      this.transformPawnToDraught(target);
      this.pieceIsSelected = false;
      this.turn = this.game.getTurnColor();
    } else {
      alert(getError(error));
    }
  }

  transformPawnToDraught(coordinate: Coordinate) {
    if (this.game.getPiece(coordinate).getCode() === 'N' && coordinate.isLast()) {
      this.boardView[coordinate.getRow()][coordinate.getColumn()].put(new Draught(Color.BLACK));
    } else if (this.game.getPiece(coordinate).getCode() === 'B' && coordinate.isFirst()) {
      this.boardView[coordinate.getRow()][coordinate.getColumn()].put(new Draught(Color.WHITE));
    }
  }

  clearJumpedPiece(coordinate: Coordinate) {
    this.boardView[coordinate.getRow()][coordinate.getColumn()].put(null);
  }

  getTurnColor(): Color {
    return colorValues()[this.turn];
  }
}
