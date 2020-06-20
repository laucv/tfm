import {SubView} from "./SubView.component";
import {PlayController} from "../controllers/PlayController";
import {Error} from "../models/Error";
import {GameView} from "./GameView.component";
import {Color} from "../models/Color";
import {Coordinate} from "../models/Coordinate";

export class PlayView extends SubView{
  private static readonly COLOR_PARAM: string = "#color";
  private static readonly COLOR_VALUES: string[] = ["blancas", "negras"];
  private static readonly PROMPT: string = "Mueven las " + PlayView.COLOR_PARAM + ": ";
  private static readonly CANCEL_FORMAT: string = "-1";
  private static readonly MOVEMENT_FORMAT: string = "[1-8]{2}(\\.[1-8]{2}){1,2}";
  private static readonly ERROR_MESSAGE: string = "Error!!! Formato incorrecto";
  private static readonly LOST_MESSAGE: string = "Derrota!!! No puedes mover tus fichas!!!";
  private string: string;

  constructor() {
    super();
  }

  interact(playController: PlayController){
    if(playController !== null){
      let error: Error;
      do{
        error = null;
        this.string = this.read(playController.getColor());
        if(this.isCancelledFormat())
          playController.cancel()
        else if(!this.isMoveFormat()) {
          error = Error.BAD_FORMAT;
          this.writeError();
        }
        else {
          error = playController.move(this.getCoordinates());
          new GameView().write(playController);
          if (error === null && playController.isBlocked())
            this.writeLost();
        }
      }while (error !== null);
    }
  }

  private read(color: Color): string{
    const titleColor: string = PlayView.PROMPT.replace(PlayView.COLOR_PARAM, PlayView.COLOR_VALUES[color.valueOf()]);
    return this.console.readString(titleColor);
  }

  private isCancelledFormat(): boolean{
    return this.string === PlayView.CANCEL_FORMAT;
  }

  private isMoveFormat(): boolean{
    const regEx = new RegExp(PlayView.MOVEMENT_FORMAT, "g");
    if(this.string.match(regEx) === null)
      return false;
    else
      return true;
  }

  private writeError(){
    this.console.writeAndLn(PlayView.ERROR_MESSAGE);
  }

  private getCoordinates(): Array<Coordinate>{
    if (this.isMoveFormat()){
      let coordinates: Array<Coordinate> = new Array<Coordinate>();
      while (this.string.length > 0 ){
        coordinates.push(Coordinate.getInstance(this.string.substring(0,2)))
        this.string = this.string.substring(2, this.string.length);
        if(this.string.length > 0 && this.string.charAt(0) === '.')
          this.string = this.string.substring(1, this.string.length);
      }
      return coordinates;
    }
  }

  private writeLost(){
    this.console.writeAndLn(PlayView.LOST_MESSAGE);
  }

}
