import {StartController} from "./StartController";
import {PlayController} from "./PlayController";
import {ResumeController} from "./ResumeController";

export interface InteractorControllersVisitor {

  visit(startController: StartController);
  visit(playController: PlayController);
  visit(resumeController: ResumeController);
}
