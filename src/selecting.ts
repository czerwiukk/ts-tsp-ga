import { getRouteValue } from "./getRouteValue";
import { EvaluatedRoute, Population } from "./types";

const getCumulatedValues = (evaluatedValues: EvaluatedRoute[]) =>
  evaluatedValues.reduce(
    (acc, evaluated, idx) => [
      ...acc,
      evaluated.value + (acc[idx - 1] ? idx : 0),
    ],
    [] as number[]
  );

export const getEvaluatedRoutes = (routes: Population) =>
  routes
    .map((route, id) => ({
      id,
      value: getRouteValue(route),
      route,
    }))
    .sort((a, b) => a.value - b.value)
    .reverse();

export const getSelectedRoutes = (evaluatedValues: EvaluatedRoute[]) => {
  const totalPopulationValue = evaluatedValues.reduce(
    (acc, { value }) => acc + value,
    0
  );

  const cumulatedValues = getCumulatedValues(evaluatedValues);

  const percentageValues = cumulatedValues.map(
    (value) => (100 * value) / totalPopulationValue
  );

  return evaluatedValues.map(() => {
    const random = Math.random() * 100;

    for (let i = 0; i < percentageValues.length; i++)
      if (random <= percentageValues[i]) return evaluatedValues[i].route;

    return evaluatedValues[evaluatedValues.length - 1].route;
  });
};
