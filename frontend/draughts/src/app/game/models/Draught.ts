import {Piece} from "./Piece";
import {Coordinate} from "./Coordinate";
import {Error} from "./Error";

export class Draught extends Piece {

  private static readonly CODES: string[] = ['B', 'N'];

  isCorrectDiagonalMovement(amountBetweenDiagonalPieces: number, pair: number, coordinates: Coordinate[]): Error {
    if (amountBetweenDiagonalPieces > 1)
      return Error.TOO_MUCH_EATINGS;
    return null;
  }

  getCode(): string {
    return Draught.CODES[this.color.valueOf()];
  }


}
