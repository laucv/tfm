import {MyConsole} from "../utils/MyConsole.component";

export class SubView{

  protected console: MyConsole;

  constructor() {
    this.console = new MyConsole();
  }
}
