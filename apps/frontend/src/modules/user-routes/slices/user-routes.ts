import {
	create,
	deleteUserRoute,
	finish,
	getAllByUserId,
	getByRouteId,
	saveUserRoute,
	start,
} from "./actions.js";
import { startTrackingRoute, stopTrackingRoute } from "./tracking-actions.js";
import { actions as userRouteDetailsActions } from "./user-route-details.slice.js";
import { actions as userRouteActions } from "./user-routes.slice.js";

const allActions = {
	...userRouteActions,
	...userRouteDetailsActions,
	create,
	deleteUserRoute,
	finish,
	getAllByUserId,
	getByRouteId,
	saveUserRoute,
	start,
	startTrackingRoute,
	stopTrackingRoute,
};

export { allActions as actions };
export { reducer as userRouteDetailsReducer } from "./user-route-details.slice.js";
export { reducer as userRoutesReducer } from "./user-routes.slice.js";
