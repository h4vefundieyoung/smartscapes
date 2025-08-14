import { PlannedRoutesModel } from "./planned-routes.model.js";
import { PlannedRoutesRepository } from "./planned-routes.repository.js";
import { PlannedRoutesService } from "./planned-routes.service.js";

const plannedRoutesRepository = new PlannedRoutesRepository(PlannedRoutesModel);
const plannedRoutesService = new PlannedRoutesService(plannedRoutesRepository);

export { plannedRoutesService };
