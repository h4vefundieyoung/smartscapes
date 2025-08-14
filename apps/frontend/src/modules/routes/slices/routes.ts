import { create } from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	create,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
