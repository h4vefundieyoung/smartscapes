import {
	create,
	finish,
	getAllByUserId,
	getByRouteIdAndUserId,
	start,
} from "./actions.js";
import { actions as userRouteDetailsActions } from "./user-route-details.slice.js";
import { actions as userRouteActions } from "./user-route.slice.js";

const allActions = {
	...userRouteActions,
	...userRouteDetailsActions,
	create,
	finish,
	getAllByUserId,
	getByRouteIdAndUserId,
	start,
};

export { allActions as actions };
export { reducer as userRouteDetailsReducer } from "./user-route-details.slice.js";
export { reducer as userRouteReducer } from "./user-route.slice.js";
