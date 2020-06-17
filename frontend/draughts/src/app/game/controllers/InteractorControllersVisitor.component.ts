import {StartController} from "./StartController.component";
import {PlayController} from "./PlayController.component";
import {ResumeController} from "./ResumeController.component";

export interface InteractorControllersVisitor {

  visit(startController: StartController);
  visit(playController: PlayController);
  visit(resumeController: ResumeController);
}
