import {CancelController} from "./CancelController";
import {MoveController} from "./MoveController";
import {State} from "../models/State";
import {Game} from "../models/Game";
import {InteractorController} from "./InteractorController";
import {Coordinate} from "../models/Coordinate";
import {Error} from "../models/Error";
import {Color} from "../models/Color";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor";

export class PlayController extends InteractorController{

  private cancelController: CancelController;
  private moveController: MoveController;

  constructor(game: Game, state: State) {
    super(game, state);
    this.cancelController = new CancelController(game, state);
    this.moveController = new MoveController(game, state);
  }

  public move(coordinates: Array<Coordinate>): Error{
    return this.moveController.move(coordinates);
  }

  public cancel(){
    this.cancelController.cancel();
  }

  public getColor(): Color{
    return this.game.getTurnColor();
  }

  public isBlocked(): boolean{
    return this.game.isBlocked();
  }

  public accept(controllersVisitor: InteractorControllersVisitor) {
    if(controllersVisitor !== null)
      controllersVisitor.visit(this);
  }
}
