import { create, loadAll } from "./actions.js";
import { actions } from "./points-of-interest.slice.js";

const allActions = {
	...actions,
	create,
	loadAll,
};

export { allActions as actions };
export { reducer } from "./points-of-interest.slice.js";
