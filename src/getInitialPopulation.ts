import { Location } from "./Location";
import { Population } from "./types";

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const getInitialPopulation = (
  locations: Location[],
  size: number
): Population => Array.from(Array(size)).map(() => shuffle(locations));
