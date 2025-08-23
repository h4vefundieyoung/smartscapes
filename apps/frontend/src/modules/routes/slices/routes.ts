import {
	create,
	deleteImage,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	patchRoute,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	uploadImage,
} from "./actions.js";
import { actions } from "./routes.slice.js";

const allActions = {
	...actions,
	create,
	deleteImage,
	discardCreateRouteFormData,
	getAll,
	getRouteById,
	patchRoute,
	preserveCreateRouteFormData,
	restoreCreateRouteFormData,
	uploadImage,
};

export { allActions as actions };
export { reducer } from "./routes.slice.js";
