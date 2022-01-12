import { Route } from "./types";

const getRouteDistance = (route: Route): number =>
  route.reduce((distance, location, idx) => {
    const nextLocation = idx < route.length - 1 ? route[idx + 1] : route[0];

    return distance + location.getDistanceTo(nextLocation);
  }, 0);

export const getRouteValue = (route: Route) => 1 / getRouteDistance(route);
