import {Color} from './Color';

export enum Error {
  BAD_FORMAT,
  EMPTY_ORIGIN,
  OPPOSITE_PIECE,
  NOT_DIAGONAL,
  NOT_EMPTY_TARGET,
  NOT_ADVANCED,
  WITHOUT_EATING,
  COLLEAGUE_EATING,
  TOO_MUCH_ADVANCED,
  TOO_MUCH_EATINGS,
  TOO_MUCH_JUMPS
}

const StringIsNumber = value => isNaN(Number(value)) === false;

function getErrorValues() {
  return Object.keys(Error)
    .filter(StringIsNumber)
    .map(key => Error[key]);
}

export function getError(error: Error) {
  return getErrorValues()[error];
}
