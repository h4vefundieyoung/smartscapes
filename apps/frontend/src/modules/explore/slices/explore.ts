import { getRoutes, loadMoreRoutes } from "./actions.js";
import { actions } from "./explore.slice.js";

const allActions = {
	...actions,
	getRoutes,
	loadMoreRoutes,
};

export { allActions as actions };
export { reducer } from "./explore.slice.js";
