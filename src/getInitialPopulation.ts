import { Location } from "./Location";
import { Population } from "./types";

export const getRandomItem = <T>(items: T[]) =>
  items.map(() => items[Math.floor(Math.random() * items.length)]);

export const getInitialPopulation = (
  locations: Location[],
  size: number
): Population => Array.from(Array(size)).map(() => getRandomItem(locations));
