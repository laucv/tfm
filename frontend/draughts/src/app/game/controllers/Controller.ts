import {Game} from "../models/Game";
import {State} from "../models/State";
import {Coordinate} from "../models/Coordinate";
import {Color} from "../models/Color";

export class Controller {

  protected game: Game;
  protected state: State;

  protected constructor(game: Game, state: State) {
    if(game !== null && state !== null){
      this.game = game;
      this.state = state;
    }
  }

  public getColor(coordinate: Coordinate): Color{
    if (coordinate !== null)
      return this.game.getColor(coordinate);
    return null;
  }

  public getDimension(): number{
    return this.game.getDimension();
  }

}
