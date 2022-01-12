import { Route, Population } from "./types";

const mutate = (route: Route, mutationChance: number) =>
  route.reduce((_, __, swappedIdx1) => {
    if (Math.random() >= mutationChance) return route;
    const swappedIdx2 = Math.floor(route.length * Math.random());

    const mutatedRoute = [...route];

    const [location1, location2] = [route[swappedIdx1], route[swappedIdx2]];

    mutatedRoute[swappedIdx1] = location2;
    mutatedRoute[swappedIdx2] = location1;

    return mutatedRoute;
  }, route);

export const getMutatedPopulation = (
  routes: Population,
  mutationChance: number
) => routes.map((route) => mutate(route, mutationChance));
