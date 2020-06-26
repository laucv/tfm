import {Component, OnInit} from '@angular/core';
import {Coordinate} from '../../models/Coordinate';
import {MySquare} from './mySquare';
import {Pawn} from '../../models/Pawn';
import {Color} from '../../models/Color';
import {DraughtsService} from '../../draughts.service';

@Component({
  selector: 'app-draughts',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
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
