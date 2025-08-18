import { create, getRouteById } from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	create,
	getRouteById,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
