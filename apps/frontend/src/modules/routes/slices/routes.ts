import {
	create,
	discardCreateRouteData,
	getRouteById,
	preserveCreateRouteData,
	restoreCreateRouteData,
} from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	create,
	discardCreateRouteData,
	getRouteById,
	preserveCreateRouteData,
	restoreCreateRouteData,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
