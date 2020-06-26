import {Coordinate} from './Coordinate';

export enum Color {
  WHITE,
  BLACK
}

const LIMITS: number[] = [5, 2];
const StringIsNumber = value => isNaN(Number(value)) === false;

function getColor(row: number): Color {
  if (row >= LIMITS[Color.WHITE.valueOf()]) {
    return Color.WHITE;
  } else if (row <= LIMITS[Color.BLACK.valueOf()]) {
    return Color.BLACK;
  }
  return null;
}

export function colorGetInitialColor(coordinate: Coordinate): Color {
  if (coordinate.isBlack()) {
    for (let color of colorValues()) {
      return getColor(coordinate.getRow())
    }
  }
  return null;
}

export function getColorValue(color: number): Color {
  if(color === 0)
    return Color.WHITE;
  if(color === 1)
    return Color.BLACK;
  return null;
}

export function colorValues() {
  return Object.keys(Color)
    .filter(StringIsNumber)
    .map(key => Color[key]);
}
