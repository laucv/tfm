import {InteractorController} from "./InteractorController";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor";
import {Game} from "../models/Game";
import {State} from "../models/State";

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
