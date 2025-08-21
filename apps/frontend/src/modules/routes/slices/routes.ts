import {
	constructRoute,
	create,
	discardCreateRouteFormData,
	getAll,
	getPointsOfInterest,
	getRouteById,
	patchRoute,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
} from "./actions.js";
import { actions as constructRouteActions } from "./construct-route.slice.js";
import { actions as routeActions } from "./routes.slice.js";

const allActions = {
	...routeActions,
	...constructRouteActions,
	constructRoute,
	create,
	discardCreateRouteFormData,
	getAll,
	getPointsOfInterest,
	getRouteById,
	patchRoute,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	routeActions,
};

export { allActions as actions };
export { reducer as constructRouteReducer } from "./construct-route.slice.js";
export { reducer as routeReducer } from "./routes.slice.js";
