import { Component } from '@angular/core';
import {Draughts} from "./Draughts";

@Component({
  selector: 'app-draughts',
  templateUrl: './draughts.component.html'
})
export class DraughtsComponent {

  play(){
    new Draughts().main();
  }
}
