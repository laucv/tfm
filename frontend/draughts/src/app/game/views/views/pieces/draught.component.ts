import {Component, Input} from '@angular/core';
import {Draught} from '../../../models/Draught';

@Component({
  selector: 'draught',
  templateUrl: './draught.component.html'
})
export class DraughtComponent {
  @Input() draught: Draught;

}
