import {Component, OnInit} from '@angular/core';
import {Coordinate} from '../../models/Coordinate';
import {MySquare} from './mySquare';
import {Pawn} from '../../models/Pawn';
import {Color} from '../../models/Color';

@Component({
  selector: 'app-draughts',
  templateUrl: './draughts.component.html',
  styleUrls: ['./draughts.component.css']
})
export class DraughtsComponent implements OnInit {

  boardDimension: MySquare[][];

  ngOnInit(): void {
    this.boardDimension = [];
    for (let i = 0; i < Coordinate.getDimension(); i++) {
      this.boardDimension[i] = [];
      for (let j = 0; j < Coordinate.getDimension(); j++) {
        if (i % 2 === j % 2 ) {
          this.initialize(i, j);
        } else {
          this.boardDimension[i][j] = new MySquare(null, i, j);
        }
      }
    }
  }

  private initialize(row: number, column: number){
    if (row < 3) {
      this.boardDimension[row][column] = new MySquare(new Pawn(Color.BLACK), row, column);
    } else if (row > 4) {
      this.boardDimension[row][column] = new MySquare(new Pawn(Color.WHITE), row, column);
    } else {
      this.boardDimension[row][column] = new MySquare(null, row, column);
    }
  }

}
