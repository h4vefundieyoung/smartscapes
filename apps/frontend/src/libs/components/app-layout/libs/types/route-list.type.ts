import { type AppRoute } from "~/libs/enums/app-route.enum.js";
import { type ValueOf } from "~/libs/types/types.js";

type RouteList = ValueOf<typeof AppRoute>[];

export { type RouteList };
