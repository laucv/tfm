import {Game} from "../models/Game.model";
import {State} from "../models/State.model";
import {StateValue} from "../models/StateValue.model";
import {InteractorController} from "./InteractorController.component";
import {StartController} from "./StartController.component";
import {PlayController} from "./PlayController.component";
import {ResumeController} from "./ResumeController.component";

export class Logic {

  private game: Game;
  private state: State;
  private controllers: Map<StateValue, InteractorController>;

  constructor() {
    this.game = new Game();
    this.state = new State();
    this.controllers = new Map<StateValue, InteractorController>();
    this.controllers.set(StateValue.INITIAL, new StartController(this.game, this.state));
    this.controllers.set(StateValue.IN_GAME, new PlayController(this.game, this.state));
    this.controllers.set(StateValue.FINAL, new ResumeController(this.game, this.state));
    this.controllers.set(StateValue.EXIT, null);
  }

  public getController(): InteractorController{
    return this.controllers.get(this.state.getValueState());
  }
}
