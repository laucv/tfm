import {SubView} from "./SubView.component";
import {ResumeController} from "../controllers/ResumeController.component";
import {YesNoDialog} from "../utils/YesNoDialog.component";

export class ResumeView extends SubView{

  private static readonly MESSAGE: string = '¿Queréis jugar otra?';
  private yesNoDialog: YesNoDialog;

  constructor() {
    super();
    this.yesNoDialog = new YesNoDialog();
  }

  public interact(resumeController: ResumeController){
    if(resumeController !== null)
      if(this.yesNoDialog.read(ResumeView.MESSAGE))
        resumeController.reset();
      else
        resumeController.next();
  }

}
