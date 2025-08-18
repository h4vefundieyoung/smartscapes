import { create, getById, loadAll } from "./actions.js";
import { actions as poiDetailsActions } from "./points-of-interest-details.slice.js";
import { actions } from "./points-of-interest.slice.js";

const allActions = {
	...actions,
	...poiDetailsActions,
	create,
	getById,
	loadAll,
};

export { allActions as actions };
export { reducer as pointOfInterestDetailsReducer } from "./points-of-interest-details.slice.js";
export { reducer as pointsOfInterestReducer } from "./points-of-interest.slice.js";
