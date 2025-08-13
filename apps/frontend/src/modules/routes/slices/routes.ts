import { findByPoint } from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	findByPoint,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
