import { getRoutes } from "./actions.js";
import { actions } from "./explore.slice.js";

const allActions = {
	...actions,
	getRoutes,
};

export { allActions as actions };
export { reducer } from "./explore.slice.js";
