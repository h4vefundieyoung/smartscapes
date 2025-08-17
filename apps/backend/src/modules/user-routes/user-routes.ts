import { logger } from "~/libs/modules/logger/logger.js";

import { UserRouteController } from "./user-route.controller.js";
import { UserRouteModel } from "./user-route.model.js";
import { UserRouteRepository } from "./user-route.repository.js";
import { UserRouteService } from "./user-route.service.js";

const userRouteRepository = new UserRouteRepository(UserRouteModel);
const userRouteService = new UserRouteService(userRouteRepository);
const userRouteController = new UserRouteController(logger, userRouteService);

export { userRouteController };

