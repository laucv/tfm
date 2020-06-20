import {SubView} from "./SubView.component";
import {InteractorController} from "../controllers/InteractorController";
import {Piece} from "../models/Piece";
import {Coordinate} from "../models/Coordinate";

export class GameView extends SubView{

  write(controller: InteractorController){
    if (controller !== null){
      const DIMENSION = controller.getDimension();
      this.writeNumbersLine(DIMENSION);
      for(let i = 0; i< DIMENSION; i++)
        this.writePiecesRow(i, controller);
      this.writeNumbersLine(DIMENSION);
    }
  }

  writeNumbersLine(dimension: number){
    this.console.write(" ");
    for (let i = 0; i < dimension; i++)
      this.console.write((i+1) + '');
    this.console.writeln();
  }

  writePiecesRow(row: number, controller: InteractorController){
    this.console.write((row + 1) + "");
    for (let j = 0; j < controller.getDimension(); j++) {
      let piece: Piece = controller.getPiece(new Coordinate(row, j));
      if (piece == null)
        this.console.write(" ");
      else
        this.console.write(piece.getCode());
    }
    this.console.writeAndLn((row + 1) + "\n");
  }
}
