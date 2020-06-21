import {Piece} from '../../models/Piece';

export class MySquare{
  private row: number;
  private column: number;
  private piece: Piece;

  constructor(piece: Piece, row: number, column: number) {
    this.row = row;
    this.column = column;
    this.piece = piece;
  }

  getRow(): number{
    return this.row;
  }

  getColumn(): number{
    return this.column;
  }

  public getPiece(): Piece{
    return this.piece;
  }
}
