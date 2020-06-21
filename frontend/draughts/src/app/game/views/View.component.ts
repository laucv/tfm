import {InteractorControllersVisitor} from "../controllers/InteractorControllersVisitor";
import {StartController} from "../controllers/StartController";
import {PlayController} from "../controllers/PlayController";
import {ResumeController} from "../controllers/ResumeController";
import {InteractorController} from "../controllers/InteractorController";
import {ResumeView} from "./ResumeView.component";
import {PlayView} from "./PlayView.component";
import {StartView} from "./StartView.component";

export class View implements InteractorControllersVisitor {

  private startView;
  private playView;
  private resumeView;

  constructor() {
    this.startView = new StartView();
    this.resumeView = new ResumeView();
    this.playView = new PlayView();
  }

  public interaction(controller: InteractorController) {
    if (controller !== null)
      controller.accept(this);
  }

  visit(controller: StartController | PlayController | ResumeController) {
    if (controller !== null) {
      if (typeof controller === typeof StartController)
        this.startView.interact(controller);
      else if (typeof controller === typeof PlayController)
        this.playView.interact(controller);
      else if (typeof controller === typeof ResumeController)
        this.resumeView.interact(controller);
    }

  }

}