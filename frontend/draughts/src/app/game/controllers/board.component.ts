import {Component, OnInit} from '@angular/core';
import {MySquare} from '../models/mySquare';
import {Color, colorValues} from '../models/Color';
import {GameService} from '../game.service';
import {DraughtsService} from '../../services/draughts.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogGameName} from '../views/dialog/DialogGameName.component';

@Component({
  selector: 'app-draughts',
  templateUrl: '../views/board.component.html',
  styleUrls: ['../views/board.component.css']
})
export class BoardComponent implements OnInit {

  boardDimension: MySquare[][];
  gameName: string;

  constructor(private gameService: GameService, private draughtsService: DraughtsService,
              private dialog: MatDialog) {
    this.gameName = null;
  }

  ngOnInit(): void {
    this.boardDimension = this.gameService.getBoardView();
  }

  getTurnColor(): Color {
    return colorValues()[this.gameService.getTurnColor()];
  }

  saveGame() {
    if (this.gameName === null) {
      this.openDialog();
    } else {
      this.draughtsService.put(this.gameName, this.gameService.toStringBoard(), this.gameService.getTurnColor()).subscribe(
        data => {
          alert('Game update');
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogGameName, {
      height: '250px',
      width: '250px',
      data: {gameName: this.gameName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.gameName = result;
      this.draughtsService.post(this.gameName, this.gameService.toStringBoard(), this.gameService.getTurnColor()).subscribe(
        data => {
          alert('Game saved');
        }
      );
    });
  }
}
