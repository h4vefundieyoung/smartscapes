import { getAll, getRouteById, patchRoute, uploadImage } from "./actions.js";
import { actions } from "./route.slice.js";

const allActions = {
	...actions,
	getAll,
	getRouteById,
	patchRoute,
	uploadImage,
};

export { allActions as actions };
export { reducer } from "./route.slice.js";
