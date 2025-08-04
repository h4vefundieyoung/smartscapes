import { loadAll, patch } from "./actions.js";
import { actions } from "./users.slice.js";

const allActions = {
	...actions,
	loadAll,
	patch,
};

export { allActions as actions };
export { reducer } from "./users.slice.js";
