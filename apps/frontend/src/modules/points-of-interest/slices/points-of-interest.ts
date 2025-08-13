import { findAll } from "./actions.js";
import { actions } from "./points-of-interest.slice.js";

const allActions = {
	...actions,
	findAll,
};

export { allActions as actions };
export { reducer } from "./points-of-interest.slice.js";
