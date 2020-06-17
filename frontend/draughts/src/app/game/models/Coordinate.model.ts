import {Direction} from './Direction.model';

export class Coordinate {
  private row: number;
  private column: number;
  private static readonly LOWER_LIMIT: number = 0;
  private static readonly UPPER_LIMIT: number = 7;
  private static readonly DIMENSION: number = Coordinate.UPPER_LIMIT + 1;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  public static getInstance(format: string): Coordinate {
    if (format === null)
      return null;
    try {
      let value = Number(format);
      let row = value / 10 - 1;
      let column = value % 10 - 1;
      let coordinate: Coordinate = new Coordinate(row, column);
      if (!coordinate.isWithIn())
        return null;
      return coordinate;
    } catch (exception) {
      return null;
    }
  }

  private isWithIn(): boolean {
    return Coordinate.LOWER_LIMIT <= Coordinate["row"] && Coordinate["row"] <= Coordinate.UPPER_LIMIT
      && Coordinate.LOWER_LIMIT <= Coordinate["column"] && Coordinate["column"] <= Coordinate.UPPER_LIMIT;
  }

  private substract(coordinate: Coordinate): Coordinate {
    return new Coordinate(this.row - coordinate.row, this.column - coordinate.column);
  }

  private plus(coordinate: Coordinate): Coordinate {
    return new Coordinate(this.row + coordinate.row, this.column + coordinate.column);
  }

  getDirection(coordinate: Coordinate): Direction {
    if (coordinate === null)
      return null;
    let substract: Coordinate = coordinate.substract(this);
    for (let direction of Direction.values())
      if (direction.isOnDirection(substract))
        return direction;
    return null;
  }

  isOnDiagonal(coordinate: Coordinate): boolean {
    return this.getDirection(coordinate) != null;
  }

  getDiagonalDistance(coordinate: Coordinate): number {
    if (!this.isOnDiagonal(coordinate))
      return null;
    return Math.abs(this.substract(coordinate).getRow());
  }

  getBetweenDiagonalCoordinate(coordinate: Coordinate): Coordinate {
    if (this.getDiagonalDistance(coordinate) != 2)
      return null;
    const direction: Direction = this.getDirection(coordinate);
    return this.plus(direction.getDistanceCoordinate(1));
  }

  getBetweenDiagonalCoordinates(coordinate: Coordinate): Array<Coordinate> {
    if (!this.isOnDiagonal(coordinate))
      return null;
    let coordinates: Array<Coordinate> = new Array<Coordinate>();
    let direction: Direction = this.getDirection(coordinate);
    let cursor: Coordinate = this.plus(direction.getDistanceCoordinate(1));
    while (cursor !== coordinate) {
      coordinates.push(cursor);
      cursor = cursor.plus(direction.getDistanceCoordinate(1));
    }
    return coordinates;
  }

  getDiagonalCoordinates(level: number): Array<Coordinate> {
    let diagonalCoordinates: Array<Coordinate> = new Array<Coordinate>();
    for (let direction of Direction.values()) {
      let diagonalCoordinate: Coordinate = this.plus(direction.getDistanceCoordinate(level));
      if (diagonalCoordinate != null && diagonalCoordinate.isWithIn())
        diagonalCoordinates.push(diagonalCoordinate);
    }
    return diagonalCoordinates;
  }

  getDiagonalCoordinate(direction: Direction, level: number): Coordinate {
    return this.plus(direction.getDistanceCoordinate(level));
  }

  isBlack(): boolean {
    return (this.row + this.column) % 2 != 0;
  }

  isLast(): boolean {
    return this.row == Coordinate.UPPER_LIMIT;
  }

  isFirst(): boolean {
    return this.row == Coordinate.LOWER_LIMIT;
  }

  getRow(): number {
    return this.row;
  }

  getColumn(): number {
    return this.column;
  }

  public static getDimension(): number {
    return Coordinate.DIMENSION;
  }

}
