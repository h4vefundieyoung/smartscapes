import { create } from "./actions.js";
import { actions } from "./points-of-interest.slice.js";

const allActions = {
	...actions,
	create,
};

export { allActions as actions };
export { reducer } from "./points-of-interest.slice.js";
