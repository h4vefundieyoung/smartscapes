import { logger } from "~/libs/modules/logger/logger.js";
import { mapBoxDirectionsApi } from "~/libs/modules/map-box/map-box.js";

import { pointsOfInterestService } from "../points-of-interest/points-of-interest.js";
import { RoutesController } from "./routes.controller.js";
import { RoutesService } from "./routes.service.js";

const routesService = new RoutesService(
	mapBoxDirectionsApi,
	pointsOfInterestService,
);
const routesController = new RoutesController(logger, routesService);

export { routesController };
