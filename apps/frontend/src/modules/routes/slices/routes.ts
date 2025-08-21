import {
	construct,
	getAll,
	getPointsOfInterest,
	getRouteById,
	patchRoute,
} from "./actions.js";
import { actions as constructRouteActions } from "./construct-route.slice.js";
import { actions as routeActions } from "./route.slice.js";

const allActions = {
	...routeActions,
	...constructRouteActions,
	construct,
	getAll,
	getPointsOfInterest,
	getRouteById,
	patchRoute,
	routeActions,
};

export { allActions as actions };
export { reducer as constructRouteReducer } from "./construct-route.slice.js";
export { reducer as routeReducer } from "./route.slice.js";
