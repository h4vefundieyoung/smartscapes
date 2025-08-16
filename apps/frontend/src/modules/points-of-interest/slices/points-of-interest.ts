import { getById } from "./actions.js";
import { actions } from "./points-of-interest.slice.js";

const allActions = {
	...actions,
	getById,
};

export { allActions as actions };
export { reducer } from "./points-of-interest.slice.js";
