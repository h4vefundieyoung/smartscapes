import {
	create,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	updateCreateRouteFormData,
} from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	create,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	updateCreateRouteFormData,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
