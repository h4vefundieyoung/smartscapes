import { deleteUserRoute, getAllByUserId, saveUserRoute } from "./actions.js";
import { actions as userRouteActions } from "./user-routes.slice.js";

const allActions = {
	...userRouteActions,
	deleteUserRoute,
	getAllByUserId,
	saveUserRoute,
};

export { allActions as actions };
export { reducer as userRoutesReducer } from "./user-routes.slice.js";
