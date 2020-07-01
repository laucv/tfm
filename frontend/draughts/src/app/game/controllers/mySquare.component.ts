import {Component, Input} from '@angular/core';
import {MySquare} from '../models/mySquare';
import {DraughtsService} from '../draughts.service';
import {Error} from '../models/Error';

@Component({
  selector: 'app-board-square',
  templateUrl: '../views/mySquare.component.html',
  styleUrls: ['../views/mySquare.component.css']
})
export class MySquareComponent{

  @Input() public square: MySquare;

  constructor(private draughtsService: DraughtsService) {
  }

  userMoves(): Error{
   return this.draughtsService.userClicks(this.square.getPiece(), this.square.getRow(), this.square.getColumn());
  }
}
