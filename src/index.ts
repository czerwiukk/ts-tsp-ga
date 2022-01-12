"use-strict";

import { getInitialPopulation, getRandomItem } from "./getInitialPopulation";
import { getRouteValue } from "./getRouteValue";
import { Location } from "./Location";
import { shuffleArray } from "./shuffleArray";
import { EvaluatedRoute, Population, Route } from "./types";

const getEvaluatedRoutes = (routes: Population) =>
  routes
    .map((route, id) => ({
      id,
      value: getRouteValue(route),
      route,
    }))
    .sort((a, b) => a.value - b.value)
    .reverse();

const getCumulatedValues = (evaluatedValues: EvaluatedRoute[]) =>
  evaluatedValues.reduce(
    (acc, evaluated, idx) => [
      ...acc,
      evaluated.value + (acc[idx - 1] ? idx : 0),
    ],
    [] as number[]
  );

const getSelectedRoutes = (evaluatedValues: EvaluatedRoute[]) => {
  const totalPopulationValue = evaluatedValues.reduce(
    (acc, { value }) => acc + value,
    0
  );

  const cumulatedValues = getCumulatedValues(evaluatedValues);

  const percentageValues = cumulatedValues.map(
    (value) => (100 * value) / totalPopulationValue
  );

  return evaluatedValues.map(() => {
    const shot = Math.random() * 100;

    for (let i = 0; i < percentageValues.length; i++)
      if (shot <= percentageValues[i]) return evaluatedValues[i].route;

    return evaluatedValues[evaluatedValues.length - 1].route;
  });
};

const crossbreed = (route1: Route, route2: Route) => {
  const getCuttingPoint = () => Math.floor(Math.random() * route1.length);

  const [cuttingPoint1, cuttingPoint2] = [getCuttingPoint(), getCuttingPoint()];

  const [start, end] = [
    Math.min(cuttingPoint1, cuttingPoint2),
    Math.max(cuttingPoint1, cuttingPoint2),
  ];

  const firstPart = route1.slice(start, end);

  const secondPart = route2.filter(
    (location) =>
      !firstPart.some((l) => l.x === location.x && l.y === location.y)
  );

  return [...firstPart, ...secondPart];
};

const getCrossbreededRoutes = (routes: Population): Population => {
  const randomizedRoutes = shuffleArray(routes);
  return routes.map((_, idx) =>
    crossbreed(
      randomizedRoutes[idx],
      randomizedRoutes[randomizedRoutes.length - idx - 1]
    )
  );
};

const mutate = (route: Route, mutationChance: number) =>
  route.map((_, swappedIdx1) => {
    if (Math.random() >= mutationChance) return route;
    const swappedIdx2 = Math.floor(route.length * Math.random());

    const mutatedRoute = [...route];

    const [location1, location2] = [route[swappedIdx1], route[swappedIdx2]];

    mutatedRoute[swappedIdx1] = location2;
    mutatedRoute[swappedIdx2] = location1;

    return mutatedRoute;
  });

const getMutatedPopulation = (routes: Population, mutationChance: number) =>
  routes.map((route) => mutate(route, mutationChance));

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
) => getInitialPopulation(locations, populationSize);
