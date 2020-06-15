export enum StateValue {
  INITIAL,
  IN_GAME,
  FINAL,
  EXIT
}

const StringIsNumber = value => isNaN(Number(value)) === false;

export function stateValues() {
  return Object.keys(StateValue)
    .filter(StringIsNumber)
    .map(key => StateValue[key]);
}
