import {View} from "./views/View.component";
import {Logic} from "./controllers/Logic";
import {InteractorController} from "./controllers/InteractorController";

export class Draughts {

  private view: View;
  private logic: Logic;

  constructor() {
    this.view = new View();
    this.logic = new Logic();
  }

  private play(){
    let controller: InteractorController;
    do{
      controller = this.logic.getController();
      if (controller !== null)
        this.view.interaction(controller);
    } while (controller !== null);
  }

  public main() {
    new Draughts().play();
  }
}
