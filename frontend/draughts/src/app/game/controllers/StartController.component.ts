import {InteractorController} from "./InteractorController.component";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor.component";
import {Game} from "../models/Game.model";
import {State} from "../models/State.model";

export class StartController extends InteractorController{

  constructor(game: Game, state: State) {
    super(game, state);
  }

  public start(){
    this.state.next();
  }

  public accept(controllersVisitor: InteractorControllersVisitor) {
    if(controllersVisitor !== null)
      controllersVisitor.visit(this);
  }
}
