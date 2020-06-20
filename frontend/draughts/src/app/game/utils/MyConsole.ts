export class MyConsole {

  public readString(title: string): string {
    let input: string = null;
    let ok: boolean = false;
    do {
      try {
        input = prompt(title);
        ok = true
      } catch (e) {
        this.writeError('de cadena de caracteres');
      }
    } while (!ok)
    return input;
  }

  public readChar(title: string): string {
    let charValue: string = ' ';
    let ok: boolean = false;
    do {
      let input: string = this.readString(title);
      if (input.length != 1)
        this.writeError('caracter');
      else {
        charValue = input.charAt(0);
        ok = true;
      }
    } while (!ok);
    return charValue;
  }

  public writeln(){
    console.log('\n');
  }

  public write(string: string){
    console.log(string);
  }

  public writeAndLn(string: string){
    console.log(string + '\n');
  }

  private writeError(formato: string){
    this.writeAndLn("ERROR DE FORMATO!\nIntroduzca un valor con formato " + formato + ".");
  }
}
