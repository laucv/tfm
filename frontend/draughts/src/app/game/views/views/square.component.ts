import {Component, Input} from '@angular/core';
import {MySquare} from './mySquare';

@Component({
  selector: 'app-board-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent{

  @Input() square: MySquare;

  constructor() {
  }

  alert(){
    alert("row: " + this.square.getRow() + " column: " + this.square.getColumn());
  }
}
