import {
	constructRoute,
	create,
	discardCreateRouteFormData,
	findPointsOfInterest,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
} from "./actions.js";
import { actions as constructRouteActions } from "./construct-route.slice.js";
import { actions as routeDetailsActions } from "./route-details.slice.js";
import { actions as routesActions } from "./routes.slice.js";

const allActions = {
	...routesActions,
	...routeDetailsActions,
	...constructRouteActions,
	constructRoute,
	create,
	discardCreateRouteFormData,
	findPointsOfInterest,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	routesActions,
};

export { allActions as actions };
export { reducer as constructRouteReducer } from "./construct-route.slice.js";
export { reducer as routeDetailsReducer } from "./route-details.slice.js";
export { reducer as routesReducer } from "./routes.slice.js";
