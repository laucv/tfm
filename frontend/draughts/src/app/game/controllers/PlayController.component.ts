import {CancelController} from "./CancelController.component";
import {MoveController} from "./MoveController.component";
import {State} from "../models/State.model";
import {Game} from "../models/Game.model";
import {InteractorController} from "./InteractorController.component";
import {Coordinate} from "../models/Coordinate.model";
import {Error} from "../models/Error.model";
import {Color} from "../models/Color.model";
import {InteractorControllersVisitor} from "./InteractorControllersVisitor.component";

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
