import {
	constructRoute,
	create,
	deleteImage,
	discardCreateRouteFormData,
	findPointsOfInterest,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	uploadImage,
} from "./actions.js";
import { actions as constructRouteActions } from "./construct-route.slice.js";
import { actions as routeDetailsActions } from "./route-details.slice.js";
import { actions as routesActions } from "./routes.slice.js";

const allActions = {
	...routesActions,
	...routeDetailsActions,
	...constructRouteActions,
	constructRoute,
	...constructRouteActions,
	create,
	deleteImage,
	discardCreateRouteFormData,
	findPointsOfInterest,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	routesActions,
	uploadImage,
};

export { allActions as actions };
export { reducer as constructRouteReducer } from "./construct-route.slice.js";
export { reducer as routeDetailsReducer } from "./route-details.slice.js";
export { reducer as routesReducer } from "./routes.slice.js";
