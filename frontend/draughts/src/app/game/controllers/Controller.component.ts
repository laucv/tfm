import {Game} from "../models/Game.model";
import {State} from "../models/State.model";
import {Coordinate} from "../models/Coordinate.model";
import {Color} from "../models/Color.model";

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
