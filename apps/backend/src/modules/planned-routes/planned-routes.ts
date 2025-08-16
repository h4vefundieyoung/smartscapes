import { PlannedRoutesModel } from "./planned-routes.model.js";
import { PlannedRoutesRepository } from "./planned-routes.repository.js";
import { PlannedRouteService } from "./planned-routes.service.js";

const plannedRoutesRepository = new PlannedRoutesRepository(PlannedRoutesModel);
const plannedRouteService = new PlannedRouteService(plannedRoutesRepository);

export { plannedRouteService };
export { type PlannedRoutesResponseDto } from "./libs/types/types.js";
export { PlannedRouteService } from "./planned-routes.service.js";
