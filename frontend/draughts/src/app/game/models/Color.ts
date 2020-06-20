export enum Color {
  WHITE,
  BLACK
}

const LIMITS: number[] = [5, 2];
const StringIsNumber = value => isNaN(Number(value)) === false;

export function isInitialRow(row: number): boolean {
  switch (this) {
    case Color.WHITE:
      return row >= LIMITS[Color.WHITE.valueOf()];
    case Color.BLACK:
      return row <= LIMITS[Color.BLACK.valueOf()];
  }
  return false;
}

export function colorGetInitialColor(coordinate: any): Color {
  if (coordinate.isBlack())
    for (let color of colorValues())
      if (isInitialRow(coordinate.getRow()))
        return color;
  return null;
}

export function colorValues() {
  return Object.keys(Color)
    .filter(StringIsNumber)
    .map(key => Color[key]);
}
