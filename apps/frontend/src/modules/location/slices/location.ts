import { getCurrentUserLocation } from "./actions.js";
import { actions } from "./location.slice.js";

const allActions = {
	...actions,
	getCurrentUserLocation,
};

export { allActions as actions };
export { reducer } from "./location.slice.js";
