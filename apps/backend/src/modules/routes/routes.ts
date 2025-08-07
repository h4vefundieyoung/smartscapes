import { logger } from "~/libs/modules/logger/logger.js";
import { mapboxDirectionsApi } from "~/libs/modules/mapbox/mapbox.js";

import { pointsOfInterestService } from "../points-of-interest/points-of-interest.js";
import { RoutesController } from "./routes.controller.js";
import { RoutesService } from "./routes.service.js";

const routesService = new RoutesService(
	mapboxDirectionsApi,
	pointsOfInterestService,
);
const routesController = new RoutesController(logger, routesService);

export { routesController };
