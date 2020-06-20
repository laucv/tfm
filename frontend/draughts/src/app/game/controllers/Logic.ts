import {Game} from "../models/Game";
import {State} from "../models/State";
import {StateValue} from "../models/StateValue";
import {InteractorController} from "./InteractorController";
import {StartController} from "./StartController";
import {PlayController} from "./PlayController";
import {ResumeController} from "./ResumeController";

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
