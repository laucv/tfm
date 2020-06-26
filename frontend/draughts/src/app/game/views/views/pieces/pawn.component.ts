import {Component, Input} from '@angular/core';
import {Pawn} from '../../../models/Pawn';
import {Color} from '../../../models/Color';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./piece.component.css']
})
export class PawnComponent {
  @Input() pawn: Pawn;
  BLACK = Color.BLACK;
  WHITE = Color.WHITE;
}
