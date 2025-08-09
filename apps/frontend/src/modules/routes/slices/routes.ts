import { getRoute } from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	getRoute,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
