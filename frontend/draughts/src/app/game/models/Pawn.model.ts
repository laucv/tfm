import {Piece} from "./Piece.model";
import {Color} from "./Color.model";
import {Coordinate} from "./Coordinate.model";
import {Error} from "./Error.model";

export class Pawn extends Piece{

  private static readonly CHARACTERS: string[] = ['b', 'n'];
  private static readonly MAX_DISTANCE: number = 2;

  constructor(color: Color) {
    super(color);
  }

  isCorrectDiagonalMovement(amountBetweenDiagonalPieces: number, pair: number, coordinates: Coordinate[]): Error {
    if (!this.isAdvanced(coordinates[pair], coordinates[pair+1]))
      return Error.NOT_ADVANCED;
    let  distance: number = coordinates[pair].getDiagonalDistance(coordinates[pair+1]);
    if (distance > Pawn.MAX_DISTANCE)
      return Error.TOO_MUCH_ADVANCED;
    if (distance == Pawn.MAX_DISTANCE && amountBetweenDiagonalPieces != 1)
      return Error.WITHOUT_EATING;
    return null;
  }
}
