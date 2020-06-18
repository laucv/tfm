import {SubView} from "./SubView.component";
import {StartController} from "../controllers/StartController.component";
import {GameView} from "./GameView.component";

export class StartView extends SubView{

  private static readonly TITLE: string = 'Draughts';

  constructor() {
    super();
  }

  interact(startController: StartController){
    if(startController !== null){
      this.console.writeAndLn(StartView.TITLE);
      new GameView().write(startController);
      startController.start();
    }
  }
}
