import {
	create,
	deleteImage,
	discardCreateRouteFormData,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	uploadImage,
} from "./actions.js";
import { actions as routeDetailsActions } from "./route-details.slice.js";
import { actions as routesActions } from "./routes.slice.js";

const allActions = {
	...routesActions,
	...routeDetailsActions,
	create,
	deleteImage,
	discardCreateRouteFormData,
	getAll,
	getById,
	patch,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	uploadImage,
};

export { allActions as actions };
export { reducer as routeDetailsReducer } from "./route-details.slice.js";
export { reducer as routesReducer } from "./routes.slice.js";
