import { Location } from "./Location";
import { Population } from "./types";

const getRandomRoute = (locations: Location[]) =>
  locations.map(() => locations[Math.floor(Math.random() * locations.length)]);

export const getInitialPopulation = (
  locations: Location[],
  size: number
): Population => Array.from(Array(size)).map(() => getRandomRoute(locations));
