import {
	create,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	patchRoute,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
} from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	create,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	patchRoute,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
