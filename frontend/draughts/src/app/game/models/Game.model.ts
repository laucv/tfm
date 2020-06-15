import {Board} from "./Board.model";
import {Turn} from "./Turn.model";
import {Coordinate} from "./Coordinate.model";
import {Color, colorGetInitialColor} from "./Color.model";
import {Piece} from "./Piece.model";
import {Pawn} from "./Pawn.model";
import {Error} from "./Error.model";
import {Draught} from "./Draught.model";

export class Game {

  private board: Board;
  private turn: Turn;

  constructor() {
    this.board = new Board();
    this.turn = new Turn();
    this.reset();
  }

  reset() {
    for (let i = 0; i < Coordinate.getDimension(); i++)
      for (let j = 0; j < Coordinate.getDimension(); j++) {
        let coordinate: Coordinate = new Coordinate(i, j);
        let color: Color = colorGetInitialColor(coordinate);
        let piece: Piece = null;
        if (color != null)
          piece = new Pawn(color);
        this.board.put(coordinate, piece);
      }
    if (this.turn.getColor() != Color.WHITE)
      this.turn.change();
  }

  move(coordinates: Array<Coordinate>): Error {
    let error: Error = null;
    let removedCoordinates: Array<Coordinate> = new Array<Coordinate>();
    let availablePiecesToJump: Array<Coordinate> = new Array<Coordinate>();
    let pair: number = 0;
    do {
      error = this.isCorrectPairMove(pair, coordinates);
      if (error === null) {
        availablePiecesToJump = this.board.getAvailablePiecesToJump(this.getTurnColor(), this.getCoordinatesWithActualColor());
        this.pairMove(removedCoordinates, pair, coordinates);
        pair++;
      }
    } while (pair < coordinates.length - 1 && error === null);
    error = this.isCorrectGlobalMove(error, removedCoordinates, coordinates);
    if (error == null) {
      if (removedCoordinates.length == 0 && availablePiecesToJump.length != 0)
        this.removeRandomPieceAfterNotEating(coordinates[0], coordinates[coordinates.length - 1], availablePiecesToJump);
      this.turn.change();
    } else
      this.unMovesUntilPair(removedCoordinates, pair, coordinates);
    return error;
  }

  private removeRandomPieceAfterNotEating(origin: Coordinate, lastTarget: Coordinate, coordinates: Array<Coordinate>) {
    const random: number = Math.random() * coordinates.length;
    if (coordinates[random] === origin)
      this.board.remove(lastTarget);
    else
      this.board.remove(coordinates[random]);
  }

  private isCorrectPairMove(pair: number, coordinates: Array<Coordinate>): Error {
    if (coordinates[pair] === null || coordinates[pair + 1] === null)
      return Error.BAD_FORMAT;
    if (this.board.isEmpty(coordinates[pair]))
      return Error.EMPTY_ORIGIN;
    if (this.turn.getOppositeColor() === this.board.getColor(coordinates[pair]))
      return Error.OPPOSITE_PIECE;
    if (!this.board.isEmpty(coordinates[pair + 1]))
      return Error.NOT_EMPTY_TARGET;
    let betweenDiagonalPieces: Array<Piece> = this.board.getBetweenDiagonalPieces(coordinates[pair], coordinates[pair + 1]);
    return this.board.getPiece(coordinates[pair]).isCorrectMovement(betweenDiagonalPieces, pair, coordinates);
  }

  private pairMove(removedCoordinates: Array<Coordinate>, pair: number, coordinates: Array<Coordinate>) {
    let forRemoving: Coordinate = this.getBetweenDiagonalPiece(pair, coordinates);
    if (forRemoving !== null) {
      removedCoordinates.unshift(forRemoving);
      this.board.remove(forRemoving);
    }
    this.board.move(coordinates[pair], coordinates[pair + 1]);
    if (this.board.getPiece(coordinates[pair + 1]).isLimit(coordinates[pair + 1])) {
      let color: Color = this.board.getColor(coordinates[pair + 1]);
      this.board.remove(coordinates[pair + 1]);
      this.board.put(coordinates[pair + 1], new Draught(color));
    }
  }

  private getBetweenDiagonalPiece(pair: number, coordinates: Array<Coordinate>): Coordinate {
    if (!coordinates[pair].isOnDiagonal(coordinates[pair + 1]))
      return null;
    let betweenCoordinates: Array<Coordinate> = coordinates[pair].getBetweenDiagonalCoordinates(coordinates[pair + 1]);
    if (betweenCoordinates.length === 0)
      return null;
    for (let coordinate of betweenCoordinates)
      if (this.getPiece(coordinate) !== null)
        return coordinate;
    return null;
  }

  private isCorrectGlobalMove(error: Error, removedCoordinates: Array<Coordinate>, coordinates: Array<Coordinate>): Error {
    if (error !== null)
      return error;
    if (coordinates.length > 2 && coordinates.length > removedCoordinates.length + 1)
      return Error.TOO_MUCH_JUMPS;
    return null;
  }

  private unMovesUntilPair(removedCoordinates: Array<Coordinate>, pair: number, coordinates: Array<Coordinate>) {
    for (let j = pair; j > 0; j--)
      this.board.move(coordinates[j], coordinates[j - 1]);
    for (let removedPiece of removedCoordinates)
      this.board.put(removedPiece, new Pawn(this.getOppositeTurnColor()));
  }

  public isBlocked(): boolean {
    for (let coordinate of this.getCoordinatesWithActualColor())
      if (!this.isBlockedCoordinate(coordinate))
        return false;
    return true;
  }

  private getCoordinatesWithActualColor(): Array<Coordinate> {
    let coordinates: Array<Coordinate> = new Array<Coordinate>()
    for (let i = 0; i < this.getDimension(); i++) {
      for (let j = 0; j < this.getDimension(); j++) {
        let coordinate: Coordinate = new Coordinate(i, j);
        let piece: Piece = this.getPiece(coordinate);
        if (piece != null && piece.getColor() == this.getTurnColor())
          coordinates.push(coordinate);
      }
    }
    return coordinates;
  }

  private isBlockedCoordinate(coordinate: Coordinate): boolean {
    let coordinateArray: Array<Coordinate> = new Array<Coordinate>();
    coordinateArray.push(coordinate);
    for (let i = 1; i <= 2; i++)
      for (let target of coordinate.getDiagonalCoordinates(i)) {
        coordinateArray.push(target);
        if (this.isCorrectPairMove(0, coordinateArray) == null)
          return false;
      }
    return true;
  }

  public cancel() {
    for (let coordinate of this.getCoordinatesWithActualColor())
      this.board.remove(coordinate);
    this.turn.change();
  }

  public getColor(coordinate: Coordinate): Color {
    if (coordinate === null)
      return null;
    return this.board.getColor(coordinate);
  }

  public getTurnColor(): Color{
    return this.turn.getColor();
  }

  public getOppositeTurnColor(): Color{
    return this.turn.getOppositeColor();
  }

  public getPiece(coordinate: Coordinate): Piece{
    if(coordinate === null)
      return null;
    return this.board.getPiece(coordinate);
  }

  public getNumberOfPieces(color: Color): number {
    return this.board.getNumberOfPieces(color);
  }

  public getDimension(): number{
    return Coordinate.getDimension();
  }
}
