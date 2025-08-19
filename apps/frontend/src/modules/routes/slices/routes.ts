import { getRouteById, patchRoute } from "./actions.js";
import { actions } from "./route.slice.js";

const allActions = {
	...actions,
	getRouteById,
	patchRoute,
};

export { allActions as actions };
export { reducer } from "./route.slice.js";
