import { shuffleArray } from "./shuffleArray";
import { Route, Population } from "./types";

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

export const getCrossbreededRoutes = (routes: Population): Population => {
  const randomizedRoutes = shuffleArray(routes);
  return routes.map((_, idx) =>
    crossbreed(
      randomizedRoutes[idx],
      randomizedRoutes[randomizedRoutes.length - idx - 1]
    )
  );
};
