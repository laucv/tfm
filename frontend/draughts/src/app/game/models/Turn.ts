import {Color, colorValues} from "./Color";

export class Turn {

  private color: Color;

  constructor() {
    this.color = Color.WHITE;
  }

  change(){
    this.color = this.getOppositeColor();
  }

  getOppositeColor(): Color{
    return colorValues()[(this.color.valueOf() + 1) % 2];
  }

  getColor() : Color{
    return this.color;
  }
}
