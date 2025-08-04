import { logger } from "~/libs/modules/logger/logger.js";
import { mapBoxDirectionsApi } from "~/libs/modules/map-box/map-box.js";

import { RoutesController } from "./routes.controller.js";

const routesController = new RoutesController(logger, mapBoxDirectionsApi);

export { routesController };
