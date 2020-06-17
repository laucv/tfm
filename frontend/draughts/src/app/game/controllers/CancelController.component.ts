import {Controller} from "./Controller.component";
import {Game} from "../models/Game.model";
import {State} from "../models/State.model";

export class CancelController extends Controller{

  constructor(game: Game, state: State) {
    super(game, state);
  }

  public cancel() {
    this.game.cancel();
    this.state.next();
  }
}
