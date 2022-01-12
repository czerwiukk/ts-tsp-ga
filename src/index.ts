"use-strict";

import fs from "fs";
import { getInitialPopulation } from "./getInitialPopulation";
import { Location } from "./Location";
import { getCrossbreededRoutes } from "./crossbreeding";
import { getMutatedPopulation } from "./mutating";
import { getEvaluatedRoutes, getSelectedRoutes } from "./selecting";
import { Population, Route } from "./types";

const evolve = (currentPopulation: Population, mutationChance: number) => {
  const evaluatedRoutes = getEvaluatedRoutes(currentPopulation);

  const selectedRoutes = getSelectedRoutes(evaluatedRoutes);

  const crossbreededRoutes = getCrossbreededRoutes(selectedRoutes);

  const mutatedRoutes = getMutatedPopulation(
    crossbreededRoutes,
    mutationChance
  );

  return mutatedRoutes;
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

  console.log(
    `Best distance: ${1 / getEvaluatedRoutes(finalPopulation)[0].value}`
  );
};

const locationList: Location[] = [];

fs.readFile("dane/pr144.tsp", "utf8", function (err, data) {
  if (err) throw err;

  data.split("\n").forEach((line) => {
    if (!isNaN(parseInt(line.trim()[0]))) {
      const [_, x, y] = line
        .split(" ")
        .filter(Boolean)
        .map((val) => parseInt(val));

      locationList.push(new Location(x, y));
    }
  });

  runGeneticAlgorithm(locationList, 800, 0.02, 50);
});
