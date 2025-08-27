import {
	create,
	deleteUserRoute,
	finish,
	getAllByUserId,
	saveUserRoute,
	start,
} from "./actions.js";
import { actions as userRouteDetailsActions } from "./user-routes-details.slice.js";
import { actions as userRouteActions } from "./user-routes.slice.js";

const allActions = {
	...userRouteActions,
	...userRouteDetailsActions,
	create,
	deleteUserRoute,
	finish,
	getAllByUserId,
	saveUserRoute,
	start,
};

export { allActions as actions };
export { reducer as userRoutesDetailsReducer } from "./user-routes-details.slice.js";
export { reducer as userRoutesReducer } from "./user-routes.slice.js";
