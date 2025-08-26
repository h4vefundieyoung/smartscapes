import {
	create,
	finish,
	getAllByUserId,
	getAllForCurrentUser,
	start,
} from "./actions.js";
import { actions as userRouteDetailsActions } from "./user-route-details.slice.js";
import { actions as userRouteActions } from "./user-routes.slice.js";

const allActions = {
	...userRouteActions,
	...userRouteDetailsActions,
	create,
	finish,
	getAllByUserId,
	getAllForCurrentUser,
	start,
};

export { allActions as actions };
export { reducer as userRouteDetailsReducer } from "./user-route-details.slice.js";
export { reducer as userRoutesReducer } from "./user-routes.slice.js";
