import { create, finish, getAllByUserId, start } from "./actions.js";
import { actions } from "./user-route.slice.js";

const allActions = {
	...actions,
	create,
	finish,
	getAllByUserId,
	start,
};

export { allActions as actions };
export { reducer } from "./user-route.slice.js";
