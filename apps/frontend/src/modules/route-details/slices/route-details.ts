import { create, getAll } from "./actions.js";
import { actions } from "./route-details.slice.js";

const allActions = {
	...actions,
	create,
	getAll,
};

export { allActions as actions };
export { reducer } from "./route-details.slice.js";
