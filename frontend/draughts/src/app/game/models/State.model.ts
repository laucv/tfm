import {StateValue, stateValues} from "./StateValue.model";

export class State{

  private stateValue: StateValue;

  constructor() {
    this.reset();
  }

  next(){
    if (this.stateValue != StateValue.EXIT)
      this.stateValue = stateValues()[this.stateValue.valueOf() + 1];
  }

  reset(){
    this.stateValue = StateValue.INITIAL;
  }

  getValueState(): StateValue{
    return this.stateValue;
  }
}
