import {Piece} from "./Piece.model";
import {Coordinate} from "./Coordinate.model";
import {Color} from "./Color.model";
import {Direction} from "./Direction.model";
import {Pawn} from "./Pawn.model";

export class Board {

  private pieces: Piece[][];

  private static readonly MAXIMUM_LIMIT_TO_JUMP = Coordinate.getDimension() - 2;

  private static readonly MINIMUM_LIMIT_TO_JUMP = 1;

  constructor() {
    for (let i = 0; i < Coordinate.getDimension(); i++)
      for (let j = 0; j < Coordinate.getDimension(); j++)
        this.pieces[i][j] = null;
  }

  getPiece(coordinate: Coordinate): Piece {
    if (coordinate === null)
      return null;
    return this.pieces[coordinate.getRow()][coordinate.getColumn()];
  }

  put(coordinate: Coordinate, piece: Piece) {
    if (coordinate === null)
      this.pieces[coordinate.getRow()][coordinate.getColumn()] = piece;
  }

  remove(coordinate: Coordinate): Piece {
    if (this.getPiece(coordinate) === null)
      return null;
    let piece: Piece = this.getPiece(coordinate);
    this.put(coordinate, null);
    return piece;
  }

  move(origin: Coordinate, target: Coordinate) {
    if (this.getPiece(origin) !== null)
      this.put(target, this.remove(origin))
  }

  getBetweenDiagonalPieces(origin: Coordinate, target: Coordinate): Array<Piece> {
    let betweenDiagonalPieces: Array<Piece> = new Array<Piece>();
    if (origin.isOnDiagonal(target))
      for (let coordinate of origin.getBetweenDiagonalCoordinates(target)) {
        let piece: Piece = this.getPiece(coordinate);
        if (piece != null)
          betweenDiagonalPieces.push(piece);
      }
    return betweenDiagonalPieces;
  }

  getColor(coordinate: Coordinate): Color{
    const piece: Piece = this.getPiece(coordinate);
    if(piece === null)
      return null;
    return piece.getColor();
  }

  isEmpty(coordinate: Coordinate): boolean{
    return this.getPiece(coordinate) === null;
  }

  getAvailablePiecesToJump(color: Color, coordinates: Array<Coordinate>): Array<Coordinate>{
    let availablePiecesToJump: Array<Coordinate> = new Array<Coordinate>();
    for (let coordinate of coordinates)
      this.checkDiagonals(availablePiecesToJump, color, coordinate);
    return availablePiecesToJump;
  }

  checkDiagonals(availablePiecesToJump: Array<Coordinate>, color: Color, coordinate: Coordinate){
    if (color === Color.WHITE && coordinate.getRow() > Board.MINIMUM_LIMIT_TO_JUMP) {
      if (coordinate.getColumn() < Board.MAXIMUM_LIMIT_TO_JUMP && this.jumpIsPossible(coordinate, Direction.SE))
        availablePiecesToJump.push(coordinate);
      if (coordinate.getColumn() > Board.MINIMUM_LIMIT_TO_JUMP && this.jumpIsPossible(coordinate, Direction.SW))
        availablePiecesToJump.push(coordinate);
    }
    if (color === Color.BLACK && coordinate.getRow() < Board.MAXIMUM_LIMIT_TO_JUMP) {
      if (coordinate.getColumn() > Board.MINIMUM_LIMIT_TO_JUMP && this.jumpIsPossible(coordinate, Direction.NW))
        availablePiecesToJump.push(coordinate);
      if (coordinate.getColumn() < Board.MAXIMUM_LIMIT_TO_JUMP && this.jumpIsPossible(coordinate, Direction.NE))
        availablePiecesToJump.push(coordinate);
    }
  }

  jumpIsPossible(coordinate: Coordinate, direction: Direction): boolean{
    return this.getPiece(coordinate.getDiagonalCoordinate(direction, 1)) != null
      && this.getColor(coordinate.getDiagonalCoordinate(direction, 1)) !== this.getColor(coordinate)
      && this.getPiece(coordinate.getDiagonalCoordinate(direction, 2)) == null;
  }

  getNumberOfPieces(color: Color): number{
    let result: number = 0;
    for (let i: number = 0; i < Coordinate.getDimension(); i++)
    for (let j: number = 0; j < Coordinate.getDimension(); j++)
    if (this.pieces[i][j] != null)
      if (this.pieces[i][j].getColor() === color)
        result++;
    return result;
  }


}
