import {MyConsole} from "./MyConsole";

export class YesNoDialog {

  private static readonly AFIRMATIVE: string = 'y';
  private static readonly NEGATIVE: string = 'n';
  private static readonly QUESTION: string = '? ('+YesNoDialog.AFIRMATIVE+'/'+YesNoDialog.NEGATIVE+'): ';
  private static readonly ERROR: string = 'The value must be "' + YesNoDialog.AFIRMATIVE + '" or "' +
    YesNoDialog.NEGATIVE + '"';
  private console: MyConsole;

  constructor() {
    this.console = new MyConsole();
  }

  read(title: string): boolean{
    if(title !== null){
      let answer: string;
      let ok: boolean;
      do{
        answer = this.console.readChar(title + YesNoDialog.QUESTION);
        ok = YesNoDialog.isAfirmative(answer) || YesNoDialog.isNegative(answer);
      } while (!ok);
      return YesNoDialog.isAfirmative(answer);
    }
  }

  private static isAfirmative(answer: string): boolean{
    return answer.toLowerCase() === YesNoDialog.AFIRMATIVE;
  }

  private static isNegative(answer: string): boolean{
    return answer.toLowerCase() === YesNoDialog.NEGATIVE;
  }
}
