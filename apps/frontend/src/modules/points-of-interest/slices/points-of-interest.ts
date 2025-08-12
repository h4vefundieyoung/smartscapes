import { loadById } from "./actions.js";
import { actions } from "./points-of-interest-details.slice.js";

const allActions = {
	...actions,
	loadById,
};

export { allActions as actions };
export { reducer as pointsOfInterestDetailsReducer } from "./points-of-interest-details.slice.js";
