import {InteractorController} from "./InteractorController.component";
import {Game} from "../models/Game.model";
import {State} from "../models/State.model";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor.component";

export class ResumeController extends InteractorController{

  constructor(game: Game, state: State) {
    super(game, state);
  }

  public next(){
    this.state.next();
  }

  public reset(){
    this.state.reset();
    this.game.reset();
  }

  public accept(controllersVisitor: InteractorControllersVisitor) {
    if(controllersVisitor !== null)
      controllersVisitor.visit(this);
  }
}
