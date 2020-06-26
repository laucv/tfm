import {Component, Input} from '@angular/core';
import {MySquare} from './mySquare';
import {DraughtsService} from '../../draughts.service';

@Component({
  selector: 'app-board-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent{

  @Input() square: MySquare;

  constructor(private draughtsService: DraughtsService) {
  }

  userMoves(){
    this.draughtsService.userClicks(this.square.getPiece(), this.square.getRow(), this.square.getColumn());
  }
}
