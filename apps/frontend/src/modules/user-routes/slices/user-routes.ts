import { deleteUserRoute, saveUserRoute } from "./actions.js";
import { actions } from "./user-routes.slice.js";

const allActions = {
	...actions,
	deleteUserRoute,
	saveUserRoute,
};

export { allActions as actions };
