import {Component, OnInit} from '@angular/core';
import {MySquare} from '../models/mySquare';
import {Color} from '../models/Color';
import {DraughtsService} from '../draughts.service';

@Component({
  selector: 'app-draughts',
  templateUrl: '../views/board.component.html',
  styleUrls: ['../views/board.component.css']
})
export class BoardComponent implements OnInit {

  boardDimension: MySquare[][];

  constructor(private draughtsService: DraughtsService) {
  }

  ngOnInit(): void {
    this.boardDimension = this.draughtsService.getBoardView();
  }

  getTurnColor(): Color{
    return this.draughtsService.getTurnColor();
  }
}
