import {InteractorController} from "./InteractorController";
import {Game} from "../models/Game";
import {State} from "../models/State";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor";

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
