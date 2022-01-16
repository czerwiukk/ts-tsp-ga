"use-strict";

import fs from "fs";
import { getInitialPopulation } from "./getInitialPopulation";
import { Location } from "./Location";
import { getCrossbreededRoutes } from "./crossbreeding";
import { getMutatedPopulation } from "./mutating";
import { getEvaluatedRoutes, getSelectedRoutes } from "./selecting";
import { Population, Route } from "./types";

const evolve = (currentPopulation: Population, mutationChance: number) => {
  const crossbreededRoutes = getCrossbreededRoutes(currentPopulation);
  const mutatedRoutes = getMutatedPopulation(
    crossbreededRoutes,
    mutationChance
  );

  const evaluatedRoutes = getEvaluatedRoutes(mutatedRoutes);

  const selectedRoutes = getSelectedRoutes(evaluatedRoutes);

  return selectedRoutes;
};

const runGeneticAlgorithm = (
  locations: Location[],
  populationSize: number,
  mutationChance: number,
  generations: number
) => {
  const initialPopulation = getInitialPopulation(locations, populationSize);

  const finalPopulation = Array.from(Array(generations)).reduce<Route[]>(
    (prevPopulation) => evolve(prevPopulation, mutationChance),
    initialPopulation
  );

  const { value, route } = getEvaluatedRoutes(finalPopulation)[0];

  const bestDistance = 1 / value;

  fs.appendFileSync(
    "CzerwiecAdrian.txt",
    `${route.map((v) => ` ${v.id}`)} ${bestDistance}\n`
  );
};

const locationList: Location[] = [];

fs.readFile("dane/pr144.tsp", "utf8", function (err, data) {
  if (err) throw err;

  data.split("\n").forEach((line) => {
    if (!isNaN(parseInt(line.trim()[0]))) {
      const [id, x, y] = line
        .split(" ")
        .filter(Boolean)
        .map((val) => parseInt(val));

      locationList.push(new Location(x, y, id));
    }
  });

  const startTime = new Date().getTime();

  const seconds = 30;

  while (new Date().getTime() - startTime < seconds * 1000) {
    runGeneticAlgorithm(locationList, 100, 0.01, 800);
  }
});
