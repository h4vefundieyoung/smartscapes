import { construct, getRouteById } from "./actions.js";
import { actions } from "./route.slice.js";

const allActions = {
	...actions,
	construct,
	getRouteById,
};

export { allActions as actions };
export { reducer } from "./route.slice.js";
