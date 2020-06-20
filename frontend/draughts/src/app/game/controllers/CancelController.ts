import {Controller} from "./Controller";
import {Game} from "../models/Game";
import {State} from "../models/State";

export class CancelController extends Controller{

  constructor(game: Game, state: State) {
    super(game, state);
  }

  public cancel() {
    this.game.cancel();
    this.state.next();
  }
}
