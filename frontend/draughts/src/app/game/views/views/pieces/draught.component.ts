import {Component, Input} from '@angular/core';
import {Draught} from '../../../models/Draught';
import {Color} from '../../../models/Color';

@Component({
  selector: 'draught',
  templateUrl: './draught.component.html',
  styleUrls: ['./piece.component.css']
})
export class DraughtComponent {
  @Input() draught: Draught;
  BLACK = Color.BLACK;
  WHITE = Color.WHITE;
}
