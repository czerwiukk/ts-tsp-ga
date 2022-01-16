export class Location {
  constructor(public x: number, public y: number, public id: number) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  public toString(): string {
    return this.id.toString();
  }

  public getDistanceTo(other: Location): number {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
    );
  }
}
