import { Location } from "./Location";

export class RouteValue {
  distance: number;
  value: number;

  constructor(public route: Location[]) {
    this.route = route;
    this.distance = 0;
    this.value = 0;
  }

  private getRouteDistance(): number {
    if (this.distance) return this.distance;

    this.distance = this.route.reduce((distance, location, idx) => {
      const nextLocation =
        idx < this.route.length - 1 ? this.route[idx + 1] : this.route[0];

      return distance + location.getDistanceTo(nextLocation);
    }, 0);

    return this.distance;
  }
  public getRouteValue(): number {
    if (!this.value) {
      this.value = 1 / this.getRouteDistance();
    }
    return this.value;
  }
}
