import { create, getAll } from "./actions.js";
import { actions } from "./categories.slice.js";

const allActions = {
	...actions,
	create,
	getAll,
};

export { allActions as actions };
export { reducer } from "./categories.slice.js";
