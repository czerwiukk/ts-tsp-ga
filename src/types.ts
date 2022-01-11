import { Location } from "./Location";

export type Route = Location[];
export type Population = Route[];

export interface EvaluatedRoute {
  id: number;
  value: number;
  route: Route;
}
