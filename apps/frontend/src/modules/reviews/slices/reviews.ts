import { create, getAll } from "./actions.js";
import { actions } from "./review.slice.js";

const allActions = {
	...actions,
	create,
	getAll,
};

export { allActions as actions };
export { reducer } from "./review.slice.js";
