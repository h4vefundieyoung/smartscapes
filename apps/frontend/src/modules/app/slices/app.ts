import { initialize } from "./actions.js";
import { actions } from "./app.slice.js";

const allActions = {
	...actions,
	initialize,
};

export { allActions as actions };
export { reducer } from "./app.slice.js";
