"use-strict";

import { RouteValue } from "./RouteValue";
import { EvaluatedRoute, Population, Route } from "./types";

const getEvaluatedRoutes = (routes: Population) =>
  routes
    .map((route, id) => ({
      id,
      value: new RouteValue(route).getRouteValue(),
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
