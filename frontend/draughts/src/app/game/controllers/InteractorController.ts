import {Controller} from "./Controller";
import {Game} from "../models/Game";
import {State} from "../models/State";
import {Coordinate} from "../models/Coordinate";
import {Piece} from "../models/Piece";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor";

export abstract class InteractorController extends Controller {

  protected constructor(game: Game, state: State) {
    super(game, state);
  }

  public getPiece(coordinate: Coordinate): Piece {
    return this.game.getPiece(coordinate);
  }

  public abstract accept(controllersVisitor: InteractorControllersVisitor);
}
