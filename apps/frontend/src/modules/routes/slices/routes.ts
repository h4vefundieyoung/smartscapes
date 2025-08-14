import { findAll } from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	findAll,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
