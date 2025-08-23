import {
	deleteImage,
	getAll,
	getRouteById,
	patchRoute,
	uploadImage,
} from "./actions.js";
import { actions } from "./route.slice.js";

const allActions = {
	...actions,
	deleteImage,
	getAll,
	getRouteById,
	patchRoute,
	uploadImage,
};

export { allActions as actions };
export { reducer } from "./route.slice.js";
