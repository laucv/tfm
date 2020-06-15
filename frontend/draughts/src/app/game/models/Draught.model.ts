import {Piece} from "./Piece.model";
import {Coordinate} from "./Coordinate.model";
import {Error} from "./Error.model";

export class Draught extends Piece {

  isCorrectDiagonalMovement(amountBetweenDiagonalPieces: number, pair: number, coordinates: Coordinate[]): Error {
    if (amountBetweenDiagonalPieces > 1)
      return Error.TOO_MUCH_EATINGS;
    return null;
  }

}
