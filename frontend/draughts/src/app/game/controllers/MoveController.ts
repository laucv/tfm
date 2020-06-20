import {Controller} from "./Controller";
import {Game} from "../models/Game";
import {State} from "../models/State";
import {Error} from "../models/Error";
import {Coordinate} from "../models/Coordinate";

export class MoveController extends Controller {

  private static readonly MINIMUM_COORDINATES: number = 2;

  constructor(game: Game, state: State) {
    super(game, state);
  }

  public move(coordinates: Array<Coordinate>): Error {
    if (coordinates.length > MoveController.MINIMUM_COORDINATES) {
      for (let coordinate of coordinates)
        if (coordinate === null)
          return Error.BAD_FORMAT;
      let error: Error = this.game.move(coordinates);
      if (this.game.isBlocked())
        this.state.next();
      return error;
    }
  }
}
