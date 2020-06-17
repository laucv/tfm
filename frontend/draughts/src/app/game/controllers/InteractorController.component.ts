import {Controller} from "./Controller.component";
import {Game} from "../models/Game.model";
import {State} from "../models/State.model";
import {Coordinate} from "../models/Coordinate.model";
import {Piece} from "../models/Piece.model";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor.component";

export abstract class InteractorController extends Controller {

  protected constructor(game: Game, state: State) {
    super(game, state);
  }

  public getPiece(coordinate: Coordinate): Piece {
    return this.game.getPiece(coordinate);
  }

  public abstract accept(controllersVisitor: InteractorControllersVisitor);
}
