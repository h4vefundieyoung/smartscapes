import { PlannedPathModel } from "./planned-path.model.js";
import { PlannedPathRepository } from "./planned-path.repository.js";
import { PlannedPathService } from "./planned-path.service.js";

const plannedPathRepository = new PlannedPathRepository(PlannedPathModel);
const plannedPathService = new PlannedPathService(plannedPathRepository);

export { plannedPathService };
export { PlannedPathService } from "./planned-path.service.js";
