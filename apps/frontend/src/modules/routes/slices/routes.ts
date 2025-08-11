import { getRouteById } from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	getRouteById,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
